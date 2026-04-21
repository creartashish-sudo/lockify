import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function WebsiteDetails() {
  const [website,setWebsite] = useState({})
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePassword, setProfilePassword] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')

  // Assume profile password is coming from previous page
  const userProfilePassword = JSON.parse(localStorage.getItem("user")).profile_password
  const websiteData = location.state?.website
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (websiteData) {
      setWebsite(websiteData)
    }
  }, [websiteData])

  const handleVerify = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${apiUrl}/users/verify`, { password: profilePassword,id: JSON.parse(localStorage.getItem("user")).id });

    if (res.data.status ) {
      setIsVerified(true)
      setError('')
    } else {
      setError('Incorrect profile password')
    }
  }
  console.log(location.state?.website)
  return (
    <section id="contact" className="contact section pt-0">
            <div className="page-title" data-aos="fade">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1>
                                    Website Details
                                    <br />
                                </h1>
                                <p className="mb-0">
                                    Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                                    quo odio sint voluptas consequatur ut a odio voluptatem. Sit
                                    dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
                                    quaerat ipsum dolorem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li className="current">
                                Website Details
                                <br />
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>

            {/* End Google Maps */}
            <div className="container p-5" data-aos="fade-up" data-aos-delay={100}>
            {!isVerified && (
          <div className="col-lg-4 mx-auto card p-4">
            <h3 className="text-center fw-bold pb-3">Verify Profile Password</h3>

            <form onSubmit={handleVerify}>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter Profile Password"
                value={profilePassword}
                onChange={(e) => setProfilePassword(e.target.value)}
                required
              />

              {error && <p className="text-danger">{error}</p>}

              <button type="submit" className="btn btn-primary w-100">
                Verify
              </button>
            </form>
          </div>
        )}
                {isVerified && (<div className="row gy-4">
                    {/* <div className="col-lg-4">
          <div
            className="info-item d-flex"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            <i className="bi bi-geo-alt flex-shrink-0" />
            <div>
              <h3>Address</h3>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
          </div>
          <div
            className="info-item d-flex"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <i className="bi bi-telephone flex-shrink-0" />
            <div>
              <h3>Call Us</h3>
              <p>+1 5589 55488 55</p>
            </div>
          </div>
          <div
            className="info-item d-flex"
            data-aos="fade-up"
            data-aos-delay={500}
          >
            <i className="bi bi-envelope flex-shrink-0" />
            <div>
              <h3>Email Us</h3>
              <p>info@example.com</p>
            </div>
          </div>
        </div> */}
                    <div className="col-lg-5 mx-auto card p-4">
                        <h3 className='text-center form-title fw-bold pb-3'>Website Details</h3>
                        <form
                            // action="forms/contact.php"
                            // method="post"
                            className="php-email-form"
                            data-aos="fade-up"
                            data-aos-delay={200}
                        >
                            <div className="row gy-4">

                                <div className="col-md-10 mx-auto ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="website_name"
                                        placeholder="Your Website Name"
                                        required=""
                                        disabled
                                        value={website.website_name}
                                    />
                                </div>

                                <div className="col-md-10 mx-auto ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="website_name"
                                        placeholder="Your Website Name"
                                        required=""
                                        disabled
                                        value={website.username}
                                    />
                                </div>
                                <div className="col-md-10 mx-auto ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="password"
                                        placeholder="Your Website Password"
                                        disabled
                                        required=""
                                        value={website.password}
                                    />
                                </div>

                                {/* <div className="col-md-10 mx-auto">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="rating"
                                        placeholder="Your Rating"
                                        required=""
                                    />
                                </div> */}

                                {/* <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  placeholder="Subject"
                  required=""
                />
              </div>
              <div className="col-md-12">
                <textarea
                  className="form-control"  
                  name="message"
                  rows={6}
                  placeholder="Message"
                  required=""
                  defaultValue={""}
                />
              </div> */}
                                <div className="col-md-12 text-end">
                                    <div className="loading">Loading</div>
                                    <div className="error-message" />
                                    <div className="sent-message">
                                        Your message has been sent. Thank you!
                                    </div>
                                    <button type="submit" onClick={()=>navigate("/websites")}> {"<-"} Back</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* End Contact Form */}
                </div>)}
            </div>
        </section>
  )
}

export default WebsiteDetails
