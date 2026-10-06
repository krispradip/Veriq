import { analyseInteraction } from "./agents/agentOrchestrator.js";
const app = document.getElementById("app");

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

function workspace(title, subtitle, items) {

  app.innerHTML = `

    <div class="workspace">

      ${topBar()}

      <div class="workspace-body">

        ${sidebar(items)}

        <main class="content">

          <h1>${title}</h1>

          <p class="content-subtitle">
            ${subtitle}
          </p>

          <section class="placeholder-card">

            <h3>
              VeriQ prototype
            </h3>

            <p>
              This workspace is now ready.
              We will build the dashboard and functionality
              module by module.
            </p>

          </section>

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
const demoInteraction = {
  id: "INT-1001",
  channel: "Voice",
  agent: "Layla Haddad",
  process: "Refund"
};

const demoResult = analyseInteraction(demoInteraction);

console.log("VeriQ Agent Result:", demoResult);
