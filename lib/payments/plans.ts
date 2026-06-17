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
    name: "Basic AI Report",
    amount: 49,
    currency: "TWD",
    description: "A concise AI-style love insight report for your test result.",
    bullets: ["Core love pattern", "Relationship reminder", "One next step"]
  },
  deep: {
    id: "deep",
    name: "Deep AI Report",
    amount: 99,
    currency: "TWD",
    description: "A deeper mock report with pattern, blind spot, and next-step guidance.",
    bullets: ["Deep relationship pattern", "Potential blind spot", "Three-step guidance"]
  }
};

export function getReportPlan(planId: string | null | undefined) {
  if (planId === "basic" || planId === "deep") {
    return reportPlans[planId];
  }

  return null;
}
