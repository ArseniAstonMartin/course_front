"use client"

import { useEffect, useState } from "react"
import { getLessonById } from "../service/LessonService"
import { useParams, useNavigate } from "react-router-dom"
import "../styles/Lesson.css"

function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getLessonById(id)
      .then((response) => {
        setLesson(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching lesson:", error)
        setLoading(false)
        if (error.response?.status === 404 || error.response?.status === 500) {
          navigate("/courses")
        }
      })
  }, [id, navigate])

  const renderContentBlock = (block) => {
    switch (block.contentType) {
      case "HEADER":
        return <h3 className="lesson-header">{block.content}</h3>
      case "TEXT":
        return <p className="lesson-text">{block.content}</p>
      case "IMAGE":
        return (
          <div className="lesson-image-container">
            <img src={block.content || "/placeholder.svg"} alt="Lesson content" className="lesson-image" />
          </div>
        )
      case "VIDEO":
        return (
          <div className="lesson-video-container">
            <iframe src={block.content} title="Lesson video" className="lesson-video" allowFullScreen></iframe>
          </div>
        )
      default:
        return <p>Unknown content type: {block.contentType}</p>
    }
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

  if (!lesson) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Lesson not found
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4 lesson-container">
      <div className="lesson-header-container">
        <h2 className="lesson-title">{lesson.title}</h2>
        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
          Back to Course
        </button>
      </div>
      <hr className="pink-divider" />

      <div className="lesson-content">
        {lesson.content
          .sort((a, b) => a.order - b.order)
          .map((block, index) => (
            <div key={index} className="content-block">
              {renderContentBlock(block)}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Lesson
