import { getReportPlan, type ReportPlanId } from "@/lib/payments/plans";
import { isSupabaseAdminConfigured, supabaseAdmin } from "@/lib/supabase/server";

export type AIReportMode = "mock" | "live";

export type AIReportSection = {
  heading: string;
  body: string;
};

export type AIReportContent = {
  title: string;
  summary: string;
  sections: AIReportSection[];
  nextSteps: string[];
};

export type AIReportRecord = {
  id: string | null;
  accessToken: string;
  reportUrl: string;
  testSessionId: string;
  planId: ReportPlanId;
  mode: AIReportMode;
  model: string | null;
  status: "completed" | "not_persisted";
  content: AIReportContent;
  persisted: boolean;
};

type GenerateReportInput = {
  guestId?: string | null;
  testSessionId: string;
  planId: ReportPlanId;
  stripeSessionId?: string | null;
  paymentStatus?: string | null;
  origin: string;
};

type StoredAIReport = {
  id: string;
  access_token: string;
  test_session_id: string;
  plan_id: ReportPlanId;
  mode: AIReportMode;
  model: string | null;
  status: "completed";
  content: AIReportContent;
};

export function getAIReportMode(): AIReportMode {
  return process.env.AI_REPORT_MODE === "live" ? "live" : "mock";
}

export function getConfiguredOpenAIModel() {
  return process.env.OPENAI_MODEL ?? null;
}

export async function getReportByAccessToken(accessToken: string, origin: string): Promise<AIReportRecord | null> {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return null;
  }

  const { data } = await supabaseAdmin
    .from("ai_reports")
    .select("id, access_token, test_session_id, plan_id, mode, model, status, content")
    .eq("access_token", accessToken)
    .maybeSingle<StoredAIReport>();

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    accessToken: data.access_token,
    reportUrl: `${origin}/report/${data.access_token}`,
    testSessionId: data.test_session_id,
    planId: data.plan_id,
    mode: data.mode,
    model: data.model,
    status: data.status,
    content: data.content,
    persisted: true
  };
}

export async function getOrCreateAIReport(input: GenerateReportInput): Promise<AIReportRecord> {
  const existing = await findExistingReport(input, input.origin);

  if (existing) {
    return existing;
  }

  const mode = getAIReportMode();
  const content = mode === "live" ? await generateLiveReport(input) : generateMockReport(input);
  const accessToken = crypto.randomUUID();
  const model = mode === "live" ? getConfiguredOpenAIModel() : null;

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return {
      id: null,
      accessToken,
      reportUrl: `${input.origin}/report/${accessToken}`,
      testSessionId: input.testSessionId,
      planId: input.planId,
      mode,
      model,
      status: "not_persisted",
      content,
      persisted: false
    };
  }

  const { data, error } = await supabaseAdmin
    .from("ai_reports")
    .insert({
      guest_id: input.guestId,
      test_session_id: input.testSessionId,
      plan_id: input.planId,
      payment_status: input.paymentStatus,
      stripe_session_id: input.stripeSessionId,
      access_token: accessToken,
      mode,
      model,
      status: "completed",
      title: content.title,
      summary: content.summary,
      content
    })
    .select("id, access_token, test_session_id, plan_id, mode, model, status, content")
    .single<StoredAIReport>();

  if (error || !data) {
    return {
      id: null,
      accessToken,
      reportUrl: `${input.origin}/report/${accessToken}`,
      testSessionId: input.testSessionId,
      planId: input.planId,
      mode,
      model,
      status: "not_persisted",
      content,
      persisted: false
    };
  }

  return {
    id: data.id,
    accessToken: data.access_token,
    reportUrl: `${input.origin}/report/${data.access_token}`,
    testSessionId: data.test_session_id,
    planId: data.plan_id,
    mode: data.mode,
    model: data.model,
    status: data.status,
    content: data.content,
    persisted: true
  };
}

async function findExistingReport(input: GenerateReportInput, origin: string) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return null;
  }

  let query = supabaseAdmin
    .from("ai_reports")
    .select("id, access_token, test_session_id, plan_id, mode, model, status, content")
    .eq("test_session_id", input.testSessionId)
    .eq("plan_id", input.planId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (input.stripeSessionId) {
    query = query.eq("stripe_session_id", input.stripeSessionId);
  }

  const { data } = await query.maybeSingle<StoredAIReport>();

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    accessToken: data.access_token,
    reportUrl: `${origin}/report/${data.access_token}`,
    testSessionId: data.test_session_id,
    planId: data.plan_id,
    mode: data.mode,
    model: data.model,
    status: data.status,
    content: data.content,
    persisted: true
  } satisfies AIReportRecord;
}

function generateMockReport(input: GenerateReportInput): AIReportContent {
  const plan = getReportPlan(input.planId);
  const isDeep = input.planId === "deep";

  return {
    title: `${plan?.name ?? "完整感情人格檔案"}已建立`,
    summary:
      "這是一份預覽模式下產生的完整檔案示範，用來呈現付費後的閱讀結構與分析深度。",
    sections: [
      {
        heading: "深層感情模式",
        body: isDeep
          ? "你的關係反應裡同時有「想被穩定選擇」與「不想失去自我節奏」兩股力量。當對方靠近時，你會感到被重視；但當靠近伴隨壓力或要求，你也會開始尋找退回自己的空間。"
          : "你的作答呈現出一個清楚的關係主題：你需要能被感受到的穩定，也需要關係保留足夠的呼吸感。"
      },
      {
        heading: "情緒觸發點",
        body:
          "當重要的人態度變得模糊、回應變短，或沒有交代下一步安排時，你可能會比表面上更快進入警覺狀態。真正觸發你的不只是事件本身，而是「我是否仍然重要」這個問題。"
      },
      {
        heading: "關係盲區提醒",
        body:
          "你可能很擅長觀察對方，卻比較少直接說出自己的需要。當你等待對方自己理解時，關係容易進入猜測與失落的循環。"
      }
    ],
    nextSteps: isDeep
      ? [
          "寫下你最常反覆出現的關係情境：等待、確認、退開，或過度承擔。",
          "選一個你想保護的界線，並把它改寫成對方聽得懂的具體句子。",
          "安排一次不指責的對話，只談一件你希望被理解的需求。"
        ]
      : ["選一個小行動，讓你的關係需求在這週變得更清楚。"]
  };
}

async function generateLiveReport(input: GenerateReportInput): Promise<AIReportContent> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = getConfiguredOpenAIModel();

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required when AI_REPORT_MODE=live.");
  }

  if (!model) {
    throw new Error("OPENAI_MODEL is required when AI_REPORT_MODE=live.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "You create concise self-discovery reports. Return valid JSON with title, summary, sections, and nextSteps."
        },
        {
          role: "user",
          content: `Create a ${input.planId} love self-discovery report for test_session_id ${input.testSessionId}.`
        }
      ],
      text: {
        format: {
          type: "json_object"
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI report generation failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as {
    output_text?: string;
  };

  if (!payload.output_text) {
    throw new Error("OpenAI response did not include output_text.");
  }

  return JSON.parse(payload.output_text) as AIReportContent;
}
