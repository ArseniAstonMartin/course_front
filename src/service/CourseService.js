import instance from "../service/axios.js"

const COURSES_BASE_URL = "/courses"

export const getAllCourses = () => instance.get(`${COURSES_BASE_URL}/all`)
export const getCourseById = (id) => instance.get(`${COURSES_BASE_URL}/${id}`)
export const postNewCourse = (course) => instance.post(COURSES_BASE_URL, course)
export const getLessonsByCourseId = (courseId) => instance.get(`${COURSES_BASE_URL}/${courseId}/lessons`)
export const getMoreLikeThisCourses = (courseId, page = 0, pageSize = 3) =>
  instance.get(`/search/moreLikeThis?courseId=${courseId}&page=${page}&pageSize=${pageSize}`)
export const getAllCoursesPaged = (page = 0, pageSize = 5) =>
  instance.get(`/search/all?page=${page}&pageSize=${pageSize}`)
