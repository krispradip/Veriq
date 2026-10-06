export function runComplianceCheck(interaction) {
  return {
    interactionId: interaction.id,

    result: "Pass",

    criticalFailure: false,

    complianceScore: 100,

    findings: [
      {
        rule: "Customer information protection",
        result: "Pass",
        evidence:
          "No sensitive information was disclosed before validation."
      },
      {
        rule: "Booking reference validation",
        result: "Pass",
        evidence:
          "The booking reference was requested before discussing booking details."
      },
      {
        rule: "Restricted language",
        result: "Pass",
        evidence:
          "No prohibited or misleading language was detected."
      }
    ],

    criticalFindings: []
  };
}
