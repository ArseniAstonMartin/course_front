"use client"

import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate()

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Sign Up</h2>
              <p className="text-center text-muted mb-4">This is a placeholder signup page</p>

              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => navigate("/courses")}>
                  Back to Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
