import { useEffect, useState } from "react"
import InvitationService from "../service/InvitationService"

function MyInvitations() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    InvitationService.getMyInvitations()
      .then(res => {
        setInvitations(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Ошибка загрузки приглашений")
        setLoading(false)
      })
  }, [])

  const handleAccept = (id) => {
    InvitationService.acceptInvitation(id).then(() => {
      setInvitations(invitations.filter(inv => inv.id !== id))
    })
  }
  const handleReject = (id) => {
    InvitationService.rejectInvitation(id).then(() => {
      setInvitations(invitations.filter(inv => inv.id !== id))
    })
  }

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="container mt-4">
      <h2>Мои приглашения</h2>
      {invitations.length === 0 ? (
        <div>Нет приглашений</div>
      ) : (
        <ul className="list-group">
          {invitations.map(inv => (
            <li key={inv.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Вас пригласили на курс: <b>{inv.courseTitle}</b></span>
              <div>
                <button className="btn btn-success btn-sm me-2" onClick={() => handleAccept(inv.id)}>Принять</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleReject(inv.id)}>Отклонить</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyInvitations 