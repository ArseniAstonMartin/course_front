import { useState } from 'react';
import { postNewCourse } from '../service/CourseService';
import {useNavigate } from 'react-router-dom';

function CreateCourse() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigator = useNavigate();

    const HandleTitle = (e) => {
        setTitle(e.target.value);
    };

    const HandleDescription = (e) => {
        setDescription(e.target.value);
    };

    const SaveCourse = (e) => {
        e.preventDefault();
        const course = {title, description};
        console.log(course);
        postNewCourse(course).then(response => {
            console.log(response.data);
            navigator('/courses')
        });
    };

    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="card">
                    <h2 className="text-center">Create Course</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label"><h6>Course Title</h6></label>
                                <input
                                    type="text"
                                    placeholder="Enter Course Title"
                                    name="title"
                                    value={title}
                                    className="form-control"
                                    onChange={HandleTitle}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"><h6>Course Description</h6></label>
                                <textarea
                                    placeholder="Enter Course Description"
                                    name="description"
                                    value={description}
                                    className="form-control"
                                    onChange={HandleDescription}
                                    rows={3}
                                    wrap="soft"
                                ></textarea>
                            </div>

                            <div className="form-group mb-2">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    style={{ backgroundColor: '#6CBAFD', borderColor: '#5BA4DB', color: 'white' }}
                                    onClick={SaveCourse}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCourse;
