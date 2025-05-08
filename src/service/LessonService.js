import axios from "axios"

const LESSONS_BASE_URL = "http://localhost:8080/lessons"

export const getLessonById = (id) => axios.get(`${LESSONS_BASE_URL}/${id}`)
export const getAllLessons = () => axios.get(LESSONS_BASE_URL)

// Helper function to get media URL from Minio
export const getMediaUrl = (fileName) => {
  if (!fileName) return null
  return `http://127.0.0.1:9000/media/${fileName}`
}
