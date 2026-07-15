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
  return (
    <>
      <header id="header">
        <h1>GenAI Mentor</h1>
        <p>Courses on GenAI architecture, LangGraph, and MCP.</p>
      </header>

      <section id="courses">
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
      </section>
    </>
  )
}

export default App
