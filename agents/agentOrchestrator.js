import { runEvaluation } from "./evaluationAgent.js";
import { runSopCheck } from "./sopAgent.js";
import { runComplianceCheck } from "./complianceAgent.js";

export function analyseInteraction(interaction) {
  const evaluation = runEvaluation(interaction);

  const sop = runSopCheck(interaction);

  const compliance = runComplianceCheck(interaction);

  let finalStatus = "Pass";

  if (compliance.criticalFailure) {
    finalStatus = "Critical Fail";
  } else if (
    evaluation.score < 90 ||
    sop.compliance < 90
  ) {
    finalStatus = "Needs Improvement";
  }

  return {
    interactionId: interaction.id,

    finalStatus,

    overallScore: Math.round(
      (
        evaluation.score +
        sop.compliance +
        compliance.complianceScore
      ) / 3
    ),

    evaluation,

    sop,

    compliance,

    recommendedAction:
      finalStatus === "Needs Improvement"
        ? "Assign targeted coaching on refund timeline communication."
        : "No intervention required."
  };
}
