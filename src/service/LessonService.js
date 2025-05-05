import axios from "axios"

const LESSONS_BASE_URL = "http://localhost:8080/lessons"

export const getLessonById = (id) => axios.get(`${LESSONS_BASE_URL}/${id}`)
export const getAllLessons = () => axios.get(LESSONS_BASE_URL)
