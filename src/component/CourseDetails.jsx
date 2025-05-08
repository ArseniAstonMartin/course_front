"use client"

import { useEffect, useState } from "react"
import { getCourseById, getLessonsByCourseId } from "../service/CourseService"
import { useParams, useNavigate } from "react-router-dom"
import reactLogo from "../assets/react.svg"
import "../styles/CourseDetails.css"

function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState({})
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCreator, setIsCreator] = useState(true) // This would normally be determined by authentication

  useEffect(() => {
    setLoading(true)

    // Fetch course details
    getCourseById(id)
      .then((response) => {
        setCourse(response.data)

        // Fetch lessons for this course
        return getLessonsByCourseId(id)
      })
      .then((response) => {
        setLessons(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
        if (error.response?.status === 500) {
          navigate("/courses")
        }
      })
  }, [id, navigate])

  const handleAddLesson = () => {
    navigate(`/courses/${id}/create-lesson`)
  }

  const handleStudyLesson = (lessonId) => {
    navigate(`/lessons/${lessonId}`)
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

  return (
    <div className="container mt-4">
      <div className="course-container">
        {/* Left side — image */}
        <img src={reactLogo || "/placeholder.svg"} alt="Course Preview" className="course-preview" />

        {/* Right side — title, <hr> and description */}
        <div className="course-details">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{course.title}</h2>
            {isCreator && (
              <button className="btn btn-primary" onClick={handleAddLesson}>
                Добавить урок
              </button>
            )}
          </div>
          <hr className="pink-divider" />
          <p>{course.description}</p>
        </div>
      </div>

      {/* Lessons list */}
      <div className="lessons-container mt-5">
        <h3 className="mb-4">Course Lessons</h3>

        {lessons.length === 0 ? (
          <div className="alert alert-info">No lessons available for this course yet.</div>
        ) : (
          <div className="list-group">
            {lessons
              .sort((a, b) => a.order - b.order)
              .map((lesson) => (
                <div key={lesson.id} className="list-group-item lesson-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      {lesson.order}. {lesson.title}
                    </h5>
                    <button className="btn btn-success" onClick={() => handleStudyLesson(lesson.id)}>
                      Study
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseDetails
