export function runEvaluation(interaction) {
  return {
    interactionId: interaction.id,
    score: 86,
    result: "Needs Improvement",
    findings: [
      {
        criterion: "Customer Verification",
        result: "Pass"
      },
      {
        criterion: "Resolution Explanation",
        result: "Fail"
      }
    ]
  };
}
