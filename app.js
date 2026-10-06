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

  output.innerHTML = `
    <div class="result-header">
      <div>
        <span class="section-label">AGENT RESULT</span>
        <h3>${title}</h3>
      </div>

      <span class="result-status">
        Complete
      </span>
    </div>

    <pre>${JSON.stringify(result, null, 2)}</pre>
  `;
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
