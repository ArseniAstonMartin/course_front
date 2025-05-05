import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/courses?query=${searchQuery}`)
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <header>
      <nav className="navbar navbar-light bg-light d-flex justify-content-between align-items-center px-4">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="http://localhost:5173/courses">
            <h2>Udemy</h2>
          </a>
          <a className="ms-3 text-primary fw-bold" href="http://localhost:5173/courses">
            Courses
          </a>
        </div>

        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Enter course name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary ms-2" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div>
          <button className="btn btn-outline-primary me-2" onClick={handleLogin}>
            Log In
          </button>
          <button className="btn btn-primary" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
