import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  // const navigate = useNavigate();
  async function handleGetDocuments() {
    // Logic to fetch documents can be added here
    try {
      const res = await axios.get(`${apiUrl}/documents/${JSON.parse(localStorage.getItem('user'))._id}`);
      setDocuments(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteDocument(e, delId) {
    e.preventDefault();
    // Logic to fetch documents can be added here
    try {
      const res = await axios.delete(`${apiUrl}/documents/delete/${delId}`);
      toast.success('Document deleted successfully!')
      handleGetDocuments();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleGetDocuments();
  }, []);

  
  return (
    <section id="courses" className="courses section pt-0">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Documents
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
                Documents
                <br />
              </li>
            </ol>
          </div>
        </nav>
      </div>
      <div className="container p-5">
        <div className="row">
          {documents?.map((document) => (
            <div
              className="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="zoom-in"
              data-aos-delay={100}
            >
              <div className="course-item">
                <img src={`${apiUrl}/uploads/${document.photo}`} className="img-fluid" alt="..." />
                <div className="course-content">
                  {/* <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="category">Web Development</p>
                <p className="price">$169</p>
              </div> */}
                  <h3>
                    <a href="course-details.html">{document.title}</a>
                  </h3>
                  <p className="description">
                    {document.description}
                  </p>
                  {/* <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img
                    src="assets/img/trainers/trainer-1-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <a href="" className="trainer-link">
                    Antonio
                  </a>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bi bi-person user-icon" />
                  &nbsp;50 &nbsp;&nbsp;
                  <i className="bi bi-heart heart-icon" />
                  &nbsp;65
                </div>
              </div> */}
                  <div className="d-flex justify-content-end gap-3 align-items-center mb-3">
                    {/* <p className="category bg-info" style={{ cursor: "pointer" }}> */}
                      <a
                        href={`${apiUrl}/uploads/documents/${document.photo}`}
                        download
                        className="category bg-info"
                        style={{ cursor: "pointer", textDecoration: "none", color: "#fff" }}
                      >
                        Download
                      </a>
                    
                    {/* </p> */}
                    <p className="category bg-warning" style={{ cursor: "pointer" }} onClick={() => navigate("/update-document", { state: { document: document } })}>Update</p>
                    <p className="category bg-danger" style={{ cursor: "pointer" }} onClick={(e) => handleDeleteDocument(e, document._id)}>Delete</p>
                    {/* <p className="price">$169</p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
         
          {/* End Course Item*/}

          {/* End Course Item*/}
        </div>
      </div>
    </section>

  )
}

export default Documents

