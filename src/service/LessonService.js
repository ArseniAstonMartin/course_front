import instance from "./axios"

const LESSONS_BASE_URL = "/lessons"

export const getLessonById = (id) => instance.get(`${LESSONS_BASE_URL}/${id}`)
export const getAllLessons = () => instance.get(LESSONS_BASE_URL)

// Helper function to get media URL from Minio
export const getMediaUrl = (fileName) => {
  if (!fileName) return null
  return `http://127.0.0.1:9000/media/${fileName}`
}
