import React from 'react'

function About() {
  return (
    <>
  <div className="page-title" data-aos="fade">
    <div className="heading">
      <div className="container">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-lg-8">
            <h1>
              About Us
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
            About Us
            <br />
          </li>
        </ol>
      </div>
    </nav>
  </div>
  {/* End Page Title */}
  {/* About Us Section */}
  <section id="about-us" className="section about-us">
    <div className="container">
      <div className="row gy-4">
        <div
          className="col-lg-6 order-1 order-lg-2"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <img src="assets/img/about-2.jpg" className="img-fluid" alt="" />
        </div>
        <div
          className="col-lg-6 order-2 order-lg-1 content"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <h3>Voluptatem dignissimos provident quasi corporis</h3>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul>
            <li>
              <i className="bi bi-check-circle" />{" "}
              <span>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </span>
            </li>
            <li>
              <i className="bi bi-check-circle" />{" "}
              <span>
                Duis aute irure dolor in reprehenderit in voluptate velit.
              </span>
            </li>
            <li>
              <i className="bi bi-check-circle" />{" "}
              <span>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate trideta
                storacalaperda mastiro dolore eu fugiat nulla pariatur.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default About
