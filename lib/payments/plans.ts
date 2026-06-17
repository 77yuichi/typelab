export type ReportPlanId = "basic" | "deep";

export type ReportPlan = {
  id: ReportPlanId;
  name: string;
  amount: number;
  currency: "TWD";
  description: string;
  bullets: string[];
};

export const reportPlans: Record<ReportPlanId, ReportPlan> = {
  basic: {
    id: "basic",
    name: "Basic：快速完整檔案",
    amount: 49,
    currency: "TWD",
    description: "適合想先看清自己主要關係模式，並得到一個可立即使用方向的人。",
    bullets: ["主要關係模式", "最容易受傷的位置", "一個下一步建議"]
  },
  deep: {
    id: "deep",
    name: "Deep：深度完整檔案",
    amount: 99,
    currency: "TWD",
    description: "適合想深入理解吸引模式、盲點與長期關係選擇的人。",
    bullets: ["吸引模式解析", "關係盲點提醒", "穩定關係方向"]
  }
};

export function getReportPlan(planId: string | null | undefined) {
  if (planId === "basic" || planId === "deep") {
    return reportPlans[planId];
  }

  return null;
}
