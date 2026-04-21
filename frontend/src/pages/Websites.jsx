import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Websites() {
  const [websites, setWebsites] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  // const navigate = useNavigate();
  async function handleGetWebsites() {
    // Logic to fetch websites can be added here
    try {
      const res = await axios.get(`${apiUrl}/websites/${JSON.parse(localStorage.getItem('user'))._id}`,{id: Number(JSON.parse(localStorage.getItem('user')).id)});
      setWebsites(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteDocument(e, delId) {
    e.preventDefault();
    // Logic to fetch documents can be added here
    try {
      const res = await axios.delete(`${apiUrl}/websites/delete/${delId}`, { id: delId });
      toast.success('Website deleted successfully!');
      handleGetWebsites();
    } catch (err) {
      console.log(err);
    }
  }
   useEffect(() => {
      handleGetWebsites();
    }, []);


  const handleSubmit = () => {
    // const modalEl = document.getElementById("exampleModal");
    // if (modalEl) {
    //   const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    //   modal.hide();
    // }
  
    navigate("/website-details");
  };
  return (
    <section id="courses" className="courses section pt-0">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Websites
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
                Websites
                <br />
              </li>
            </ol>
          </div>
        </nav>
      </div>
      <div className="container p-5">
        <div className="row">
          {websites.map((website) => (
            <div
              className="col-lg-4 col-md-6 d-flex align-items-stretch my-2"
              data-aos="zoom-in"
              data-aos-delay={100}
              key={website.id}
            >
              <div className="course-item w-100">
                <div className='d-flex justify-content-center p-4' style={{height: "200px"}}>

                <img src={`https://manifest.im/icon/${website.website_name.toLowerCase()}.com`} className="img-fluid " alt="..." />
                </div>
                <div className="course-content">
                  <h3 className='py-4 text-center'>
                    <a href="course-details.html">{website.website_name}</a>
                  </h3>
                  <div className="d-flex justify-content-end gap-3 align-items-center mb-3">
                    <p className="category bg-info" style={{ cursor: "pointer" }} onClick={()=>navigate("website-details",{state:{website:website}})}>View</p>
                    <p className="category bg-warning" style={{ cursor: "pointer" }} onClick={()=>navigate("update-website",{state:{website:website}})}>Update</p>
                    <p className="category bg-danger" style={{ cursor: "pointer" }} onClick={(e) => handleDeleteDocument(e, website._id)}>Delete</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
         
          
        
        


          {/* End Course Item*/}
          {/* <div className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
          data-aos="zoom-in"
          data-aos-delay={200}
        >
          <div className="course-item">
            <img src="assets/img/course-2.jpg" className="img-fluid" alt="..." />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="category">Marketing</p>
                <p className="price">$250</p>
              </div>
              <h3>
                <a href="course-details.html">Search Engine Optimization</a>
              </h3>
              <p className="description">
                Et architecto provident deleniti facere repellat nobis iste. Id
                facere quia quae dolores dolorem tempore.
              </p>
              <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img
                    src="assets/img/trainers/trainer-2-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <a href="" className="trainer-link">
                    Lana
                  </a>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bi bi-person user-icon" />
                  &nbsp;35 &nbsp;&nbsp;
                  <i className="bi bi-heart heart-icon" />
                  &nbsp;42
                </div>
              </div>
            </div>
          </div>
        </div>{" "} */}
          {/* <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
          data-aos="zoom-in"
          data-aos-delay={200}
        >
          <div className="course-item">
            <img src="assets/img/course-2.jpg" className="img-fluid" alt="..." />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="category">Marketing</p>
                <p className="price">$250</p>
              </div>
              <h3>
                <a href="course-details.html">Search Engine Optimization</a>
              </h3>
              <p className="description">
                Et architecto provident deleniti facere repellat nobis iste. Id
                facere quia quae dolores dolorem tempore.
              </p>
              <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img
                    src="assets/img/trainers/trainer-2-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <a href="" className="trainer-link">
                    Lana
                  </a>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bi bi-person user-icon" />
                  &nbsp;35 &nbsp;&nbsp;
                  <i className="bi bi-heart heart-icon" />
                  &nbsp;42
                </div>
              </div>
            </div>
          </div>
        </div>{" "} */}
          {/* End Course Item*/}
          {/* <div
          className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
          data-aos="zoom-in"
          data-aos-delay={300}
        >
          <div className="course-item">
            <img src="assets/img/course-3.jpg" className="img-fluid" alt="..." />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="category">Content</p>
                <p className="price">$180</p>
              </div>
              <h3>
                <a href="course-details.html">Copywriting</a>
              </h3>
              <p className="description">
                Et architecto provident deleniti facere repellat nobis iste. Id
                facere quia quae dolores dolorem tempore.
              </p>
              <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img
                    src="assets/img/trainers/trainer-3-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <a href="" className="trainer-link">
                    Brandon
                  </a>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bi bi-person user-icon" />
                  &nbsp;20 &nbsp;&nbsp;
                  <i className="bi bi-heart heart-icon" />
                  &nbsp;85
                </div>
              </div>
            </div>
          </div>
        </div>{" "} */}
          {/* End Course Item*/}
        </div>
      </div>
    </section>
  )
}

export default Websites
