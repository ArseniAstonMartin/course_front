import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import instance from "../service/axios.js"
import reactLogo from "../assets/react.svg"
import avatarNotFound from "../assets/avatar-not-found.svg"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const SearchPage = () => {
  const query = useQuery().get("query") || ""
  const [filter, setFilter] = useState("courses") // "courses" или "teachers"
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [page, setPage] = useState(0)
  const [pageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query) return
    setLoading(true)
    setError("")
    let url = ""
    if (filter === "courses") {
      url = `/search/courses?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    } else {
      url = `/search/teachers?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    }
    instance.get(url)
      .then(res => {
        setResults(res.data.content || [])
        setTotalPages(res.data.totalPages || 1)
        setLoading(false)
      })
      .catch(err => {
        setError("Ошибка при поиске")
        setLoading(false)
      })
  }, [query, filter, page, pageSize])

  const handleCoursePage = (id) => {
    navigate(`/courses/${id}`)
  }

  const handleTeacherProfile = (id) => {
    navigate(`/profile/${id}`)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div className="container mt-4">
      <h2>Результаты поиска по запросу: "{query}"</h2>
      <div className="mb-3">
        <label className="me-2">Фильтр:</label>
        <select value={filter} onChange={e => { setFilter(e.target.value); setPage(0); }}>
          <option value="courses">Курсы</option>
          <option value="teachers">Учителя</option>
        </select>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mt-3">
        {results.length === 0 && !loading && <div>Нет результатов</div>}
        {filter === "courses" && results.map(course => (
          <div key={course.id} className="card mb-2 p-2 d-flex flex-row align-items-center">
            <img src={course.filename ? `http://127.0.0.1:9000/media/${course.filename}` : reactLogo} alt="Course Preview" style={{width: 60, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: 16}} onError={e => { e.target.onerror = null; e.target.src = reactLogo }} />
            <div style={{flex: 1}}>
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <div className="d-flex justify-content-start">
                <button className="btn btn-primary w-auto mt-2 ms-2" onClick={() => handleCoursePage(course.id)}>Learn More</button>
              </div>
            </div>
          </div>
        ))}
        {filter === "teachers" && results.map(teacher => (
          <div key={teacher.id} className="card mb-2 p-2 d-flex flex-row align-items-center">
            <img src={teacher.filename ? `http://127.0.0.1:9000/media/${teacher.filename}` : avatarNotFound} alt="Avatar" style={{width: 60, height: 60, objectFit: 'cover', borderRadius: '50%', marginRight: 16}} onError={e => { e.target.onerror = null; e.target.src = avatarNotFound }} />
            <div style={{flex: 1}}>
              <h5>{teacher.name}</h5>
              <p>{teacher.email}</p>
              <div className="d-flex justify-content-start">
                <button className="btn btn-primary w-auto mt-2 ms-2" onClick={() => handleTeacherProfile(teacher.id)}>Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <hr style={{ borderTop: "3px solid #ff69b4", margin: "32px 0 16px 0" }} />
      <div className="d-flex justify-content-center align-items-center mb-4" style={{ gap: 8 }}>
        <button className="btn btn-outline-primary btn-sm" disabled={page === 0} onClick={() => handlePageChange(page - 1)}>&lt;</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${i === page ? "btn-primary" : "btn-outline-primary"}`}
            style={{ minWidth: 36, margin: "0 2px" }}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </button>
        ))}
        <button className="btn btn-outline-primary btn-sm" disabled={page === totalPages - 1 || totalPages === 0} onClick={() => handlePageChange(page + 1)}>&gt;</button>
      </div>
    </div>
  )
}

export default SearchPage 