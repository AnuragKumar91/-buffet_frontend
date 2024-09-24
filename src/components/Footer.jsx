import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo1 from "../assets/footer-logo.png"; // Update with the correct path to your logo
import Brand from "../assets/brand_ambassdor.jpg"; // Update with the correct path to your logo

import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 text-sm-right mt-2 text-lg-center ">
              <h5 className="Copy-Right-Text"> Our Outlets :</h5>
              <div className="footer-locations">
                <p className="Copy-Right-Text">
                  Patna Main Branch (Mithapur):
                  <a href="">
                    ShantiLals Sweets and Restaurants, Near Dayanand Girls
                    School, Mithapur Sabji Mandi, Patna-800001,
                    <a href="tel:+91-9128303303" className="contact-link mx-0">
                      <a
                        href="https://wa.me/+919128303303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link "
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{ color: "#25D366" }}
                          id="num-what"
                          className="mx-1  "
                        />
                      </a>
                      +91-9128303303
                    </a>
                  </a>
                </p>
                <p className="Copy-Right-Text">
                  Rajapul Boring Road, Patna:
                  <a href="">
                    {" "}
                    Rajapur Pul Chauraha, Near by KFC, Buddha Colony, Patna,
                    Bihar 800001 ,{" "}
                    {/* <a href="tel:+91-9534303303">+91-9534303303</a> */}
                    <a href="tel:+91-9534303303" className="contact-link mx-0">
                      <a
                        href="https://wa.me/+9534303303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link "
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{ color: "#25D366" }}
                          id="num-what"
                          className="mx-1  "
                        />
                      </a>
                      +91-9534303303
                    </a>
                  </a>
                </p>
                <p className="Copy-Right-Text">
                  Saguna More, Patna:
                  <a href="">
                    {" "}
                    4th-5th floor, Bhagyamani Complex, Above Reliance Digital,
                    Saguna More, Patna- 801503,{" "}
                    {/* <a href="tel:+91-9570303303">+91-9570303303</a> */}
                    <a href="tel:+91-9570303303" className="contact-link mx-0">
                      <a
                        href="https://wa.me/+919570303303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link "
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{ color: "#25D366" }}
                          id="num-what"
                          className="mx-1  "
                        />
                      </a>
                      +91-9570303303
                    </a>
                  </a>
                </p>
                <p className="Copy-Right-Text">
                  Phulwari sharif, Patna:
                  <a href="">
                    {" "}
                    Opposite to Mahavir Cancer Sansthan, Patna- 801505,{" "}
                    {/* <a href="tel:+91-9576303303">+91-9576303303</a> */}
                    <a href="tel:+91-9576303303" className="contact-link mx-0">
                      <a
                        href="https://wa.me/+919576303303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link "
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{ color: "#25D366" }}
                          id="num-what"
                          className="mx-1  "
                        />
                      </a>
                      +91-9576303303
                    </a>
                  </a>
                </p>

                <p className="Copy-Right-Text">
                  Bajar Samiti, Patna:
                  <a href="">
                    {" "}
                    RB Plaza, Rampur Nahar Road, Bazar Samati, Musallahpur,
                    Patna- 801505,{" "}
                    {/* <a href="tel:+91-7079 303 303">+91-7079 303 303</a> */}
                    <a
                      href="tel:+91-7079 303 303"
                      className="contact-link mx-0"
                    >
                      <a
                        href="https://wa.me/+917079303303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link "
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{ color: "#25D366" }}
                          id="num-what"
                          className="mx-1  "
                        />
                      </a>
                      +91-7079303303
                    </a>
                  </a>
                </p>
                <p className="Copy-Right-Text">
                  Rajeev Nagar, Patna:
                  <a href="">
                    {" "}
                    Atal Path, Near to Indrapuri Road 2, Patna-800001,{" "}
                    {/* <a href="tel:+91-9128 303 303">+91-9128 303 303</a> */}
                    <a
                      href="tel:+91-9128 303 303"
                      className="contact-link mx-0"
                    >
                      <a
                        href="https://wa.me/+919128303303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link "
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{ color: "#25D366" }}
                          id="num-what"
                          className="mx-1  "
                        />
                      </a>
                      +91-9128 303 303
                    </a>
                  </a>
                </p>
                <p className="Copy-Right-Text">
                  PGS More, Danapur:
                  <a href="">
                    {" "}
                    Kripa Nand Tower, PGS More, Maurya Path, (Near Dadan Handi)
                    Near RPS, Danapur 801503,{" "}
                    {/* <a href="tel:+91-9128 303 303">+91-9128 303 303</a> */}
                    <a
                      href="tel:+91-9128 303 303"
                      className="contact-link mx-0"
                    >
                      <a
                        href="https://wa.me/+919128303303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link "
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{ color: "#25D366" }}
                          id="num-what"
                          className="mx-1  "
                        />
                      </a>
                      +91-9128 303 303
                    </a>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div>
                  <h6 className="Copy-Right-Text">
                    <strong>Our Upcoming Outlets</strong>{" "}
                    <span className="mx-1"> :</span>
                    <div className="footer-locations mt-2">
                      <span>Chhapra, </span>
                      <spanp>Varanasi (Uttar Pradesh)</spanp>
                      {/* <span>Siwan </span> */}
                    </div>
                  </h6>
                </div>

                <div class="col-lg-4 col-md-6 order-md-2 order-1 mt-2 ">
                  <div
                    class="footer-widget  social-area mx-2 mx-md-0"
                    id="test"
                  >
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

                    <a>
                      <img
                        src={Brand}
                        alt=""
                        class="supesrFooter "
                        width="350"
                        height="400"
                        id="brand"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 text-center text-sm-start mt-3">
              <div className="footer-social-media ">
                <span className="Copy-Right-Text">Follow us :</span>
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

export default Footer;
