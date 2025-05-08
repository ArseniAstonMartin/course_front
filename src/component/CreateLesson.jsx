"use client"

import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "../styles/CreateLesson.css"

function CreateLesson() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [contentBlocks, setContentBlocks] = useState([])
  const [showBlockOptions, setShowBlockOptions] = useState(false)
  const [lessonOrder, setLessonOrder] = useState(1)
  const fileInputRefs = useRef({})

  const handleAddBlock = (contentType) => {
    const newBlock = {
      id: Date.now(), // Temporary ID for UI purposes
      contentType,
      content: contentType === "TEXT" || contentType === "HEADER" ? "" : null,
      order: contentBlocks.length + 1,
    }
    setContentBlocks([...contentBlocks, newBlock])
    setShowBlockOptions(false)
  }

  const handleContentChange = (id, value) => {
    setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, content: value } : block)))
  }

  const handleFileChange = (id, event) => {
    if (event.target.files && event.target.files[0]) {
      // We don't set the file directly to state to avoid circular structure
      // Just mark that a file has been selected with a temporary display name
      setContentBlocks(
        contentBlocks.map((block) =>
          block.id === id ? { ...block, fileSelected: true, fileName: event.target.files[0].name } : block,
        ),
      )
    }
  }

  const handleRemoveBlock = (id) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id))
    // Update order for remaining blocks
    setContentBlocks((prevBlocks) => prevBlocks.map((block, index) => ({ ...block, order: index + 1 })))
  }

  const handleMoveBlock = (id, direction) => {
    const index = contentBlocks.findIndex((block) => block.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === contentBlocks.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newBlocks = [...contentBlocks]
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[newIndex]
    newBlocks[newIndex] = temp

    // Update order for all blocks
    setContentBlocks(newBlocks.map((block, idx) => ({ ...block, order: idx + 1 })))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      // Prepare the lesson data according to the new backend structure
      const lessonData = {
        courseId: courseId,
        title,
        lessonOrder,
        content: contentBlocks.map((block) => ({
          contentType: block.contentType,
          content: block.contentType === "TEXT" || block.contentType === "HEADER" ? block.content : null,
          order: block.order,
        })),
      }

      // Add the lessonDto as a JSON part
      formData.append("lessonDto", new Blob([JSON.stringify(lessonData)], { type: "application/json" }))

      // Add all files to the files[] array parameter
      contentBlocks.forEach((block) => {
        if (
          (block.contentType === "IMAGE" || block.contentType === "VIDEO") &&
          fileInputRefs.current[block.id]?.files[0]
        ) {
          formData.append("files", fileInputRefs.current[block.id].files[0])
        }
      })

      // Send the request to the backend
      await axios.post("http://localhost:8080/lessons", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      navigate(`/courses/${courseId}`)
    } catch (error) {
      console.error("Error creating lesson:", error)
      alert("Failed to create lesson. Please try again.")
    }
  }

  const renderContentBlockInput = (block) => {
    switch (block.contentType) {
      case "TEXT":
        return (
          <textarea
            className="form-control"
            value={block.content || ""}
            onChange={(e) => handleContentChange(block.id, e.target.value)}
            placeholder="Enter text content..."
            rows={4}
          />
        )
      case "HEADER":
        return (
          <input
            type="text"
            className="form-control"
            value={block.content || ""}
            onChange={(e) => handleContentChange(block.id, e.target.value)}
            placeholder="Enter header text..."
          />
        )
      case "IMAGE":
        return (
          <div className="file-input-container">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => handleFileChange(block.id, e)}
              ref={(el) => (fileInputRefs.current[block.id] = el)}
            />
            {block.fileSelected && <span className="selected-file">Selected: {block.fileName}</span>}
          </div>
        )
      case "VIDEO":
        return (
          <div className="file-input-container">
            <input
              type="file"
              className="form-control"
              accept="video/*"
              onChange={(e) => handleFileChange(block.id, e)}
              ref={(el) => (fileInputRefs.current[block.id] = el)}
            />
            {block.fileSelected && <span className="selected-file">Selected: {block.fileName}</span>}
          </div>
        )
      default:
        return <p>Unknown content type</p>
    }
  }

  return (
    <div className="container mt-4 create-lesson-container">
      <h2 className="mb-4">Create New Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Lesson Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lessonOrder" className="form-label">
            Lesson Order
          </label>
          <input
            type="number"
            className="form-control"
            id="lessonOrder"
            value={lessonOrder}
            onChange={(e) => setLessonOrder(Number.parseInt(e.target.value))}
            min="1"
            required
          />
        </div>

        <div className="content-blocks-container">
          <h3 className="mb-3">Content Blocks</h3>

          {contentBlocks.map((block) => (
            <div key={block.id} className="content-block-item">
              <div className="content-block-header">
                <h4>{block.contentType}</h4>
                <div className="content-block-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleMoveBlock(block.id, "up")}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleMoveBlock(block.id, "down")}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemoveBlock(block.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="content-block-input">{renderContentBlockInput(block)}</div>
            </div>
          ))}

          <div className="add-block-container">
            {!showBlockOptions ? (
              <button type="button" className="btn btn-outline-primary" onClick={() => setShowBlockOptions(true)}>
                + Add Content Block
              </button>
            ) : (
              <div className="block-options">
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleAddBlock("TEXT")}>
                  Text
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleAddBlock("HEADER")}>
                  Subheading
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleAddBlock("IMAGE")}>
                  Image
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleAddBlock("VIDEO")}>
                  Video
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={() => setShowBlockOptions(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/courses/${courseId}`)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={contentBlocks.length === 0 || !title}>
            Submit Lesson
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateLesson
