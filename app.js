import { analyseInteraction } from "./agents/agentOrchestrator.js";
import { runEvaluation } from "./agents/evaluationAgent.js";
import { runSopCheck } from "./agents/sopAgent.js";
import { runComplianceCheck } from "./agents/complianceAgent.js";

const app = document.getElementById("app");

let currentRole = "user";
let currentUserPage = "home";

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

const userPages = [
  { id: "home", label: "Home" },
  { id: "evaluations", label: "My Evaluations" },
  { id: "coaching", label: "Coaching & Development" },
  { id: "knowledge", label: "Knowledge & SOP" },
  { id: "actions", label: "My Actions" },
  { id: "testing", label: "Testing & Certification" }
];

function topBar() {
  return `
    <header class="topbar">

      <div class="topbar-left">

        <div class="topbar-logo">
          VQ
        </div>

        <div class="topbar-brand">
          <strong>SHARE Lens</strong>
          <span>Quality. Intelligence. Action.</span>
        </div>

      </div>

      <div class="user-header">

        <div class="user-details">
          <strong>Layla Haddad</strong>
          <span>Customer Service Agent · Entertainment</span>
        </div>

        <button
          class="signout"
          onclick="location.reload()"
        >
          Sign out
        </button>

      </div>

    </header>
  `;
}

function userSidebar() {
  return `
    <aside class="sidebar">

      <div class="sidebar-title">
        My Workspace
      </div>

      ${userPages
        .map(
          page => `
            <div
              class="nav-item ${
                currentUserPage === page.id ? "active" : ""
              }"
              onclick="showUserPage('${page.id}')"
            >
              ${page.label}
            </div>
          `
        )
        .join("")}

    </aside>
  `;
}

function userShell(content) {
  app.innerHTML = `
    <div class="workspace">

      ${topBar()}

      <div class="workspace-body">

        ${userSidebar()}

        <main class="content">
          ${content}
        </main>

      </div>

    </div>
  `;
}

function userHome() {
  return `
    <div class="page-heading">
      <span class="section-label">MY QUALITY</span>
      <h1>Good morning, Layla</h1>
      <p class="content-subtitle">
        Here is your latest quality performance and development activity.
      </p>
    </div>

    <div class="dashboard-grid four">

      <div class="dashboard-card metric-card">
        <span>My Quality Score</span>
        <strong>86%</strong>
        <small class="positive">↑ 4% vs last month</small>
      </div>

      <div class="dashboard-card metric-card">
        <span>SOP Compliance</span>
        <strong>92%</strong>
        <small class="positive">↑ 3%</small>
      </div>

      <div class="dashboard-card metric-card">
        <span>Evaluations</span>
        <strong>12</strong>
        <small>this month</small>
      </div>

      <div class="dashboard-card metric-card">
        <span>Open Actions</span>
        <strong>2</strong>
        <small>1 due soon</small>
      </div>

    </div>

    <div class="dashboard-grid two">

      <section class="dashboard-card">

        <div class="card-heading">
          <div>
            <span class="section-label">PERFORMANCE</span>
            <h3>My Quality Trend</h3>
          </div>
        </div>

        <div class="simple-chart">

          <div style="height:55%">
            <span>82%</span>
          </div>

          <div style="height:62%">
            <span>84%</span>
          </div>

          <div style="height:67%">
            <span>85%</span>
          </div>

          <div style="height:73%">
            <span>87%</span>
          </div>

          <div style="height:70%">
            <span>86%</span>
          </div>

        </div>

        <div class="chart-labels">
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
        </div>

      </section>

      <section class="dashboard-card">

        <div class="card-heading">
          <div>
            <span class="section-label">DEVELOPMENT</span>
            <h3>Assigned Coaching</h3>
          </div>

          <button
            class="text-button"
            onclick="showUserPage('coaching')"
          >
            View all
          </button>
        </div>

        <div class="list-item">
          <div>
            <strong>Refund SLA Communication</strong>
            <p>
              Improve explanation of refund timelines.
            </p>
          </div>

          <span class="badge amber">
            Due 12 Oct
          </span>
        </div>

      </section>

    </div>

    <div class="dashboard-grid two">

      <section class="dashboard-card">

        <div class="card-heading">
          <div>
            <span class="section-label">RECENT ACTIVITY</span>
            <h3>Recent Evaluations</h3>
          </div>

          <button
            class="text-button"
            onclick="showUserPage('evaluations')"
          >
            View all
          </button>
        </div>

        ${evaluationList(false)}

      </section>

      <section class="dashboard-card">

        <div class="card-heading">
          <div>
            <span class="section-label">ACTIONS</span>
            <h3>My Actions</h3>
          </div>

          <button
            class="text-button"
            onclick="showUserPage('actions')"
          >
            View all
          </button>
        </div>

        <div class="list-item">
          <div>
            <strong>Review Refund SOP</strong>
            <p>Assigned following evaluation INT-1001.</p>
          </div>

          <span class="badge red">
            Due 9 Oct
          </span>
        </div>

        <div class="list-item">
          <div>
            <strong>Acknowledge Policy Update</strong>
            <p>Cancellation & Refund Policy v3.</p>
          </div>

          <span class="badge">
            Open
          </span>
        </div>

      </section>

    </div>

    <section class="dashboard-card testing-preview">

      <div>
        <span class="section-label">COMING SOON</span>
        <h3>Testing & Certification</h3>
        <p>
          Periodic assessments, targeted remediation and certifications
          will be available here.
        </p>
      </div>

      <span class="coming-soon">
        Coming Soon
      </span>

    </section>
  `;
}

function evaluationList(includeActions = true) {
  return `
    <div class="evaluation-row">

      <div>
        <strong>INT-1001 · Refund</strong>
        <p>Voice · VOX Cinemas</p>
      </div>

      <span class="score-pill amber">
        89%
      </span>

      <span class="evaluation-status">
        Needs Improvement
      </span>

      ${
        includeActions
          ? `
            <button
              class="small-button"
              onclick="showEvaluationDetail()"
            >
              View Details
            </button>
          `
          : ""
      }

    </div>

    <div class="evaluation-row">

      <div>
        <strong>INT-0998 · Loyalty Points</strong>
        <p>Chat · SHARE</p>
      </div>

      <span class="score-pill green">
        94%
      </span>

      <span class="evaluation-status">
        Pass
      </span>

      ${
        includeActions
          ? `
            <button class="small-button">
              View Details
            </button>
          `
          : ""
      }

    </div>

    <div class="evaluation-row">

      <div>
        <strong>INT-0984 · Booking Change</strong>
        <p>Voice · VOX Cinemas</p>
      </div>

      <span class="score-pill green">
        91%
      </span>

      <span class="evaluation-status">
        Pass
      </span>

      ${
        includeActions
          ? `
            <button class="small-button">
              View Details
            </button>
          `
          : ""
      }

    </div>
  `;
}

function evaluationsPage() {
  return `
    <div class="page-heading">
      <span class="section-label">MY QUALITY</span>
      <h1>My Evaluations</h1>
      <p class="content-subtitle">
        Review your completed quality evaluations and detailed findings.
      </p>
    </div>

    <section class="dashboard-card">

      <div class="card-heading">
        <div>
          <h3>Evaluation History</h3>
          <p>12 evaluations completed this month.</p>
        </div>
      </div>

      ${evaluationList(true)}

    </section>

    <section class="placeholder-card agent-area">

      <div class="section-header">
        <span class="section-label">AGENTIC QUALITY</span>
        <h3>Analyse Demo Interaction</h3>
        <p>
          Run the SHARE Lens specialist agents against interaction INT-1001.
        </p>
      </div>

      ${interactionCard()}

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

function interactionCard() {
  return `
    <div class="interaction-card">

      <div class="interaction-top">

        <div>
          <span class="interaction-label">
            Demo Interaction
          </span>

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
  `;
}

function coachingPage() {
  return `
    <div class="page-heading">
      <span class="section-label">MY DEVELOPMENT</span>
      <h1>Coaching & Development</h1>
      <p class="content-subtitle">
        Coaching assigned from quality findings and development opportunities.
      </p>
    </div>

    <section class="dashboard-card coaching-card">

      <div class="coaching-header">

        <div>
          <span class="badge amber">
            Assigned
          </span>

          <h2>Refund SLA Communication</h2>

          <p>
            Improve clarity when explaining refund processing timelines
            to customers.
          </p>
        </div>

        <div class="coaching-score">
          <span>Related score</span>
          <strong>86%</strong>
        </div>

      </div>

      <div class="coaching-section">

        <h4>Why this was assigned</h4>

        <p>
          Interaction INT-1001 identified that the expected refund
          timeframe was not clearly explained when the customer asked
          how long the refund would take.
        </p>

      </div>

      <div class="coaching-section">

        <h4>Recommended development</h4>

        <ul>
          <li>Review the latest Refund Process SOP.</li>
          <li>Review approved refund SLA messaging.</li>
          <li>Complete manager coaching discussion.</li>
        </ul>

      </div>

      <div class="coaching-footer">

        <span>
          Due 12 October 2026
        </span>

        <button class="primary-small">
          Start Coaching
        </button>

      </div>

    </section>
  `;
}

function knowledgePage() {
  return `
    <div class="page-heading">
      <span class="section-label">KNOWLEDGE</span>
      <h1>Knowledge & SOP</h1>
      <p class="content-subtitle">
        Approved guidance and procedures relevant to your role.
      </p>
    </div>

    <div class="dashboard-grid two">

      <section class="dashboard-card">

        <div class="card-heading">
          <div>
            <h3>Relevant to Me</h3>
            <p>Frequently used procedures.</p>
          </div>
        </div>

        ${knowledgeItem(
          "Refund Process",
          "SOP",
          "Updated 2 Oct 2026"
        )}

        ${knowledgeItem(
          "Customer Verification",
          "SOP",
          "Updated 19 Sep 2026"
        )}

        ${knowledgeItem(
          "Cancellation Policy",
          "Policy",
          "Updated 12 Sep 2026"
        )}

        ${knowledgeItem(
          "Escalation Handling",
          "SOP",
          "Updated 28 Aug 2026"
        )}

      </section>

      <section class="dashboard-card">

        <div class="card-heading">
          <div>
            <h3>Recently Updated</h3>
            <p>Changes that may affect your work.</p>
          </div>
        </div>

        <div class="knowledge-update">

          <span class="badge red">
            Updated
          </span>

          <h4>Refund Process v3</h4>

          <p>
            Refund timeline guidance has been updated.
          </p>

          <button class="small-button">
            Review Update
          </button>

        </div>

      </section>

    </div>
  `;
}

function knowledgeItem(title, type, updated) {
  return `
    <div class="knowledge-item">

      <div>
        <strong>${title}</strong>
        <p>${type} · ${updated}</p>
      </div>

      <button class="small-button">
        Open
      </button>

    </div>
  `;
}

function actionsPage() {
  return `
    <div class="page-heading">
      <span class="section-label">MY WORK</span>
      <h1>My Actions</h1>
      <p class="content-subtitle">
        Actions assigned to you from evaluations, coaching and policy updates.
      </p>
    </div>

    <section class="dashboard-card">

      <div class="action-row">

        <div class="action-marker urgent"></div>

        <div class="action-content">
          <strong>Review Refund SOP</strong>
          <p>
            Review Refund Process v3 following evaluation INT-1001.
          </p>
        </div>

        <span class="badge red">
          Due 9 Oct
        </span>

        <button class="small-button">
          Open
        </button>

      </div>

      <div class="action-row">

        <div class="action-marker"></div>

        <div class="action-content">
          <strong>Complete Coaching</strong>
          <p>
            Refund SLA Communication coaching assignment.
          </p>
        </div>

        <span class="badge amber">
          Due 12 Oct
        </span>

        <button
          class="small-button"
          onclick="showUserPage('coaching')"
        >
          Open
        </button>

      </div>

      <div class="action-row">

        <div class="action-marker"></div>

        <div class="action-content">
          <strong>Acknowledge Policy Update</strong>
          <p>
            Cancellation & Refund Policy v3.
          </p>
        </div>

        <span class="badge">
          Open
        </span>

        <button class="small-button">
          Review
        </button>

      </div>

    </section>
  `;
}

function testingPage() {
  return `
    <div class="page-heading">
      <span class="section-label">COMING SOON</span>
      <h1>Testing & Certification</h1>
      <p class="content-subtitle">
        SHARE Lens testing and certification capability is reserved for a future phase.
      </p>
    </div>

    <section class="dashboard-card coming-soon-page">

      <div class="coming-icon">
        VQ
      </div>

      <h2>Testing & Certification</h2>

      <p>
        This module will support periodic assessments,
        targeted remediation and role-based certification.
      </p>

      <div class="future-features">

        <span>Periodic assessments</span>
        <span>Targeted remediation</span>
        <span>Certification</span>
        <span>Retesting</span>

      </div>

      <span class="coming-soon">
        Coming Soon
      </span>

    </section>
  `;
}

function showUserPage(page) {
  currentRole = "user";
  currentUserPage = page;

  let content = "";

  if (page === "home") {
    content = userHome();
  }

  if (page === "evaluations") {
    content = evaluationsPage();
  }

  if (page === "coaching") {
    content = coachingPage();
  }

  if (page === "knowledge") {
    content = knowledgePage();
  }

  if (page === "actions") {
    content = actionsPage();
  }

  if (page === "testing") {
    content = testingPage();
  }

  userShell(content);
}

function showUser() {
  currentUserPage = "home";
  showUserPage("home");
}

function showManager() {
  app.innerHTML = `
    <div class="workspace">
      ${topBar()}

      <main class="content">
        <h1>Manager Workspace</h1>
        <p>
          Manager View will be built after the User View is complete.
        </p>
      </main>
    </div>
  `;
}

function showAdmin() {
  app.innerHTML = `
    <div class="workspace">
      ${topBar()}

      <main class="content">
        <h1>Administration</h1>
        <p>
          Admin View will be built after the Manager View.
        </p>
      </main>
    </div>
  `;
}

function showEvaluationDetail() {
  currentUserPage = "evaluations";

  userShell(`
    <div class="page-heading">

      <button
        class="back-button"
        onclick="showUserPage('evaluations')"
      >
        ← Back to evaluations
      </button>

      <span class="section-label">EVALUATION DETAIL</span>

      <h1>INT-1001 · Refund</h1>

      <p class="content-subtitle">
        VOX Cinemas · Voice · ${demoInteraction.agent}
      </p>

    </div>

    <section class="dashboard-card">

      <div class="score-grid">

        <div class="score-card">
          <span>Overall Score</span>
          <strong>89%</strong>
        </div>

        <div class="score-card">
          <span>Evaluation</span>
          <strong>86%</strong>
        </div>

        <div class="score-card">
          <span>SOP Compliance</span>
          <strong>80%</strong>
        </div>

        <div class="score-card">
          <span>Compliance</span>
          <strong>100%</strong>
        </div>

      </div>

      <div class="recommendation-card">
        <span>Recommended Action</span>
        <strong>
          Assign targeted coaching on refund timeline communication.
        </strong>
      </div>

    </section>

    <section class="placeholder-card agent-area">

      <div class="section-header">
        <span class="section-label">SHARE Lens ANALYSIS</span>
        <h3>Agent Analysis</h3>
        <p>
          Review the specialist-agent findings for this interaction.
        </p>
      </div>

      ${interactionCard()}

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
        Select an agent to view the detailed analysis.
      </div>

    </section>
  `);
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
          <span>Critical Failure</span>
          <strong>
            ${result.criticalFailure ? "Yes" : "No"}
          </strong>
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
    `;

    return;
  }

  if (title === "Combined SHARE Lens Analysis") {
    output.innerHTML = `
      <div class="result-header">

        <div>
          <span class="section-label">SHARE Lens ANALYSIS</span>
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

      <div class="recommendation-card">
        <span>Recommended Action</span>
        <strong>${result.recommendedAction}</strong>
      </div>
    `;
  }
}

function activateStep(stepName, statusText, message) {
  const step = document.getElementById(`step-${stepName}`);
  const status = document.getElementById(`status-${stepName}`);
  const pipelineMessage = document.getElementById("pipeline-message");

  if (step) {
    step.classList.remove("waiting", "complete");
    step.classList.add("active");
  }

  if (status) {
    status.textContent = statusText;
  }

  if (pipelineMessage) {
    pipelineMessage.textContent = message;
  }
}

function completeStep(stepName, statusText) {
  const step = document.getElementById(`step-${stepName}`);
  const status = document.getElementById(`status-${stepName}`);

  if (step) {
    step.classList.remove("waiting", "active");
    step.classList.add("complete");
  }

  if (status) {
    status.textContent = statusText;
  }
}

function runEvaluationAgent() {
  showAgentResult(
    "Evaluation Agent",
    runEvaluation(demoInteraction)
  );
}

function runSopAgent() {
  showAgentResult(
    "SOP Agent",
    runSopCheck(demoInteraction)
  );
}

function runComplianceAgent() {
  showAgentResult(
    "Compliance Agent",
    runComplianceCheck(demoInteraction)
  );
}

function runAllAgents() {
  const output = document.getElementById("agent-output");

  if (!output) {
    return;
  }

  output.classList.remove("empty-state");

  output.innerHTML = `
    <div class="agent-pipeline">

      <div class="pipeline-header">
        <span class="section-label">
          SHARE Lens AGENT ORCHESTRATION
        </span>

        <h3>Running quality analysis</h3>

        <p>
          SHARE Lens is evaluating the interaction across multiple specialist agents.
        </p>
      </div>

      <div class="pipeline-steps">

        <div
          class="pipeline-step active"
          id="step-interaction"
        >
          <div class="pipeline-icon">1</div>

          <div>
            <strong>Interaction</strong>
            <span id="status-interaction">
              Preparing data...
            </span>
          </div>
        </div>

        <div class="pipeline-line"></div>

        <div
          class="pipeline-step waiting"
          id="step-evaluation"
        >
          <div class="pipeline-icon">2</div>

          <div>
            <strong>Evaluation Agent</strong>
            <span id="status-evaluation">
              Waiting
            </span>
          </div>
        </div>

        <div class="pipeline-line"></div>

        <div
          class="pipeline-step waiting"
          id="step-sop"
        >
          <div class="pipeline-icon">3</div>

          <div>
            <strong>SOP Agent</strong>
            <span id="status-sop">
              Waiting
            </span>
          </div>
        </div>

        <div class="pipeline-line"></div>

        <div
          class="pipeline-step waiting"
          id="step-compliance"
        >
          <div class="pipeline-icon">4</div>

          <div>
            <strong>Compliance Agent</strong>
            <span id="status-compliance">
              Waiting
            </span>
          </div>
        </div>

        <div class="pipeline-line"></div>

        <div
          class="pipeline-step waiting"
          id="step-result"
        >
          <div class="pipeline-icon">5</div>

          <div>
            <strong>Combined Analysis</strong>
            <span id="status-result">
              Waiting
            </span>
          </div>
        </div>

      </div>

      <div class="pipeline-footer">

        <div class="processing-dot"></div>

        <span id="pipeline-message">
          Preparing interaction for analysis...
        </span>

      </div>

    </div>
  `;

  setTimeout(() => {
    completeStep("interaction", "Interaction ready");

    activateStep(
      "evaluation",
      "Evaluating quality criteria...",
      "Evaluation Agent is reviewing the interaction."
    );
  }, 700);

  setTimeout(() => {
    completeStep("evaluation", "Evaluation complete");

    activateStep(
      "sop",
      "Checking SOP adherence...",
      "SOP Agent is validating required process steps."
    );
  }, 1800);

  setTimeout(() => {
    completeStep("sop", "SOP review complete");

    activateStep(
      "compliance",
      "Checking compliance controls...",
      "Compliance Agent is reviewing mandatory controls."
    );
  }, 2900);

  setTimeout(() => {
    completeStep(
      "compliance",
      "Compliance review complete"
    );

    activateStep(
      "result",
      "Combining agent results...",
      "SHARE Lens is consolidating findings and recommendations."
    );
  }, 4000);

  setTimeout(() => {
    completeStep("result", "Analysis complete");

    showAgentResult(
      "Combined SHARE Lens Analysis",
      analyseInteraction(demoInteraction)
    );
  }, 5200);
}

window.showUser = showUser;
window.showManager = showManager;
window.showAdmin = showAdmin;

window.showUserPage = showUserPage;
window.showEvaluationDetail = showEvaluationDetail;

window.runEvaluationAgent = runEvaluationAgent;
window.runSopAgent = runSopAgent;
window.runComplianceAgent = runComplianceAgent;
window.runAllAgents = runAllAgents;
