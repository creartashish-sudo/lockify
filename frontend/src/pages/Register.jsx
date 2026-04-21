import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as Yup from 'yup';


function Register({isUserLoggedIn, setIsUserLoggedIn}) {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const RegisterSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    contact: Yup.string().required('Contact is required').matches(/^[0-9]{10}$/, 'Contact must be 10 digits'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&]/, 'Must contain at least one special character'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    profile_password: Yup.string().required('Profile Password is required').min(8, 'Profile Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&]/, 'Must contain at least one special character'),
  })

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("contact", form.contact);
    formData.append("password", form.password);
    formData.append("profile_password", form.profile_password);
    formData.append("photo", photo);
    try {
      const res = await axios.post(`${apiUrl}/users/create`, formData);
      setIsUserLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(res.data.user_details));
      toast.success('Registered successfully!');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    navigate("/subscription")
  }
  return (
    <section id="contact" className="contact section">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Register
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
                Register
                <br />
              </li>
            </ol>
          </div>
        </nav>
      </div>

      {/* End Google Maps */}
      <div className="container p-5" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
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
          <div className="col-lg-8 mx-auto card p-4">
            <h3 className='text-center  fw-bold pb-3 form-title'>Get Register Here</h3>
            <Formik
              initialValues={{ name: '', email: '', contact: '', password: '', confirmPassword: '', profile_password: '' }}

              validationSchema={RegisterSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const form = values;
                const formData = new FormData();
                formData.append("name", form.name);
                formData.append("email", form.email);
                formData.append("contact", form.contact);
                formData.append("password", form.password);
                formData.append("profile_password", form.profile_password);
                formData.append("photo", photo);
                try {
                  const res = await axios.post(`${apiUrl}/users/create`, formData);
                  localStorage.setItem("user", JSON.stringify(res.data.user_details));
                  toast.success('Registered successfully!')
                  setIsUserLoggedIn(true);
                  console.log(res.data);
                } catch (err) {
                  console.log(err);
                }
                navigate("/subscription")
              }}>
              {({ values, errors, handleChange, handleSubmit }) => (
                <form
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <div className="row gy-4">
                    <div className="col-md-12">
                      <input
                        type="file"
                        name="profile"
                        className="form-control"
                        placeholder="Your profile"
                        required=""
                        // value={photo}
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required=""
                        value={values.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required=""
                        value={values.email}
                        onChange={handleChange
                        }
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="number"
                        className="form-control"
                        name="contact"
                        placeholder="Your Contact"
                        required=""
                        value={values.contact}
                        onChange={handleChange
                        }
                      />
                      {errors.contact && <div className="text-danger">{errors.contact}</div>}
                    </div>
                    {/* <div className="col-md-6 ">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Your Username"
                required=""

              />
            </div> */}
                    <div className="col-md-6 ">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Your password"
                        required=""
                        value={values.password}
                        onChange={handleChange
                        }
                      />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required=""
                        value={values.confirmPassword}
                        onChange={handleChange
                        }
                      />
                      {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                    </div>
                    <div className="col-md-12 ">
                      <input
                        type="password"
                        className="form-control"
                        name="profile_password"
                        placeholder="Your Profile password"
                        required=""
                        value={values.profile_password}
                        onChange={handleChange
                        }
                      />
                      {errors.profile_password && <div className="text-danger">{errors.profile_password}</div>}
                    </div>
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
                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button type='submit' onClick={handleSubmit}>Register</button>
                    </div>
                  </div>
                </form>)}
            </Formik>
          </div>
          {/* End Contact Form */}
        </div>
      </div>
    </section>

  )
}

export default Register
