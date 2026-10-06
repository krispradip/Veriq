export function runSopCheck(interaction) {
  return {
    interactionId: interaction.id,

    sop: "Refund Process",

    compliance: 80,

    result: "Partial Compliance",

    steps: [
      {
        step: "Identify customer request",
        status: "Pass",
        evidence:
          "Customer stated that a cancelled booking refund had not yet been received."
      },
      {
        step: "Verify booking reference",
        status: "Pass",
        evidence:
          "Agent requested booking reference VX92831."
      },
      {
        step: "Confirm cancellation status",
        status: "Pass",
        evidence:
          "Agent confirmed that the cancellation was successfully completed."
      },
      {
        step: "Explain refund timeline",
        status: "Fail",
        evidence:
          "The expected refund SLA was not provided."
      },
      {
        step: "Confirm customer understanding",
        status: "Fail",
        evidence:
          "No confirmation was obtained that the customer understood the next steps."
      }
    ],

    missedSteps: [
      "Explain refund timeline",
      "Confirm customer understanding"
    ]
  };
}
