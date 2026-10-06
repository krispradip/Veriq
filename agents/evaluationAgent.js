export function runEvaluation(interaction) {
  return {
    interactionId: interaction.id,

    agent: interaction.agent,

    score: 86,

    result: "Needs Improvement",

    summary:
      "The interaction was handled professionally, but the refund timeline was not clearly explained.",

    findings: [
      {
        criterion: "Customer Verification",
        result: "Pass",
        score: 100,
        evidence:
          "The agent requested and confirmed the booking reference."
      },
      {
        criterion: "Issue Understanding",
        result: "Pass",
        score: 100,
        evidence:
          "The agent correctly identified that the customer was following up on a cancelled booking."
      },
      {
        criterion: "Resolution Explanation",
        result: "Fail",
        score: 50,
        evidence:
          "The customer asked for the refund timeframe, but the agent only stated that it depends on the bank."
      },
      {
        criterion: "Communication Quality",
        result: "Pass",
        score: 95,
        evidence:
          "The interaction remained clear, calm and professional."
      }
    ],

    opportunities: [
      "Clearly communicate the expected refund SLA.",
      "Confirm whether the customer has any additional questions before closing."
    ]
  };
}
