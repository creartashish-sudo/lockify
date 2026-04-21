import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [form,setForm] = useState({
    email: ""
  });
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL;


  async function handleOtp(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/users/send-email`, form);
      toast.success('OTP sent to your email!')
      // console.log(res.data);
      // alert("mail sent successfully");
      // localStorage.setItem("user", JSON.stringify(res.data.user_details));
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section id="contact" className="contact section">
                <div className="page-title" data-aos="fade">
    <div className="heading">
      <div className="container">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-lg-8">
            <h1>
              Forgot Password
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
          Forgot Password
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
      <h3 className='text-center form-title fw-bold pb-3'>Send OTP</h3>
        <form
          // action="forms/contact.php"
          // method="post"
          className="php-email-form"
          data-aos="fade-up"
          data-aos-delay={200}
          onSubmit={handleOtp}
        >
          <div className="row gy-4">
           
            <div className="col-md-10 mx-auto ">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Your Email"
                required=""
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
         
            {/* <div className="col-md-10 mx-auto ">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Your password"
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
              {/* <div>
                <p className='text-start'><Link to={"forgot-password"}>forgot password</Link></p>
              </div> */}
              <button type="submit" >Send</button>
            </div>
          </div>
        </form>
      </div>
      {/* End Contact Form */}
    </div>
  </div>
</section>
  )
}

export default ForgotPassword
