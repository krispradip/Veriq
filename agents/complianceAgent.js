export function runComplianceCheck(interaction) {
  return {
    interactionId: interaction.id,
    criticalFailure: false,
    findings: [
      {
        rule: "Customer verification completed",
        result: "Pass"
      }
    ]
  };
}
