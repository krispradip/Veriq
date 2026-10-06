import { useState } from 'react'
import './App.css'

type View = 'login' | 'user' | 'manager' | 'admin'

function App() {
  const [view, setView] = useState<View>('login')

  if (view === 'login') {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="logo">VQ</div>

          <h1>VeriQ</h1>
          <p className="tagline">Quality. Intelligence. Action.</p>

          <h2>Welcome</h2>

          <p className="description">
            AI-powered quality management across every interaction,
            team and business unit.
          </p>

          <button
            className="login-button"
            onClick={() => setView('user')}
          >
            Continue with MAF SSO
          </button>

          <p className="small-text">
            Microsoft Entra ID
          </p>

          <div className="demo-links">
            <button onClick={() => setView('user')}>
              User View
            </button>

            <button onClick={() => setView('manager')}>
              Manager View
            </button>

            <button onClick={() => setView('admin')}>
              Admin View
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="workspace">
      <header>
        <div>
          <strong>VeriQ</strong>
          <span>Quality. Intelligence. Action.</span>
        </div>

        <button onClick={() => setView('login')}>
          Sign out
        </button>
      </header>

      <main>
        {view === 'user' && (
          <>
            <h1>User Workspace</h1>
            <p>Your quality, coaching and development workspace.</p>
          </>
        )}

        {view === 'manager' && (
          <>
            <h1>Manager Workspace</h1>
            <p>Team quality, insights and coaching management.</p>
          </>
        )}

        {view === 'admin' && (
          <>
            <h1>Administration</h1>
            <p>Configure and manage the VeriQ platform.</p>
          </>
        )}
      </main>
    </div>
  )
}

export default App