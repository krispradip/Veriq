import { analyseInteraction } from "./agents/agentOrchestrator.js";
import { runEvaluation } from "./agents/evaluationAgent.js";
import { runSopCheck } from "./agents/sopAgent.js";
import { runComplianceCheck } from "./agents/complianceAgent.js";

const app = document.getElementById("app");

const demoInteraction = {
  id: "INT-1001",
  channel: "Voice",
  agent: "Layla Haddad",
  process: "Refund",
  customer: "Aisha Rahman",
  businessUnit: "Entertainment",
  brand: "VOX Cinemas",
  duration: "08:42",
  transcript: `
Customer: I cancelled my booking yesterday but I still have not received my refund.
Agent: Let me check that for you.
Customer: Okay.
Agent: Can you confirm your booking reference?
Customer: VX92831.
Agent: Thank you. I can see the cancellation was completed successfully.
Customer: When will the refund reach me?
Agent: It should be processed shortly.
Customer: How many days?
Agent: It depends on the bank.
  `
};

function topBar() {
  return `
    <header class="topbar">

      <div class="topbar-left">

        <div class="topbar-logo">
          VQ
        </div>

        <div class="topbar-brand">
          <strong>VeriQ</strong>
          <span>Quality. Intelligence. Action.</span>
        </div>

      </div>

      <button
        class="signout"
        onclick="location.reload()"
      >
        Sign out
      </button>

    </header>
  `;
}

function sidebar(items) {
  return `
    <aside class="sidebar">

      <div class="sidebar-title">
        Workspace
      </div>

      ${items
        .map(
          (item, index) => `
            <div
              class="nav-item ${index === 0 ? "active" : ""}"
            >
              ${item}
            </div>
          `
        )
        .join("")}

    </aside>
  `;
}

function agentPanel() {
  return `
    <section class="placeholder-card">

      <div class="section-header">
        <div>
          <span class="section-label">AGENTIC QUALITY</span>
          <h3>VeriQ AI Agents</h3>
          <p>
            Run one or more quality agents against the demo interaction.
          </p>
        </div>
      </div>

      <div class="interaction-card">

        <div class="interaction-top">

          <div>
            <span class="interaction-label">Demo Interaction</span>
            <h4>${demoInteraction.id}</h4>
          </div>

          <span class="channel-badge">
            ${demoInteraction.channel}
          </span>

        </div>

        <div class="interaction-grid">

          <div>
            <span>Agent</span>
            <strong>${demoInteraction.agent}</strong>
          </div>

          <div>
            <span>Customer</span>
            <strong>${demoInteraction.customer}</strong>
          </div>

          <div>
            <span>Process</span>
            <strong>${demoInteraction.process}</strong>
          </div>

          <div>
            <span>Brand</span>
            <strong>${demoInteraction.brand}</strong>
          </div>

        </div>

      </div>

      <div class="agent-buttons">

        <button onclick="runEvaluationAgent()">
          Evaluation Agent
        </button>

        <button onclick="runSopAgent()">
          SOP Agent
        </button>

        <button onclick="runComplianceAgent()">
          Compliance Agent
        </button>

        <button
          class="run-all"
          onclick="runAllAgents()"
        >
          Run All Agents
        </button>

      </div>

      <div
        id="agent-output"
        class="agent-output empty-state"
      >
        Select an agent to begin.
      </div>

    </section>
  `;
}

function workspace(title, subtitle, items) {
  app.innerHTML = `

    <div class="workspace">

      ${topBar()}

      <div class="workspace-body">

        ${sidebar(items)}

        <main class="content">

          <div class="page-heading">

            <h1>${title}</h1>

            <p class="content-subtitle">
              ${subtitle}
            </p>

          </div>

          ${agentPanel()}

        </main>

      </div>

    </div>
  `;
}

function showUser() {
  workspace(
    "My Quality",
    "Your performance, evaluations, coaching and development.",
    [
      "Home",
      "My Evaluations",
      "Coaching & Development",
      "Knowledge & SOP",
      "My Actions",
      "Testing & Certification"
    ]
  );
}

function showManager() {
  workspace(
    "Team Quality",
    "Monitor quality, identify opportunities and develop your team.",
    [
      "Home",
      "Team Quality",
      "Evaluations",
      "Coaching",
      "Quality Opportunities",
      "Knowledge Gaps",
      "Actions",
      "Reports",
      "Testing & Certification"
    ]
  );
}

function showAdmin() {
  workspace(
    "Administration",
    "Configure and manage the VeriQ platform.",
    [
      "Overview",
      "Organisation",
      "Identity & Access",
      "Quality Configuration",
      "SOP & Knowledge",
      "AI Configuration",
      "Workflow",
      "Integrations",
      "Testing & Certification",
      "Platform"
    ]
  );
}

function showAgentResult(title, result) {
  const output = document.getElementById("agent-output");

  if (!output) {
    return;
  }

  output.classList.remove("empty-state");

  if (title === "Evaluation Agent") {
    output.innerHTML = `
      <div class="result-header">
        <div>
          <span class="section-label">EVALUATION AGENT</span>
          <h3>${result.result}</h3>
        </div>

        <span class="result-status">
          ${result.score}%
        </span>
      </div>

      <div class="score-grid">

        <div class="score-card">
          <span>Quality Score</span>
          <strong>${result.score}%</strong>
        </div>

        <div class="score-card">
          <span>Agent</span>
          <strong>${result.agent}</strong>
        </div>

        <div class="score-card">
          <span>Interaction</span>
          <strong>${result.interactionId}</strong>
        </div>

        <div class="score-card">
          <span>Result</span>
          <strong>${result.result}</strong>
        </div>

      </div>

      <div class="result-section">
        <h4>Summary</h4>
        <p>${result.summary}</p>
      </div>

      <div class="result-section">
        <h4>Evaluation Findings</h4>

        ${result.findings
          .map(
            finding => `
              <div class="finding-row">

                <div>
                  <strong>${finding.criterion}</strong>
                  <p>${finding.evidence}</p>
                </div>

                <span class="finding-status ${finding.result.toLowerCase()}">
                  ${finding.result}
                </span>

              </div>
            `
          )
          .join("")}

      </div>

      <div class="result-section">
        <h4>Improvement Opportunities</h4>

        <ul>
          ${result.opportunities
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>
      </div>
    `;

    return;
  }

  if (title === "SOP Agent") {
    output.innerHTML = `
      <div class="result-header">
        <div>
          <span class="section-label">SOP AGENT</span>
          <h3>${result.sop}</h3>
        </div>

        <span class="result-status">
          ${result.compliance}%
        </span>
      </div>

      <div class="score-grid">

        <div class="score-card">
          <span>SOP Compliance</span>
          <strong>${result.compliance}%</strong>
        </div>

        <div class="score-card">
          <span>Result</span>
          <strong>${result.result}</strong>
        </div>

        <div class="score-card">
          <span>Interaction</span>
          <strong>${result.interactionId}</strong>
        </div>

        <div class="score-card">
          <span>Missed Steps</span>
          <strong>${result.missedSteps.length}</strong>
        </div>

      </div>

      <div class="result-section">
        <h4>Process Steps</h4>

        ${result.steps
          .map(
            step => `
              <div class="finding-row">

                <div>
                  <strong>${step.step}</strong>
                  <p>${step.evidence}</p>
                </div>

                <span class="finding-status ${step.status.toLowerCase()}">
                  ${step.status}
                </span>

              </div>
            `
          )
          .join("")}

      </div>

      <div class="result-section">
        <h4>Missed SOP Steps</h4>

        ${
          result.missedSteps.length
            ? `
              <ul>
                ${result.missedSteps
                  .map(step => `<li>${step}</li>`)
                  .join("")}
              </ul>
            `
            : `<p>No missed SOP steps.</p>`
        }
      </div>
    `;

    return;
  }

  if (title === "Compliance Agent") {
    output.innerHTML = `
      <div class="result-header">
        <div>
          <span class="section-label">COMPLIANCE AGENT</span>
          <h3>${result.result}</h3>
        </div>

        <span class="result-status">
          ${result.complianceScore}%
        </span>
      </div>

      <div class="score-grid">

        <div class="score-card">
          <span>Compliance Score</span>
          <strong>${result.complianceScore}%</strong>
        </div>

        <div class="score-card">
          <span>Result</span>
          <strong>${result.result}</strong>
        </div>

        <div class="score-card">
          <span>Critical Failure</span>
          <strong>${result.criticalFailure ? "Yes" : "No"}</strong>
        </div>

        <div class="score-card">
          <span>Interaction</span>
          <strong>${result.interactionId}</strong>
        </div>

      </div>

      <div class="result-section">
        <h4>Compliance Findings</h4>

        ${result.findings
          .map(
            finding => `
              <div class="finding-row">

                <div>
                  <strong>${finding.rule}</strong>
                  <p>${finding.evidence}</p>
                </div>

                <span class="finding-status ${finding.result.toLowerCase()}">
                  ${finding.result}
                </span>

              </div>
            `
          )
          .join("")}

      </div>

      ${
        result.criticalFindings.length
          ? `
            <div class="recommendation-card">
              <span>Critical Findings</span>

              ${result.criticalFindings
                .map(item => `<strong>${item}</strong>`)
                .join("<br>")}
            </div>
          `
          : `
            <div class="recommendation-card">
              <span>Critical Findings</span>
              <strong>No critical compliance failures detected.</strong>
            </div>
          `
      }
    `;

    return;
  }

  if (title === "Combined VeriQ Analysis") {
    output.innerHTML = `
      <div class="result-header">
        <div>
          <span class="section-label">VERIQ ANALYSIS</span>
          <h3>${result.finalStatus}</h3>
        </div>

        <span class="result-status">
          ${result.overallScore}%
        </span>
      </div>

      <div class="score-grid">

        <div class="score-card">
          <span>Overall Score</span>
          <strong>${result.overallScore}%</strong>
        </div>

        <div class="score-card">
          <span>Evaluation</span>
          <strong>${result.evaluation.score}%</strong>
        </div>

        <div class="score-card">
          <span>SOP Compliance</span>
          <strong>${result.sop.compliance}%</strong>
        </div>

        <div class="score-card">
          <span>Compliance</span>
          <strong>${result.compliance.complianceScore}%</strong>
        </div>

      </div>

      <div class="result-section">
        <h4>Summary</h4>
        <p>${result.evaluation.summary}</p>
      </div>

      <div class="result-section">
        <h4>Key Quality Findings</h4>

        ${result.evaluation.findings
          .map(
            finding => `
              <div class="finding-row">

                <div>
                  <strong>${finding.criterion}</strong>
                  <p>${finding.evidence}</p>
                </div>

                <span class="finding-status ${finding.result.toLowerCase()}">
                  ${finding.result}
                </span>

              </div>
            `
          )
          .join("")}

      </div>

      <div class="result-section">
        <h4>Missed SOP Steps</h4>

        ${
          result.sop.missedSteps.length
            ? `
              <ul>
                ${result.sop.missedSteps
                  .map(step => `<li>${step}</li>`)
                  .join("")}
              </ul>
            `
            : `<p>No missed SOP steps.</p>`
        }
      </div>

      <div class="result-section">
        <h4>Compliance</h4>

        <div class="finding-row">

          <div>
            <strong>
              ${
                result.compliance.criticalFailure
                  ? "Critical compliance failure detected"
                  : "No critical compliance failures"
              }
            </strong>

            <p>
              Compliance score:
              ${result.compliance.complianceScore}%
            </p>
          </div>

          <span class="finding-status ${
            result.compliance.criticalFailure ? "fail" : "pass"
          }">
            ${
              result.compliance.criticalFailure
                ? "Fail"
                : "Pass"
            }
          </span>

        </div>

      </div>

      <div class="recommendation-card">
        <span>Recommended Action</span>
        <strong>${result.recommendedAction}</strong>
      </div>
    `;

    return;
  }
}

function runEvaluationAgent() {
  const result = runEvaluation(demoInteraction);

  showAgentResult(
    "Evaluation Agent",
    result
  );
}

function runSopAgent() {
  const result = runSopCheck(demoInteraction);

  showAgentResult(
    "SOP Agent",
    result
  );
}

function runComplianceAgent() {
  const result = runComplianceCheck(demoInteraction);

  showAgentResult(
    "Compliance Agent",
    result
  );
}

function runAllAgents() {
  const result = analyseInteraction(demoInteraction);

  showAgentResult(
    "Combined VeriQ Analysis",
    result
  );
}
const demoResult = analyseInteraction(demoInteraction);

console.log("VeriQ Agent Result:", demoResult);

window.showUser = showUser;
window.showManager = showManager;
window.showAdmin = showAdmin;

window.runEvaluationAgent = runEvaluationAgent;
window.runSopAgent = runSopAgent;
window.runComplianceAgent = runComplianceAgent;
window.runAllAgents = runAllAgents;
