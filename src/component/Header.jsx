import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../service/auth.service"
import avatarNotFound from "../assets/avatar-not-found.svg"

function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      AuthService.getUserInfo().then(setUser).catch(() => setUser(null))
    } else {
      setUser(null)
    }
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleProfile = () => {
    navigate("/my-profile")
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                handleSearch()
              }
            }}
          />
          <button className="btn btn-outline-primary ms-2" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div>
          {user ? (
            <img
              src={user.fileName ? `http://127.0.0.1:9000/media/${user.fileName}` : avatarNotFound}
              alt="avatar"
              className="rounded-circle"
              style={{ width: 40, height: 40, objectFit: "cover", cursor: "pointer", border: "2px solid #007bff" }}
              onClick={handleProfile}
              onError={e => { e.target.onerror = null; e.target.src = avatarNotFound }}
            />
          ) : (
            <>
              <button className="btn btn-outline-primary me-2" onClick={handleLogin}>
                Log In
              </button>
              <button className="btn btn-primary" onClick={handleSignup}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
