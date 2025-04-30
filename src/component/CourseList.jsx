import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../service/CourseService';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'; // Временная картинка

function CourseList() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCourses()
            .then((response) => setCourses(response.data))
            .catch(error => console.error(error));
    }, []);

    const CoursePage = (id) => {
        navigate(`/courses/${id}`);
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Available Courses</h2>
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
        </div>
    );
}

export default CourseList;
