import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as Yup from "yup";

function UpdateDocument() {
    const [form, setForm] = useState({});
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (location.state) {
            setForm({
                title: location.state.document.title,
                description: location.state.document.description,
                _id: location.state.document._id
            })

        }

    }, [location.state])

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
      
        photo: Yup.mixed().nullable().test(
            "fileSize",
            "File too large (max 2MB)",
            
            (value) => 
                {
                    if (!value) return true; // ✅ skip if no file
                    return value.size <= 2 * 1024 * 1024;
                  }
          )
          .test(
            "fileType",
            "Unsupported file format (only PDF, JPG, PNG allowed)",
            (value) =>
                {
                    if (!value) return true; // ✅ skip if no file
                    return ["application/pdf", "image/jpeg", "image/png"].includes(value.type);
                  }
          ),
      });

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("photo", photo);
        formData.append("id", location.state.document.id);
        try {
            const res = await axios.post(`${apiUrl}/update_document.php`, formData);
            toast.success('Document updated successfully!')
            // console.log(res.data);
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
                                    Update Document
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
                                Update Document
                                <br />
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>

            {/* End Google Maps */}
            <div className="container p-5" data-aos="fade-up" data-aos-delay={100}>
                <div className="row gy-4">
                    <div className="col-lg-5 mx-auto card p-4">
                        <h3 className='text-center form-title fw-bold pb-3'>Update Document</h3>
                        <Formik
                            initialValues={{
                                title: location.state.document.title || "",
                                description: location.state.document.description || "",
                                _id: location.state.document._id
                                // photo: null,
                            }}
                            // validate={(values) => {
                            //     const errors = {};
                            //     if (!values.title) errors.title = "Title is required";
                            //     if (!values.description) errors.description = "Description is required";
                            //     // if (!photo) errors.photo = "Document file is required";
                            //     return errors;
                            // }}
                            validationSchema={DocumentSchema}
                            onSubmit={async (values) => {
                                const formData = new FormData();
                                formData.append("title", values.title);
                                formData.append("description", values.description);
                                formData.append("photo", values.photo);
                                formData.append(
                                    "id",
                                    values._id
                                );
                                
                                try {
                                    await axios.put(`${apiUrl}/documents/update`, formData, {
                                        headers: {
                                          "Content-Type": "multipart/form-data",
                                        },
                                      });
                                    toast.success("Document added successfully!");
                                    navigate("/documents");
                                } catch (err) {
                                    console.log(err);
                                    toast.error("Something went wrong");
                                }
                            }}
                        >
                            {({ values, errors, handleChange, handleSubmit,setFieldValue }) => (
                                <form
                                    // action="forms/contact.php"
                                    // method="post"
                                    className="php-email-form"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                    onSubmit={handleSubmit}
                                    >
                                        <div className='w-100 px-auto text-center'>

                                    <img
                                        src={values.photo ? URL.createObjectURL(values.photo) : `${apiUrl}/uploads/${location.state.document.photo}`}
                                        alt="Document"
                                        className='mb-3 mx-auto rounded-circle '
                                        style={{ width: '50%' }}
                                    />
                                        </div>
                                    <div className="row gy-4">
                                        <div className="col-md-10 mx-auto ">
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                placeholder="Your Document Password"
                                                required=""
                                                onChange={(e) =>
                                                    setFieldValue("photo", e.currentTarget.files[0])}

                                            />
                                            {errors.photo && (
                                                <p className="text-danger mb-0">{errors.photo}</p>
                                            )}
                                        </div>

                                        <div className="col-md-10 mx-auto ">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                placeholder="Your title"
                                                required=""
                                                onChange={handleChange}
                                                value={values.title}
                                            />
                                            {errors.title && (
                                                <p className="text-danger mb-0">{errors.title}</p>
                                            )}
                                        </div>

                                        <div className="col-md-10 mx-auto ">
                                            <textarea
                                                // type="text"
                                                className="form-control"
                                                name="description"
                                                placeholder="Your Description"
                                                required=""
                                                onChange={handleChange}
                                                value={values.description}
                                            />
                                            {errors.description && (
                                                <p className="text-danger mb-0">{errors.description}</p>
                                            )}
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
                                </form>)}
                        </Formik>
                    </div>
                    {/* End Contact Form */}
                </div>
            </div>
        </section>
    )
}

export default UpdateDocument
