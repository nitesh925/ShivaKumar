import React from "react";
import "../styles/Contact.css";

const ContactUs = () => {
  return (
    <div className="contact-wrapper">

      {/* HEADER SECTION */}
      <div className="contact-banner">

  {/* LOGO IN MIDDLE */}
  <img
    src="/images/omshantilog.png"
    alt="logo"
    className="contact-logo"
  />

  <h1>Contact Us</h1>
  <p>Home — Contact Us</p>
</div>


      {/* GET IN TOUCH TEXT */}
      <div className="get-touch">
        <h2>Get In Touch</h2>
        <p>
          
          We would be happy to assist you.
          
          Let us know your queries or what you are looking for.
        </p>
      </div>

      {/* FORM */}
      <div className="contact-form">
        <label>Your Name *</label>
        <input type="text" placeholder="Your Name" />

        <label>Mobile No. *</label>
        <input type="text" placeholder="Mobile No." />

        <label>Email Id *</label>
        <input type="text" placeholder="Email Id" />

        <label>Subject</label>
        <input type="text" placeholder="Subject" />

        <label>Write Your Message *</label>
        <textarea placeholder="Write Your Message"></textarea>

        <button className="send-btn">Send Now</button>
      </div>

      {/* CONTACT DETAILS SECTION */}
      <div className="contact-details">
        <h2>Contact Us</h2>

        <div className="detail-box">
          <p className="title">📞 Reach us on call/WhatsApp</p>
          <p className="info">+91-9966394544</p>
        </div>

        <div className="detail-box">
          <p className="title">📧 Email Address</p>
          <p className="info">srinusunkari544@gmail.com</p>
        </div>

        <div className="detail-box">
          <p className="title">📍 Store Location</p>
          <p className="info">
            Shiva Kumar General Store<br />
            Near Bus Stop, Kasibugga, Andhra Pradesh 532222
          </p>
          <a
    className="google-map-link"
    href="https://maps.app.goo.gl/KT4mzYVx2xux7HGVA"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className="info"></p>
    View on Google Maps
  </a>
        </div>
        

      </div>

    </div>
  );
};

export default ContactUs;
