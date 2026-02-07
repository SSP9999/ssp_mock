import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// API base URL
const API_BASE = 'https://mock-test-backend-amber.vercel.app/api';

// Components
const Login = ({ onLogin, onSSOLogin, switchToSignup }) => {
  console.log('Rendering Login component', onSSOLogin);

  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showSSO, setShowSSO] = React.useState(false);

  // 🔐 Hardcoded SSO TOKEN (REPLACE with real generated token)
const SAMPLE_SSO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzb0B0ZXN0LmNvbSIsInVzZXJuYW1lIjoic3NvVXNlciIsInN1YiI6IjEwMDEiLCJpYXQiOjE3NzA0MzQ5MDMsImV4cCI6MTgwMTk3MDkwM30.g3WS5qi0bldiydw1lW7nWOm3ZCKT86yOzE07eR2dNpw";


  const [ssoToken, setSsoToken] = React.useState(SAMPLE_SSO_TOKEN);

  // ---------------- NORMAL LOGIN ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        let mockPass = null;
        if (
          formData.email.includes('mock') ||
          formData.email.includes('admin') ||
          formData.password === 'admin123'
        ) {
          mockPass = formData.password;
        }

        onLogin(data.user, mockPass);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SSO LOGIN ----------------
  const handleSSOSubmit = async (e) => {
    e.preventDefault();
    if (!ssoToken) return;
    onSSOLogin(ssoToken);
  };

  // ---------------- AUTO SSO ----------------
  const handleAutoSSO = () => {
    onSSOLogin(SAMPLE_SSO_TOKEN);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{showSSO ? 'SSO Login' : 'Login'}</h2>

        {/* ---------------- NORMAL LOGIN UI ---------------- */}
        {!showSSO ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              {error && <div className="error">{error}</div>}

              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="sso-divider">
              <span>OR</span>
            </div>

            {/* 🔐 AUTO SSO LOGIN BUTTON */}
            <button className="sso-btn" onClick={handleAutoSSO}>
              Login with SSO (Auto)
            </button>

            {/* Manual token option */}
            <button
              className="link-btn"
              onClick={() => setShowSSO(true)}
              style={{ marginTop: '10px' }}
            >
              Enter Token Manually
            </button>
          </>
        ) : (
          <>
            {/* ---------------- MANUAL TOKEN UI ---------------- */}
            <form onSubmit={handleSSOSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter SSO Token"
                  value={ssoToken}
                  onChange={(e) => setSsoToken(e.target.value)}
                  required
                />
              </div>

              {error && <div className="error">{error}</div>}

              <button type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Login with Token'}
              </button>
            </form>

            <button
              className="link-btn back-to-login"
              onClick={() => setShowSSO(false)}
            >
              Back to regular login
            </button>
          </>
        )}

        <p className="auth-footer">
          Don't have an account?
          <button className="link-btn" onClick={switchToSignup}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};


const Signup = ({ onLogin, switchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p>
          Already have an account? 
          <button className="link-btn" onClick={switchToLogin}>Login</button>
        </p>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout, onStartTest, onOpenExternalApp }) => {
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTests = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/tests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTests(data);
      }
    } catch (err) {
      console.error('Error fetching tests:', err);
    }
  }, []);

  const fetchResults = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/results`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTests();
    fetchResults();
  }, [fetchTests, fetchResults]);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/studentlogo.jpg" alt="Student Logo" style={{width:"3rem"}}/>
          <h1>Mock Test Dashboard</h1>
        </div>
        <div className="user-info">
          <button onClick={onOpenExternalApp} className="external-app-btn">External App</button>
          <span>Welcome, {user.name}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="tests-section">
          <h2>Available Tests</h2>
          <div className="tests-grid">
            {tests.map(test => (
              <div key={test.id} className="test-card">
                <h3>{test.title}</h3>
                <p className="test-type">{test.type}</p>
                <p>{test.questionCount} Questions</p>
                <p>{test.duration} Minutes</p>
                <button 
                  onClick={() => onStartTest(test.id)}
                  className="start-test-btn"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="results-section">
          <h2>Previous Results</h2>
          {results.length === 0 ? (
            <p>No test attempts yet.</p>
          ) : (
            <div className="results-list">
              {results.map(result => (
                <div key={result.id} className="result-card">
                  <h4>{result.testTitle}</h4>
                  <p>Score: {result.score}/{result.totalQuestions} ({result.percentage}%)</p>
                  <p>Date: {new Date(result.completedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const MockTest = ({ testId, onTestComplete, onBackToDashboard }) => {
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchTest = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/tests/${testId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setTest(data);
      }
    } catch (err) {
      console.error('Error fetching test:', err);
    } finally {
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    fetchTest();
  }, [fetchTest]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
      });

      if (response.ok) {
        const result = await response.json();
        onTestComplete(result);
      }
    } catch (err) {
      console.error('Error submitting test:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading test...</div>;
  }

  if (!test) {
    return <div className="error">Test not found</div>;
  }

  return (
    <div className="mock-test">
      <header className="test-header">
        <h1>{test.title}</h1>
        <button onClick={onBackToDashboard} className="back-btn">Back to Dashboard</button>
      </header>

      <div className="test-content">
        {test.questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <h3>Q{index + 1}. {question.question}</h3>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="option">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optionIndex}
                    checked={answers[question.id] === optionIndex}
                    onChange={() => handleAnswerChange(question.id, optionIndex)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={handleSubmit} 
          disabled={submitting || Object.keys(answers).length === 0}
          className="submit-test-btn"
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
};

const ExternalApp = ({ user, mockPassword, onBackToDashboard }) => {
  const externalAppUrl = mockPassword
    ? `https://lookout-dev-staging.vercel.app/login?email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(mockPassword)}`
    : `https://lookout-dev-staging.vercel.app/`;

  return (
    <div className="external-app">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/studentlogo.jpg" alt="Student Logo" style={{width:"3rem"}}/>
          <h1>External Application</h1>
        </div>
        <button onClick={onBackToDashboard} className="back-btn">Back to Dashboard</button>
      </header>
      <div className="external-app-content">
        <iframe
          src={externalAppUrl}
          title="External App"
          className="external-iframe"
        />
      </div>
    </div>
  );
};

const Results = ({ result, onBackToDashboard }) => {
  return (
    <div className="results">
      <header className="results-header">
        <h1>Test Results</h1>
        <button onClick={onBackToDashboard} className="back-btn">Back to Dashboard</button>
      </header>

      <div className="results-content">
        <div className="score-summary">
          <h2>Your Score: {result.score}/{result.totalQuestions}</h2>
          <h3>Percentage: {result.percentage}%</h3>
        </div>

        <div className="detailed-results">
          <h3>Detailed Results</h3>
          {result.detailedResults.map((item, index) => (
            <div key={item.questionId} className={`result-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
              <h4>Q{index + 1}. {item.question}</h4>
              <div className="result-options">
                {item.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex} 
                    className={`result-option ${
                      optionIndex === item.correctAnswer ? 'correct-answer' :
                      optionIndex === item.userAnswer && !item.isCorrect ? 'wrong-answer' : ''
                    }`}
                  >
                    {option}
                    {optionIndex === item.correctAnswer && ' ✓'}
                    {optionIndex === item.userAnswer && !item.isCorrect && ' ✗'}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [mockPassword, setMockPassword] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = useCallback((userData, mockPass = null) => {
    setUser(userData);
    setMockPassword(mockPass);
    setCurrentView('dashboard');
  }, []);

  const handleSSOLogin = useCallback(async (externalToken) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/sso?X-External-Token=${encodeURIComponent(externalToken)}`);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        handleLogin(data.user);

        // Clean up URL if token was in query
        const url = new URL(window.location);
        if (url.searchParams.has('sso_token')) {
          url.searchParams.delete('sso_token');
          window.history.replaceState({}, document.title, url.pathname);
        }
      } else {
        setError(data.message || 'SSO Login failed');
        setCurrentView('login');
      }
    } catch (err) {
      setError('Connection error during SSO. Please try again.');
      setCurrentView('login');
    } finally {
      setLoading(false);
    }
  }, [handleLogin]);

  useEffect(() => {
    // Check for SSO token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const ssoToken = urlParams.get('sso_token');

    if (ssoToken) {
      handleSSOLogin(ssoToken);
      return;
    }

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, [handleSSOLogin]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMockPassword(null);
    setCurrentView('login');
  };

  const handleStartTest = (testId) => {
    setSelectedTestId(testId);
    setCurrentView('test');
  };

  const handleTestComplete = (result) => {
    setTestResult(result);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedTestId(null);
    setTestResult(null);
  };

  const handleOpenExternalApp = () => {
    setCurrentView('externalApp');
  };

  if (loading && currentView === 'login') {
    return <div className="loading">Processing SSO login...</div>;
  }

  return (
    <div className="App">
      {error && currentView === 'login' && <div className="error global-error">{error}</div>}

      {currentView === 'login' && (
        <Login 
          onLogin={handleLogin}
          onSSOLogin={handleSSOLogin}
          switchToSignup={() => setCurrentView('signup')}
        />
      )}

      {currentView === 'signup' && (
        <Signup 
          onLogin={handleLogin}
          switchToLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'dashboard' && user && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
          onStartTest={handleStartTest}
          onOpenExternalApp={handleOpenExternalApp}
        />
      )}

      {currentView === 'externalApp' && user && (
        <ExternalApp
          user={user}
          mockPassword={mockPassword}
          onBackToDashboard={handleBackToDashboard}
        />
      )}

      {currentView === 'test' && selectedTestId && (
        <MockTest 
          testId={selectedTestId}
          onTestComplete={handleTestComplete}
          onBackToDashboard={handleBackToDashboard}
        />
      )}

      {currentView === 'results' && testResult && (
        <Results 
          result={testResult}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;