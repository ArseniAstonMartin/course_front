import { useState } from 'react'
import CourseList from './component/CourseList.jsx'
import Header from './component/Header.jsx'
import CourseDetails from './component/CourseDetails.jsx'
import CreateCourse from './component/CreateCourse.jsx'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ backgroundColor: '#fcf4dd', minHeight: '100vh' }}>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/courses' element={ <CourseList /> }></Route>
            <Route path='/courses/:id' element={ <CourseDetails /> }></Route>
            <Route path='/courses/create' element={ <CreateCourse /> }></Route>
            <Route path="*" element={<Navigate to="/courses" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
