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
    title: `${plan?.name ?? "完整感情人格檔案"}已準備好`,
    summary:
      "這份檔案會把你在關係裡反覆出現的選擇整理成更清楚的語言。你會看到自己容易被什麼吸引、在哪些情境最容易受傷，以及下一次可以如何更穩定地回到自己。",
    sections: [
      {
        heading: "為什麼你總是被某種類型的人吸引",
        body: isDeep
          ? "你容易被帶有強烈情緒訊號、需要被理解，或讓你覺得自己很特別的人吸引。那種被需要的感覺，會讓你很快投入；但如果對方忽冷忽熱，你也會更容易把注意力放在如何重新拿回那份確認。"
          : "你在關係裡很容易被熟悉的互動模式吸引。不是因為那一定適合你，而是它讓你很快知道自己該扮演什麼角色。"
      },
      {
        heading: "你最容易在什麼情況下受傷",
        body:
          "當你已經開始投入，卻感覺對方的回應變少、態度變淡，或沒有把你放在同樣重要的位置時，你會特別容易受傷。你不一定會立刻說出口，但心裡可能已經開始反覆整理每個細節。"
      },
      {
        heading: "你在感情中的盲點",
        body:
          "你有時候太快把焦點放在對方要什麼，反而比較慢確認自己是不是舒服。當你習慣先理解對方，就容易把自己的不安包裝成懂事，直到情緒累積到很難再假裝沒事。"
      },
      {
        heading: "什麼樣的人最適合你",
        body:
          "適合你的人不是永遠不讓你不安，而是願意在你不安時好好回應的人。穩定、一致、願意溝通，並且能看見你努力的人，會比只給你強烈心動的人更能讓你安心。"
      }
    ],
    nextSteps: isDeep
      ? [
          "下一次開始猜測對方想法時，先問自己：我現在需要的是答案，還是被安撫？",
          "在關係初期觀察對方是否穩定一致，而不是只看對方是否讓你心動。",
          "把「我沒事」換成一句更接近真實需求的話，例如：我需要一點確認。"
        ]
      : ["先記下最近一次讓你不安的關係情境，再回頭看：你當時真正想得到的是什麼？"]
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
            "You create concise Traditional Chinese relationship self-discovery reports. Return valid JSON with title, summary, sections, and nextSteps."
        },
        {
          role: "user",
          content: `Create a ${input.planId} relationship blueprint report for test_session_id ${input.testSessionId}.`
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
