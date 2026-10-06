export function runSopCheck(interaction) {
  return {
    interactionId: interaction.id,
    sop: "Refund Process",
    compliance: 80,
    steps: [
      {
        step: "Verify customer",
        status: "Pass"
      },
      {
        step: "Confirm booking reference",
        status: "Pass"
      },
      {
        step: "Explain refund timeline",
        status: "Fail"
      }
    ]
  };
}
