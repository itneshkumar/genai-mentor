import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import './App.css'

const courses = [
  {
    id: '6S6czg1pPIU',
    title: 'GenAI Architecture',
  },
  {
    id: 'DBPSk0AnbPQ',
    title: 'LangGraph Architecture & MCP Concept',
  },
]

const categories = [
  { id: 'genai', label: 'GenAI' },
  { id: 'mlops', label: 'MLOps', upcoming: true },
]

function Nav({ user, checkingAuth, category, onCategoryChange, onSignOut }) {
  return (
    <nav className="nav-card">
      <div className="nav-profile">
        {!checkingAuth && user && (
          <>
            <img className="nav-avatar" src={user.photoURL} alt="" />
            <span className="nav-username">{user.displayName}</span>
            <button type="button" className="signout" onClick={onSignOut}>
              Sign out
            </button>
          </>
        )}
      </div>
      <span className="nav-brand">GenAI Mentor</span>
      {user && (
        <div className="nav-tabs-wrapper">
          <div className="nav-tabs">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`nav-link${category === c.id ? ' active' : ''}`}
                disabled={c.upcoming}
                onClick={() => onCategoryChange(c.id)}
              >
                {c.label}
                {c.upcoming && <span className="upcoming-badge">Upcoming</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-copyright">© 2026 ITNESH KUMAR</span>
      <div className="footer-links">
        <a
          href="https://wa.me/918010112762"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          <svg className="footer-icon" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.661l.303.18c1.5.891 3.229 1.362 5.004 1.363 5.425 0 9.837-4.411 9.84-9.839 0-2.635-1.027-5.112-2.892-6.977s-4.341-2.891-6.976-2.891c-5.424 0-9.835 4.411-9.838 9.839 0 1.884.534 3.719 1.545 5.305l.197.308-1.003 3.666 3.76-.987zm11.367-7.405c-.31-.156-1.834-.905-2.112-1.006-.279-.101-.482-.152-.684.152-.202.304-.785 1.006-.962 1.215-.177.209-.355.236-.665.08-.31-.156-1.309-.482-2.492-1.54-.92-.821-1.541-1.835-1.721-2.144-.18-.309-.019-.476.136-.631.14-.14.31-.362.466-.543.155-.181.207-.309.31-.514.104-.206.052-.387-.026-.543-.078-.156-.684-1.648-.938-2.259-.247-.595-.499-.514-.684-.523-.177-.009-.38-.011-.583-.011s-.532.076-.811.381c-.279.304-1.064 1.041-1.064 2.539 0 1.498 1.089 2.943 1.241 3.146.152.203 2.144 3.274 5.19 4.587.725.311 1.29.497 1.73.637.728.231 1.39.198 1.913.12.583-.087 1.834-.75 2.088-1.474.253-.724.253-1.344.177-1.474-.076-.131-.279-.209-.589-.365z" />
          </svg>
          <span>WhatsApp</span>
        </a>
        <a href="tel:+918010112762" className="footer-link">
          <span className="footer-emoji">📞</span>
          <span>Call</span>
        </a>
        <a
          href="https://linkedin.com/in/itneshkumar"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          <svg className="footer-icon" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span>LinkedIn</span>
        </a>
        <a
          href="https://x.com/kumaritnesh"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          <svg className="footer-icon" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Twitter</span>
        </a>
        <a href="mailto:itneshkumar@gmail.com" className="footer-link">
          <span className="footer-emoji">📧</span>
          <span>Email</span>
        </a>
      </div>
    </footer>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [category, setCategory] = useState('genai')

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setCheckingAuth(false)
    })
  }, [])

  const login = () => signInWithPopup(auth, googleProvider)
  const logout = () => signOut(auth)

  return (
    <>
      <Nav
        user={user}
        checkingAuth={checkingAuth}
        category={category}
        onCategoryChange={setCategory}
        onSignOut={logout}
      />

      <p id="subtitle">Courses on GenAI architecture, LangGraph, and MCP.</p>

      <section id="courses">
        {checkingAuth ? null : !user ? (
          <div className="signin-gate">
            <p>Sign in with Google to view the courses.</p>
            <button type="button" className="signin" onClick={login}>
              Sign in with Google
            </button>
          </div>
        ) : category === 'mlops' ? (
          <div className="signin-gate">
            <p>MLOps courses are coming soon.</p>
          </div>
        ) : (
          <ul className="course-grid">
            {courses.map((course) => (
              <li key={course.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${course.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="course-thumb"
                    src={`https://img.youtube.com/vi/${course.id}/hqdefault.jpg`}
                    alt={course.title}
                  />
                  <h2 className="course-title">{course.title}</h2>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Footer />
    </>
  )
}

export default App
