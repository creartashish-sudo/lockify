import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from 'yup';

function Feedback() {
  const [formData, setFormData] = useState({
    comment: '',
    rating: 0
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/create_feedback.php`, { ...formData, id: Number(JSON.parse(localStorage.getItem('user')).id) });
      toast.success('Feedback submitted successfully!')
      // console.log(res)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    // Handle form submission logic here
  }

  const feedbackSchema = Yup.object({ 
    comment: Yup.string()
      .required("Comment is Required")
      .min(5, "Comment must be at least 5 characters")
      .max(500, "Comment must not exceed 500 characters")
      .trim(),
    
    rating: Yup.number()
      .required("Rating is Required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must not exceed 5"),
  });
  return (
    <section id="contact" className="contact section pt-0">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Feedback
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
                Feedback
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
            <h3 className='text-center form-title fw-bold pb-3'>Feedback Form</h3>
            <Formik
              initialValues={{ comment: '', rating: '' }}

              validationSchema={feedbackSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const form = values;
                form.userId = JSON.parse(localStorage.getItem('user'))._id;
                try {
                  const res = await axios.post(`${apiUrl}/feedbacks/create`, form);
                  // console.log(res.data);
                  toast.success('Feedback added successfully!')
                  navigate("/")
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
                        name="comment"
                        placeholder="Your Comment"
                        required=""
                        value={values.comment}
                        onChange={handleChange}
                      />
                      {errors.comment && <div className="text-danger">{errors.comment}</div>}
                    </div>

                    <div className="col-md-10 mx-auto">
                      <input
                        type="number"
                        className="form-control"
                        name="rating"
                        placeholder="Your Rating"
                        required=""
                        value={values.rating}
                        onChange={handleChange}
                      />
                      {errors.rating && <div className="text-danger">{errors.rating}</div>}
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
                      <button type="submit">Submit</button>
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

export default Feedback
