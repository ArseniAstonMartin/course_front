import React, { useEffect, useState } from 'react';
import { getCourseById } from '../service/CourseService';
import { useParams, useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'; // Временная картинка

function CourseDetails() {
    const { id } = useParams();
    const navigator = useNavigate();
    const [course, setCourse] = useState({});

    useEffect(() => {
        getCourseById(id).then((response) => {
            setCourse(response.data);
        }).catch(error => {
            console.error(error);
            if (error.response?.status === 500) {
                navigator("/courses");
            }
        });
    }, [id, navigator]);

    return (
        <div className="container mt-4 course-container">
            {/* Левая часть — картинка */}
            <img src={reactLogo} alt="Course Preview" className="course-preview" />

            {/* Правая часть — заголовок, <hr> и описание */}
            <div className="course-details">
                <h2>{course.title}</h2>
                <hr className="pink-divider" />
                <p>{course.description}</p>
            </div>
        </div>
    );
}

export default CourseDetails;
