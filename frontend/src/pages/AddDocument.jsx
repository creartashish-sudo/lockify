import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as Yup from "yup";

function AddDocument() {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const DocumentSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must not exceed 100 characters")
      .matches(
        /^[a-zA-Z0-9\s.,'-]+$/,
        "Title contains invalid characters"
      )
      .trim(),
  
    description: Yup.string()
      .required("Description is required")
      .min(20, "Description must be at least 20 characters")
      .max(500, "Description must not exceed 500 characters")
      .trim(),
  
    photo: Yup.mixed()
      .required("Document file is required").test(
        "fileSize",
        "File too large (max 2MB)",
        (value) => value && value.size <= 2 * 1024 * 1024
      )
      .test(
        "fileType",
        "Unsupported file format (only PDF, JPG, PNG allowed)",
        (value) =>
          value &&
          ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
      ),
  });
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("photo", photo);
    formData.append("id", Number(JSON.parse(localStorage.getItem('user')).id));
    try {
      const res = await axios.post(`${apiUrl}/create_document.php`, formData);
      // console.log(res.data);
      toast.success('Document added successfully!')
      navigate("/documents")
    } catch (err) {
      console.log(err);
    }
    // navigate("/subscription")
  }
  return (
    <section id="contact" className="contact section pt-0">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Add Document
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
                Add Document
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
            <h3 className='text-center form-title fw-bold pb-3'>Add Document</h3>
            {/* <form
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
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        placeholder="Your Document Password"
                                        required=""
                                        onChange={(e)=>setPhoto(e.target.files[0])}

                                    />
                                </div>

                                <div className="col-md-10 mx-auto ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Your title"
                                        required=""
                                        onChange={(e)=>setForm({...form,title:e.target.value})}
                                        value={form.title}
                                    /> 
                                </div>

                                <div className="col-md-10 mx-auto ">
                                    <textarea
                                        // type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="Your Description"
                                        required=""
                                        onChange={(e)=>setForm({...form,description:e.target.value})}
                                        value={form.description}
                                    />
                                </div>
                                

                            
                                <div className="col-md-12 text-center">
                                    <div className="loading">Loading</div>
                                    <div className="error-message" />
                                    <div className="sent-message">
                                        Your message has been sent. Thank you!
                                    </div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        </form> */}

            <Formik
              initialValues={{
                title: "",
                description: ""
              }}
              // validate={(values) => {
              //   const errors = {};
              //   if (!values.title) errors.title = "Title is required";
              //   if (!values.description) errors.description = "Description is required";
              //   if (!photo) errors.photo = "Document file is required";
              //   return errors;
              // }}
              validationSchema={DocumentSchema}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("photo",  values.photo);
                formData.append(
                  "userId",
                  JSON.parse(localStorage.getItem("user"))._id
                );

                try {
                  await axios.post(`${apiUrl}/documents/create`, formData);
                  toast.success("Document added successfully!");
                  navigate("/documents");
                } catch (err) {
                  console.log(err);
                  toast.error("Something went wrong");
                }
              }}
            >
              {({ values, errors, handleChange, handleSubmit,setFieldValue  }) => (
                <form
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  onSubmit={handleSubmit}
                >
                  <div className="row gy-4">

                    {/* FILE */}
                    <div className="col-md-10 mx-auto">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) =>
                          setFieldValue("photo", e.currentTarget.files[0])}
                      />
                      {errors.photo && (
                        <p className="text-danger mb-0">{errors.photo}</p>
                      )}
                      
                    </div>

                    {/* TITLE */}
                    <div className="col-md-10 mx-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Your title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      {errors.title && (
                        <p className="text-danger mb-0">{errors.title}</p>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    <div className="col-md-10 mx-auto">
                      <textarea
                        className="form-control"
                        name="description"
                        placeholder="Your Description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      {errors.description && (
                        <p className="text-danger mb-0">{errors.description}</p>
                      )}
                    </div>

                    <div className="col-md-12 text-center">
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

export default AddDocument
