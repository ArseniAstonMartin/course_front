import axios from "axios"

const COURSES_BASE_URL = "http://localhost:8080/courses"

export const getAllCourses = () => axios.get(COURSES_BASE_URL)
export const getCourseById = (id) => axios.get(`${COURSES_BASE_URL}/${id}`)
export const postNewCourse = (course) => axios.post(COURSES_BASE_URL, course)
export const getLessonsByCourseId = (courseId) => axios.get(`${COURSES_BASE_URL}/${courseId}/lessons`)
