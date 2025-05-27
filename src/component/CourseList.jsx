import React, { useEffect, useState } from 'react';
import { getAllCoursesPaged } from '../service/CourseService';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'; // Временная картинка

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError("");
        getAllCoursesPaged(page, pageSize)
            .then((response) => {
                setCourses(response.data.content || []);
                setTotalPages(response.data.totalPages || 1);
                setLoading(false);
            })
            .catch(error => {
                setError("Ошибка при загрузке курсов");
                setLoading(false);
            });
    }, [page, pageSize]);

    const CoursePage = (id) => {
        navigate(`/courses/${id}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Available Courses</h2>
            {loading && <div>Загрузка...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {courses.map(course => (
                    <div key={course.id} className="col-12">
                        <div className="card shadow-sm mb-3">
                            <div className="card-body d-flex align-items-center">
                                <img src={reactLogo} alt="Course Preview" className="course-preview-mini me-3" />

                                <div>
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <button className="btn btn-primary" onClick={() => CoursePage(course.id)}>Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <hr style={{ borderTop: "3px solid #ff69b4", margin: "32px 0 16px 0" }} />
            <div className="d-flex justify-content-center align-items-center mb-4" style={{ gap: 8 }}>
                <button className="btn btn-outline-primary btn-sm" disabled={page === 0} onClick={() => handlePageChange(page - 1)}>&lt;</button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`btn btn-sm ${i === page ? "btn-primary" : "btn-outline-primary"}`}
                        style={{ minWidth: 36, margin: "0 2px" }}
                        onClick={() => handlePageChange(i)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button className="btn btn-outline-primary btn-sm" disabled={page === totalPages - 1 || totalPages === 0} onClick={() => handlePageChange(page + 1)}>&gt;</button>
            </div>
        </div>
    );
}

export default CourseList;
