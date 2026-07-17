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

function App() {
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

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
      <header id="header">
        <h1>GenAI Mentor</h1>
        <p>Courses on GenAI architecture, LangGraph, and MCP.</p>
        {user && (
          <div className="account">
            <img className="avatar" src={user.photoURL} alt="" />
            <span>{user.displayName}</span>
            <button type="button" className="signout" onClick={logout}>
              Sign out
            </button>
          </div>
        )}
      </header>

      <section id="courses">
        {checkingAuth ? null : user ? (
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
        ) : (
          <div className="signin-gate">
            <p>Sign in with Google to view the courses.</p>
            <button type="button" className="signin" onClick={login}>
              Sign in with Google
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default App
