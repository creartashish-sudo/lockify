import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from "yup";


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contact: ''
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   try{
  //     const res = await axios.post(`${apiUrl}/create_inquiry.php`, formData);
  //     toast.success('Inquiry Submitted successfully!')

  //   }catch(error){
  //     console.error("Error submitting form:", error);
  //   }
  //   // Handle form submission logic here
  // }

  const inquirySchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must not exceed 100 characters")
      .trim(),
    
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    
    subject: Yup.string()
      .required("Subject is Required")
      .min(3, "Subject must be at least 3 characters")
      .max(150, "Subject must not exceed 150 characters")
      .trim(),
    
    message: Yup.string()
      .required("Message is Required")
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must not exceed 1000 characters")
      .trim(),
    
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Contact must be a valid number")
      .min(7, "Contact must be at least 7 digits")
      .max(15, "Contact must not exceed 15 digits")
      .nullable(),
  });


console.log(apiUrl);
  return (
    <>
  <div className="page-title" data-aos="fade">
    <div className="heading">
      <div className="container">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-lg-8">
            <h1>Contact</h1>
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
          <li className="current">Contact</li>
        </ol>
      </div>
    </nav>
  </div>
  {/* End Page Title */}
  {/* Contact Section */}
  <section id="contact" className="contact section">
    <div className="mb-5" data-aos="fade-up" data-aos-delay={200}>
      {/* <iframe
        style={{ border: 0, width: "100%", height: 300 }}
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
        frameBorder={0}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      /> */}
      <iframe
  style={{ border: 0, width: "100%", height: "300px" }}
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.687979650219!2d72.5550384!3d23.0332294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f53ffdfcb5%3A0x14077a0ac6c67900!2sCreArt!5e0!3m2!1sen!2sin!4v1704690000000"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

    </div>
    {/* End Google Maps */}
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row gy-4">
        <div className="col-lg-4">
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
          {/* End Info Item */}
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
          {/* End Info Item */}
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
          {/* End Info Item */}
        </div>
        <div className="col-lg-8">
        <Formik
              initialValues={{
                name: '',
                email: '',
                subject: '',
                message: '',
                contact: ''
              }}
              validationSchema={inquirySchema}
              onSubmit={async (values, { setSubmitting }) => {
                // const form = values;
                try {
                  if (values.newPassword !== values.confirmPassword) {
                    alert("New Password and Confirm Password do not match");
                    return;
                  }
                  const res = await axios.post(`${apiUrl}/inquiries/create`, { ...values, id: JSON.parse(localStorage.getItem("user")).id });
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
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  required=""
                  value={values.name}
                  onChange={handleChange
                  }
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
              <div className="col-md-12 ">
                <input
                  type="number"
                  className="form-control"
                  name="contact"
                  placeholder="Your Contact Number"
                  required=""
                  value={values.contact}
                  onChange={handleChange
                  }
                />
                {errors.contact && <div className="text-danger">{errors.contact}</div>}
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  placeholder="Subject"
                  required=""
                  value={values.subject}
                  onChange={handleChange
                  }
                />
                {errors.subject && <div className="text-danger">{errors.subject}</div>}
              </div>
              <div className="col-md-12">
                <textarea
                  className="form-control"
                  name="message"
                  rows={6}
                  placeholder="Message"
                  required=""
                  value={values.message}
                  onChange={handleChange
                  }
                />
                {errors.message && <div className="text-danger">{errors.message}</div>}
              </div>
              <div className="col-md-12 text-center">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
                <button type="submit">Send Message</button>
              </div>
            </div>
          </form>)}
          </Formik>
        </div>
        {/* End Contact Form */}
      </div>
    </div>
  </section>
</>

  )
}

export default Contact
