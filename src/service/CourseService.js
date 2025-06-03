import instance from "./axios"

const COURSES_BASE_URL = "/courses"

export const getAllCourses = () => instance.get(`${COURSES_BASE_URL}/all`)
export const getCourseById = (id) => instance.get(`${COURSES_BASE_URL}/${id}`)
export const postNewCourse = (course) => instance.post(COURSES_BASE_URL, course)
export const getLessonsByCourseId = (courseId) => instance.get(`${COURSES_BASE_URL}/${courseId}/lessons`)
