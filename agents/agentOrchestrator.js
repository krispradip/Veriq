import { runEvaluation } from "./evaluationAgent.js";
import { runSopCheck } from "./sopAgent.js";
import { runComplianceCheck } from "./complianceAgent.js";

export function analyseInteraction(interaction) {
  const evaluation = runEvaluation(interaction);
  const sop = runSopCheck(interaction);
  const compliance = runComplianceCheck(interaction);

  return {
    interaction,
    evaluation,
    sop,
    compliance
  };
}
