import { useEffect, useState } from "react"
import AuthService from "../service/auth.service"
import avatarNotFound from "../assets/avatar-not-found.svg"
import "../styles/MyProfilePage.css"
import { useNavigate } from "react-router-dom"

const MyProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    AuthService.getUser()
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    AuthService.logout()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Не удалось загрузить профиль пользователя
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="profile-container d-flex align-items-center" style={{ minHeight: "340px" }}>
        <img
          src={user.filename ? `http://127.0.0.1:9000/media/${user.filename}` : avatarNotFound}
          alt="avatar"
          className="profile-preview"
          onError={e => { e.target.onerror = null; e.target.src = avatarNotFound }}
        />
        <div style={{ marginLeft: 48 }}>
          <h2>{user.name || user.username}</h2>
          <hr className="pink-divider" />
          <div style={{ fontSize: "1.1rem", color: "#555" }}>
            <a href={`mailto:${user.email}`} style={{ color: "#007bff", textDecoration: "underline" }}>{user.email}</a>
          </div>
          <button className="btn btn-outline-danger mt-4" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default MyProfilePage 