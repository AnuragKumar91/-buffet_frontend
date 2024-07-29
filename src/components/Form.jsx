import React, { useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import banner from "../assets/banner.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import logo from "../assets/shant-logos.png"; // Update with the correct path to your logo
import logo1 from "../assets/shantillal-logo.jpg"; // Update with the correct path to your logo

import ban1 from "../assets/banner1.jpg"; // Update with the correct path to your logo
import ban2 from "../assets/banner2.jpg"; // Update with the correct path to your logo
import menu from "../assets/me.jpg";
import ban3 from "../assets/banner3.jpg"; // Update with the correct path to your logo
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Form = () => {
  const openWhatsApp = () => {
    const phoneNumber = "+919128303303";
    const message =
      "Hello! I want to know about  Booking . Can you please provide me with more information";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    // console.log(whatsappURL)
    window.open(whatsappURL, "_blank");
  };

  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: "",
    ocassion: "",
    booking_date: new Date(),
    no_of_person: "",
    no_of_kids: "",
    time_slot: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    const maxLength = 10; // Define maximum length

    // Check if input length exceeds maximum length
    if (value.length <= maxLength) {
      setFormData({ ...formData, [id]: value });
    }
  };
  const handleTimeSlotChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, time_slot: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate phone number
      if (formData.phone.length !== 10) {
        alert("Phone number must be a 10-digit number");
        return;
      }
      const response = await axios.post("http://localhost:9000/submit", {
        ...formData,
        booking_date: startDate.toISOString().split("T")[0], // Sending date in YYYY-MM-DD format
      });

      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data sent to the Database",
      });
      // Reset the form
      setFormData({
        name: "",
        phone: "",
        ocassion: "",
        branch: "",
        booking_date: new Date(),
        no_of_person: "",
        no_of_kids: "",
        time_slot: "",
      });
      setStartDate(new Date());
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error submitting the form!",
      });
    }
  };

  return (
    <>
      <div
        className="whatsapp-icon"
        onClick={openWhatsApp}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faWhatsapp} style={{ color: "white" }} />
      </div>
      <a href="tel:+91 9128303303" className="call-icon">
        <FontAwesomeIcon icon={faPhone} />
      </a>

      <div className="container">
        <div className="row justify-content-lg-center">
          <div className="col-lg-8">
            <div className="form-container">
              <div className="text-center">
                <img src={logo} alt="Logo" width="230" className="" />
                <hr id="hre" />{" "}
                <h2 className="text-center text-light  gradient-text">
                  Buffet Booking For Shantilal
                </h2>
                <hr id="hre" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Guest Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Enter 10 digit number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={10} // Add maxLength attribute
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <select
                    className="form-select"
                    id="ocassion"
                    value={formData.ocassion}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Booking Occasion</option>
                    <option value="Banquet">Banquet</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group mb-3  date-pickers ">
                  <label
                    htmlFor="date-picker"
                    className="form-label text-white py-2  "
                    id="lab"
                  >
                    Choose Date:
                  </label>
                  <DatePicker
                    className="form-control date-picker mx-2 col-lg-12 "
                    id="booking_date"
                    selected={startDate}
                    minDate={new Date()} // Prevent selecting previous dates
                    onChange={(date) => {
                      setStartDate(date);
                      setFormData({ ...formData, booking_date: date });
                    }}
                    required
                  />
                </div>
                <div className="row">
                  <div className="form-group  col-6 mb-3">
                    <input
                      type="number"
                      className="form-control mx-1"
                      id="no_of_person"
                      placeholder="Number of Person"
                      value={formData.no_of_person}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <input
                      type="number"
                      className="form-control mx-0"
                      id="no_of_kids"
                      placeholder="Number of Kids"
                      value={formData.no_of_kids}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <select
                    className="form-select"
                    id="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Branch </option>
                    <option value="Saguna More">Saguna More</option>
                    <option value="Rajapul">Rajapul</option>
                    <option value="Mithapur">Mithapur</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <select
                    className="form-select"
                    id="time_slot"
                    value={formData.time_slot}
                    onChange={handleTimeSlotChange}
                    required
                  >
                    <option value="">Select a time slot</option>
                    <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                    <option value="9:00 AM - 10:00 AM">
                      9:00 AM - 10:00 AM
                    </option>
                    <option value="10:00 AM - 11:00 AM">
                      10:00 AM - 11:00 AM
                    </option>
                    <option value="11:00 AM - 12:00 PM">
                      11:00 AM - 12:00 PM
                    </option>
                  </select>
                </div>
                <div className="button-holder">
                  <button
                    type="submit"
                    id="registerBtn"
                    className="btn btn-fill-blue btn-register margin-right-15 w-100"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-lg-12">
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src={banner}
                    class="d-block w-100 img-fluid "
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img src={ban1} class="d-block w-100  img-fluid" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={ban2} class="d-block w-100  img-fluid" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={ban3} class="d-block w-100  img-fluid" alt="..." />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="row  image-container ">
          <img src={menu} alt="" className="menu-image img-fluid" />
        </div>
      </div>

      <hr />
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 text-sm-right mt-2 text-lg-center ">
              <h5 className="Copy-Right-Text"> Our Outlet :</h5>
              <div className="footer-locations">
                <p className="Copy-Right-Text">
                  Patna Main Branch (Mithapur):{" "}
                  <a href="">
                    ShantiLals Sweets and Restaurants, Near Dayanand Girls
                    School, Mithapur Sabji Mandi, Patna-800001 ,{" "}
                    <a href="tel:+91-9128303303">+91-9128303303</a>
                  </a>{" "}
                </p>
                <p className="Copy-Right-Text">
                  Rajapul Boring Road, Patna:
                  <a href="">
                    {" "}
                    Rajapur Pul Chauraha, Near by KFC, Buddha Colony, Patna,
                    Bihar 800001 ,{" "}
                    <a href="tel:+91-9534303303">+91-9534303303</a>
                  </a>
                </p>
                <p className="Copy-Right-Text">
                  Saguna More, Patna:
                  <a href="">
                    {" "}
                    4th-5th floor, Bhagyamani Complex, Above Reliance Digital,
                    Saguna More, Patna- 801503,{" "}
                    <a href="tel:+91-9570303303">+91-9570303303</a>
                  </a>
                </p>
                <p className="Copy-Right-Text">
                  Phulwari sharif, Patna:
                  <a href="">
                    {" "}
                    Opposite to Mahavir Cancer Sansthan, Patna- 801505,{" "}
                    <a href="tel:+91-9576303303">+91-9576303303</a>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div>
                  <h6 className="Copy-Right-Text">
                    <strong>Our Upcoming Outlet</strong>{" "}
                    <span className="mx-1"> :</span>
                    <div className="footer-locations mt-2">
                      <span>Bazar Smiti, </span>
                      <spanp>Bakarganj, </spanp>
                      <span>Siwan </span>
                    </div>
                  </h6>
                </div>

                <div class="col-lg-4 col-md-6 order-md-2 order-1 mt-2">
                  <div class="footer-widget  social-area" id="test">
                    <div class="footer-logo text-center">
                      <a>
                        <img
                          class="supesrFooter"
                          src={logo1}
                          alt="Logo"
                          width="230"
                        />
                      </a>
                    </div>

                    {/* <div class="footer-social">
                      <ul class="social-link d-flex align-items-center justify-content-center">
                        <li>
                        <FontAwesomeIcon icon={faFacebook} id="fb" />
                        </li>

                        <li>
                          <a
                            href="https://www.instagram.com/shantilalventures/"
                            target="_blank"
                          >
                            <img
                              src="images/instagram.png"
                              alt=""
                              style={{ height: "25px" }}
                            />
                          </a>
                        </li>

                        <li>
                          <a
                            href="https://in.pinterest.com/shantilalsweet/"
                            target="_blank"
                          >
                            <img
                              src="images/pintrest.png"
                              alt=""
                              style={{ height: "35px" }}
                            />
                          </a>
                        </li>

                        <li>
                          <a
                            href="https://www.linkedin.com/company/shantilal-s-sweet-ventures/"
                            target="_blank"
                          >
                            <img
                              src="images/linkedin.png"
                              alt=""
                              style={{ height: "25px" }}
                            />
                          </a>
                        </li>

                        <li>
                          <a
                            href="https://www.youtube.com/@ShantilalsSweets"
                            target="_blank"
                          >
                            <img
                              src="images/youtube.png"
                              alt=""
                              style={{ height: "50px" }}
                            />
                          </a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 text-sm-right mt-3">
              <div className="footer-social-media">
                <span className="Copy-Right-Text">
                  Follow us on Social Media:
                </span>

                <a
                  href="https://www.facebook.com/shantilalsweetsventures/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-3"
                >
                  <FontAwesomeIcon icon={faFacebook} id="fb" />
                </a>
                <a
                  href="https://x.com/SHANTILALS3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-3"
                >
                  <FontAwesomeIcon icon={faTwitter} id="twi" />
                </a>
                <a
                  href="https://www.instagram.com/shantilalsfoods/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-3"
                >
                  <FontAwesomeIcon icon={faInstagram} id="ins" />
                </a>
                <a
                  href="https://www.linkedin.com/in/arjun-shantilal-s-776a22254/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-3"
                >
                  <FontAwesomeIcon icon={faLinkedin} id="ins" />
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className="col-md-12 col-sm-6 text-sm-left text-center">
            <span className="Copy-Right-Text">
              © 2024{" "}
              <a href="https://shantilalsfoods.com/index.php" target="_blank">
                Shantilal Sweets
              </a>{" "}
              All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
