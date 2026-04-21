import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background">
  <div className="container footer-top">
    <div className="row gy-4">
      <div className="col-lg-4 col-md-6 footer-about">
        <a href="index.html" className="logo d-flex align-items-center">
          <span className="sitename">Lockify</span>
        </a>
        <div className="footer-contact pt-3">
          <p>A108 Adam Street</p>
          <p>New York, NY 535022</p>
          <p className="mt-3">
            <strong>Phone:</strong> <span>+1 5589 55488 55</span>
          </p>
          <p>
            <strong>Email:</strong> <span>info@example.com</span>
          </p>
        </div>
        <div className="social-links d-flex mt-4">
          <a href="">
            <i className="bi bi-twitter-x" />
          </a>
          <a href="">
            <i className="bi bi-facebook" />
          </a>
          <a href="">
            <i className="bi bi-instagram" />
          </a>
          <a href="">
            <i className="bi bi-linkedin" />
          </a>
        </div>
      </div>
      <div className="col-lg-2 col-md-3 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/documents">Documents</Link>
          </li>
          <li>
            <Link to="/websites">Websites</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="#">Terms of service</Link>
          </li>
          <li>
            <Link to="#">Privacy policy</Link>
          </li>
        </ul>
      </div>
      <div className="col-lg-2 col-md-3 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li>
            <Link to="#">Web Design</Link>
          </li>
          <li>
            <Link to="#">Web Development</Link>
          </li>
          <li>
            <Link to="#">Product Management</Link>
          </li>
          <li>
            <Link to="#">Marketing</Link>
          </li>
          <li>
            <Link to="#">Graphic Design</Link>
          </li>
        </ul>
      </div>
      <div className="col-lg-4 col-md-12 footer-newsletter">
        <h4>Our Newsletter</h4>
        <p>
          Subscribe to our newsletter and receive the latest news about our
          products and services!
        </p>
        <form
          action="forms/newsletter.php"
          method="post"
          className="php-email-form"
        >
          <div className="newsletter-form">
            <input type="email" name="email" />
            <input type="submit" defaultValue="Subscribe" />
          </div>
          <div className="loading">Loading</div>
          <div className="error-message" />
          <div className="sent-message">
            Your subscription request has been sent. Thank you!
          </div>
        </form>
      </div>
    </div>
  </div>
  <div className="container copyright text-center mt-4">
    <p>
      © <span>Copyright</span> <strong className="px-1 sitename">Lockify</strong>{" "}
      <span>All Rights Reserved</span>
    </p>
    <div className="credits">
      {/* All the links in the footer should remain intact. */}
      {/* You can delete the links only if you've purchased the pro version. */}
      {/* Licensing information: https://bootstrapmade.com/license/ */}
      {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
      {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> */}
    </div>
  </div>
</footer>

  )
}

export default Footer
