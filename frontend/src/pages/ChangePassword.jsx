import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";


function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("New Password and Confirm Password do not match");
        return;
      }
      const res = await axios.post(`${apiUrl}/update_password.php`, { ...formData, id: JSON.parse(localStorage.getItem("user")).id });
      // console.log(res.data);
      toast.success('Password changed successfully!');
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    // Handle form submission logic here
  }

  const profileSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is Required").min(8, ' Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&]/, 'Must contain at least one special character'),
    newPassword: Yup.string().required("New Password is Required").min(8, ' Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&]/, 'Must contain at least one special character'),
    confirmPassword: Yup.string().required("Confirm Password is Required").oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });
  return (
    <section id="contact" className="contact section">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Change Password
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
                Change Password
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
            <h3 className='text-center form-title fw-bold pb-3'>Change Password </h3>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={profileSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // const form = values;
                try {
                  if (values.newPassword !== values.confirmPassword) {
                    alert("New Password and Confirm Password do not match");
                    return;
                  }
                  const res = await axios.put(`${apiUrl}/users/change-password`, { ...values, userId: JSON.parse(localStorage.getItem("user"))._id });
                  // console.log(res.data);
                  toast.success('Password changed successfully!');
                  navigate("/");
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

                    {/* <div className="col-md-10 mx-auto ">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Your Email"
                required=""
              />
            </div>
         
            <div className="col-md-10 mx-auto ">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Your password"
                required=""
              />
            </div> */}
                    <div className="col-md-12 ">
                      <input
                        type="password"
                        className="form-control"
                        name="currentPassword"
                        placeholder="Your Current password"
                        required=""
                        value={values.currentPassword}
                        onChange={handleChange}
                      />
                      {errors.currentPassword && <div className="text-danger">{errors.currentPassword}</div>}
                    </div>
                    <div className="col-md-12 ">
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        placeholder="Your New password"
                        required=""
                        value={values.newPassword}
                        onChange={handleChange}
                      />
                      {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
                    </div>
                    <div className="col-md-12 ">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Your Confirm password"
                        required=""
                        value={values.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
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
                      <button type="submit" >Change Password</button>
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

export default ChangePassword
