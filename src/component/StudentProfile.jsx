import { useState, useEffect } from "react"
import { getAllCourses } from "../service/CourseService"
import InvitationService from "../service/InvitationService"

function StudentProfile({ studentId, studentName }) {
  const [showModal, setShowModal] = useState(false)
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (showModal) {
      getAllCourses().then(res => setCourses(res.data))
    }
  }, [showModal])

  const handleInvite = () => {
    if (!selectedCourse) return
    InvitationService.sendInvitation(studentId, selectedCourse)
      .then(() => setMessage("Приглашение отправлено!"))
      .catch(() => setMessage("Ошибка отправки"))
  }

  return (
    <div className="container mt-4">
      <h2>Профиль студента: {studentName}</h2>
      <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
        Пригласить на курс
      </button>
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Выберите курс</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <select className="form-select" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                  <option value="">Выберите курс...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
                {message && <div className="mt-2">{message}</div>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Закрыть</button>
                <button className="btn btn-primary" onClick={handleInvite} disabled={!selectedCourse}>Пригласить</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentProfile 