import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from "yup";


function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    profile_password: '',
  })
  const [photo, setPhoto] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleGetUserDetails() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setFormData({
        name: user.name,
        email: user.email,
        contact: user.contact,
        password: user.password,
        profile_password: user.profile_password,
      })
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleGetUserDetails();
  }, [])
  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("contact", formData.contact);
    // form.append("password",formData.password);
    // form.append("profile_password",formData.profile_password);
    form.append("photo", photo);


    try {
      const res = await axios.post(`${apiUrl}/update_user_profile.php`, form);
      toast.success('Profile updated successfully!')
      // console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user_details));
    } catch (err) {
      console.log(err);
    }
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  const UpdateProfileSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must not exceed 100 characters")
      .trim(),
    email: Yup.string().required("Email is Required").email("Invalid email format").trim(),

    contact: Yup.string()
      .required("Contact is Required")
      .min(10, "Contact must be at least 10 characters")
      .max(15, "Contact must not exceed 15 characters")
      .trim(),
    photo: Yup.mixed()
      .nullable().test(
        "fileSize",
        "File too large (max 2MB)",
        (value) => {
          if (!value) return true; // ✅ skip if no file
          return value.size <= 2 * 1024 * 1024;
        }
      )
      .test(
        "fileType",
        "Unsupported file format (only PDF, JPG, PNG allowed)",
        (value) => {
          if (!value) return true; // ✅ skip if no file
          return ["application/pdf", "image/jpeg", "image/png"].includes(value.type);
        }
      ),
  });
  return (
    <section id="contact" className="contact section">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Update Profile
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
                Update Profile
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
            <h3 className='text-center form-title fw-bold pb-3'>Update Profile</h3>
            <Formik
              // initialValues={()=>{
              //   const user = JSON.parse(localStorage.getItem("user"));
              //   return {
              //     name: user.name,
              //     email: user.email,
              //     contact: user.contact,
              //     password: user.password,
              //     profile_password: user.profile_password,
              //   }
              // }}
              initialValues={formData}
              enableReinitialize

              validationSchema={UpdateProfileSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = values;
                const form = new FormData();
                form.append("name", formData.name);
                form.append("email", formData.email);
                form.append("contact", formData.contact);
                // form.append("password",formData.password);
                // form.append("profile_password",formData.profile_password);
                form.append("photo", values.photo);
                form.append("userId", JSON.parse(localStorage.getItem("user"))._id);


                try {
                  const res = await axios.put(`${apiUrl}/users/update-profile`, form);
                  toast.success('Profile updated successfully!')
                  // console.log(res.data);
                  localStorage.setItem("user", JSON.stringify(res.data.user_details));
                } catch (err) {
                  console.log(err);
                }
              }}>
              {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
                <form
                  // action="forms/contact.php"
                  // method="post"
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  onSubmit={handleSubmit}
                >
                  <div className="row gy-4">
                    <div className="col-md-12">
                      {console.log(values)}
                      <input
                        type="file"
                        name="photo"
                        className="form-control"
                        placeholder="Your profile"
                        required=""
                        onChange={(e) =>
                          setFieldValue("photo", e.currentTarget.files[0])}
                      />
                      {errors.photo && <div className="text-danger">{errors.photo}</div>}
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
                        disabled
                        value={values.email}
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="col-md-12 ">
                      <input
                        type="number"
                        className="form-control"
                        name="contact"
                        placeholder="Your Contact"
                        required=""
                        value={values.contact}
                        onChange={handleChange}

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
                    {/* <div className="col-md-12 ">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Your password"
                    required=""
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div> */}
                    {/* <div className="col-md-6 ">
              <input
                type="password"
                className="form-control"
                name="confirm-password"
                placeholder="Confirm Password"
                required=""
              />
            </div> */}
                    {/* <div className="col-md-12 ">
                  <input
                    type="password"
                    className="form-control"
                    name="profile-password"
                    placeholder="Your Profile password"
                    required=""
                    value={formData.profile_password}
                    onChange={(e) => setFormData({ ...formData, profile_password: e.target.value })}
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
                      <button type="submit">Update Profile</button>
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

export default UpdateProfile
