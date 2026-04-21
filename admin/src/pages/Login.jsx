import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
  return (
    <>
    {/* <div className="pagetitle">
      <h1>Form Layouts</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item">Forms</li>
          <li className="breadcrumb-item active">Layouts</li>
        </ol>
      </nav>
    </div> */}
    {/* End Page Title */}
    <section className="section p-0">
      <div className="row p-0 w-100 d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              {/* Vertical Form */}
              <form className="row g-3">
                {/* <div className="col-12">
                  <label htmlFor="inputNanme4" className="form-label">
                    Your Name
                  </label>
                  <input type="text" className="form-control" id="inputNanme4" />
                </div> */}
                <div className="col-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="inputEmail4" />
                </div>
                <div className="col-12">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                {/* <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div> */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                    Login
                  </button>
                  {/* <button type="reset" className="btn btn-secondary">
                    Reset
                  </button> */}
                </div>
              </form>
              {/* Vertical Form */}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Login
