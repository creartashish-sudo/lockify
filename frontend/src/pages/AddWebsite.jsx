import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as Yup from "yup";

function AddWebsite() {
  const [form, setForm] = useState({
    website_name: '',
    website_url: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/create_website.php`, { ...form, id: Number(JSON.parse(localStorage.getItem('user')).id) });
      // console.log(res.data);
      toast.success('Website added successfully!')
      navigate("/websites")
    } catch (err) {
      console.log(err);
    }
    // navigate("/subscription")
  }

  const WebsiteSchema = Yup.object({
    website_name: Yup.string()
      .required("Website Name is Required")
      .min(3, "Website Name must be at least 3 characters")
      .max(100, "Website Name must not exceed 100 characters")
      .trim(),
  
    username: Yup.string()
      .required("Username is Required")
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must not exceed 50 characters")
      .trim(),
  
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must not exceed 30 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&#]/, "Must contain at least one special character"),
  });
  
  return (
    <section id="contact" className="contact section pt-0">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Add Website
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
                Add Website
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
          <div className="col-lg-5 mx-auto card p-4">
            <h3 className='text-center form-title fw-bold pb-3'>Add Website Form</h3>
            <Formik
              initialValues={{ website_name: '', username: '', password: '' }}
              
              validationSchema={WebsiteSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const form = values;
                try {
                  const res = await axios.post(`${apiUrl}/websites/create`, { ...form, userId: JSON.parse(localStorage.getItem('user'))._id });
                  // console.log(res.data);
                  toast.success('Website added successfully!')
                  navigate("/websites")
                } catch (err) {
                  console.log(err);
                }
              }}>
              {({ values, errors, handleChange, handleSubmit }) => (
                <form
                  // action="forms/contact.php"
                  // method="post"
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  onSubmit={handleSubmit}
                >
                  <div className="row gy-4">

                    <div className="col-md-10 mx-auto ">
                      <input
                        type="text"
                        className="form-control"
                        name="website_name"
                        placeholder="Your Website Name"
                        required=""
                        value={values.website_name}
                        onChange={handleChange}
                      />
                      {errors.website_name && <div className="text-danger">{errors.website_name}</div>}
                    </div>

                    <div className="col-md-10 mx-auto ">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Your Website Username"
                        required=""
                        value={values.username}
                        onChange={handleChange}

                      />
                      {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>
                    <div className="col-md-10 mx-auto ">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Your Website Password"
                        required=""
                        value={values.password}
                        onChange={handleChange}
                      />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
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
                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          {/* End Contact Form */}
        </div>
      </div>
    </section>
  )
}

export default AddWebsite
