import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import banner from "../assets/banner.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import logo from "../assets/shant-logos.png"; // Update with the correct path to your logo
import ban1 from "../assets/banner1.jpg"; // Update with the correct path to your logo
import menu from "../assets/me.jpg";
import { faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const Form = () => {
  const [branches, setBranches] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValid, setOtpValid] = useState(false);

  // const [generatedOtp, setGeneratedOtp] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
const [otpSuccess, setOtpSuccess] = useState("");

  // Fetch branch list on component mount

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
    if (id == "phone") {
      if (value.length <= maxLength) {
        setFormData({ ...formData, [id]: value });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleTimeSlotChange = (e) => {
    const selectedId = e.target.value;

    setFormData({ ...formData, time_slot: selectedId });
  };

  useEffect(() => {
    const fetchBranches = async () => {
      console.log("Fetching branches...");

      try {
        const response = await fetch("https://shantilalsfoods.com/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "branchLists",
            apiKey: "ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y",
          }),
        });

        console.log("Response received");

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response Status:", response.status);
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const responseJson = await response.json(); // Parse the JSON response

        if (responseJson.success && responseJson.data) {
          setBranches(responseJson.data); // Set the branches data
        } else {
          console.error("Invalid response format:", responseJson);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  // Fetch time slots based on selected branch
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (formData.branch) {
        try {
          const response = await fetch("https://shantilalsfoods.com/api/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "timeLists",
              apiKey: "ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y",
              branchID: parseInt(formData.branch, 10), // Ensure branchID is an integer
            }),
          });

          // Check if the response is ok
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Response Status:", response.status);
            throw new Error(`Network response was not ok: ${errorText}`);
          }

          // Parse JSON response
          const responseJson = await response.json();

          // Debugging: Log the response JSON
          console.log("Time Slots Response:", responseJson);

          // Check for valid data and set time slots
          if (responseJson.success && responseJson.data) {
            setTimeSlots(responseJson.data); // Directly set the array of time slots
          } else {
            console.error("Invalid response format:", responseJson);
            setTimeSlots([]); // Ensure time slots are cleared on invalid response
          }
        } catch (error) {
          console.error("Error fetching time slots:", error);
          setTimeSlots([]); // Ensure time slots are cleared on error
        }
      } else {
        setTimeSlots([]); // Clear time slots if no branch is selected
      }
    };

    fetchTimeSlots();
  }, [formData.branch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate phone number
      if (formData.phone.length !== 10) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Phone Number",
          text: "Phone number must be a 10-digit number",
        });
        return;
      }

      // Map formData to API data structure
      const apiData = {
        action: "addBuffet",
        apiKey: "ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y",
        data: {
          branch: formData.branch, // Ensure branch matches API requirements
          name: formData.name,
          phone: formData.phone,
          bdate: startDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
          time: formData.time_slot, // Adjust time slot as needed
          adult: parseInt(formData.no_of_person, 10), // Convert to integer
          child: parseInt(formData.no_of_kids, 10), // Convert to integer
          purpose: formData.ocassion, // Use the appropriate field
        },
      };

      // Perform the fetch request
      const response = await fetch("https://shantilalsfoods.com/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Status:", response.status);
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      // Parse JSON response
      const responseData = await response.json();
          if(responseData.success){
            console.log("Success:", responseData);
            Swal.fire({
              icon: "success",
              title: "Form Submitted Successfully!",
              text: "Your booking has been confirmed.",
            });
      
            // Reset the form (clear formData and other states as needed)
            setFormData({
              branch: "",
              name: "",
              phone: "",
              time_slot: "",
              no_of_person: "",
              no_of_kids: "",
              ocassion: "",
            });
            setStartDate(new Date()); // Reset the date if needed
          }else{
            Swal.fire({
              icon: "error",
              title:responseData.message ,
              text: "There was an error submitting the form. Please try again.",
            });
            
          }
      // Handle success response
      
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "There was an error submitting the form. Please try again.",
      });
    }
  };

  const handleSendOtp = async () => {
    setOtpSent(true); // This should make the OTP input visible

    // Validation for phone number
    if (!formData.phone || formData.phone.length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text: "Phone number must be a 10-digit number",
      });
      return;
    }

    console.log("Sending OTP to phone:", formData.phone);

    setOtpValid(false);
    const apiData = {
      action: "sendOtp",
      apiKey: "ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y",
      phone:formData.phone
    };

    try {
      const response = await fetch(
        "https://shantilalsfoods.com/api/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      const responseData = await response.json();
      console.log("Response Data:", responseData);
    } catch (error) {
      setOtpSent(true); // This should make the OTP input visible

      console.error("Error sending OTP:", error.message || error);
    }
  };


  const handleOtpChange = (e) => {
    setFormData({ ...formData, otp: e.target.value });
  };

  // const verifyOtp = async () => {
  //   // Check if the OTP input is empty
  //   if (!formData.otp) {
      
  //     return;
  //   }
  
  //   // Make sure the OTP is a 6-digit number (assuming OTPs are 6 digits)
  //   if (formData.otp.length !== 6 || isNaN(formData.otp)) {
      
  //     return;
  //   }
  
  //   const apiData = {
  //     action: "verifyOtp",
  //     apiKey: "ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y",
  //     phone:formData.phone,
  //     otp:formData.otp

  //   };
  //   // Verify the OTP
  //   try {
  //     const response = await fetch(  "https://shantilalsfoods.com/api/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(apiData),

  //     });
  
  //     const responseData = await response.json();
  //     console.log("OTP Verification Response Data:", responseData);
  
  //     if (responseData.success) {
  //       // OTP is verified
  //       setOtpValid(true);
      
  //     } else {
  //       // OTP verification failed
        
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error.message || error);
      
  //   }
  // };
  
  const verifyOtp = async () => {
    // Reset messages
    setOtpError("");
    setOtpSuccess("");
  
    // Check if the OTP input is empty
    if (!formData.otp) {
      setOtpError("Please enter the OTP.");
      return;
    }
  
    // Make sure the OTP is a 6-digit number
    if (formData.otp.length !== 6 || isNaN(formData.otp)) {
      setOtpError("OTP must be a 6-digit number.");
      return;
    }
  
    const apiData = {
      action: "verifyOtp",
      apiKey: "ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y",
      phone: formData.phone,
      otp: formData.otp,
    };
  
    try {
      const response = await fetch("https://shantilalsfoods.com/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });
  
      const responseData = await response.json();
      console.log("OTP Verification Response Data:", responseData);
  
      if (responseData.success) {
        // OTP is verified
        setOtpValid(true);
        setOtpSuccess("OTP verified successfully.");
      } else {
        // OTP verification failed
        setOtpError("Incorrect Otp");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message || error);
      setOtpError("An error occurred while verifying the OTP.");
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
                {/* <div>
                <h6 className="text-light fas ">Fastest Growing Food Chain of India</h6>
                </div> */}
                <hr id="hre" />{" "}
                <h2 className="text-center text-light  gradient-text">
                  Buffet Booking For Shantilal's
                </h2>
                <hr id="hre" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
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
                  </div>

                  {/* <div className="col-lg-6 mb-3">
                    <div className="form-group d-flex align-items-center">
                      {!otpSent || otpValid ? (
                        <input
                          type="text"
                          className="form-control me-2"
                          id="phone"
                          placeholder="Enter 10 digit no"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={10}
                          required
                          readOnly={otpValid} 
                        />
                      ) : null}
                      {otpValid && (
                        <span className="text-light d-flex align-items-center ms-2">
                          Verified{" "}
                          <FontAwesomeIcon icon={faCheck} className="check" />
                        </span>
                      )}
                      {!otpValid &&
                        formData.phone.length === 10 &&
                        !otpSent && (
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleSendOtp}
                          >
                            Send OTP
                          </button>
                        )}
                    </div>

                    {otpSent && !otpValid && (
                      <div className="mt-1">
                        <div className="row">
                          <div className="col-lg-8">
                            <input
                              type="text"
                              className="form-control"
                              id="otp"
                              value={formData.otp || ""}
                              onChange={handleOtpChange}
                              placeholder="Enter OTP"
                            />
                          </div>
                          <div className="col-lg-4">
                            <button
                              type="button"
                              className="btn btn-success w-100"
                              onClick={verifyOtp}
                            >
                              Verify OTP
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div> */}
                  <div className="col-lg-6 mb-3">
  <div className="form-group d-flex align-items-center">
    {!otpSent || otpValid ? (
      <input
        type="text"
        className="form-control me-2"
        id="phone"
        placeholder="Enter 10 digit no"
        value={formData.phone}
        onChange={handleInputChange}
        maxLength={10}
        required
        readOnly={otpValid} // Use readOnly if OTP is verified
      />
    ) : null}
    {otpValid && (
      <span className="text-light d-flex align-items-center ms-2">
        Verified <FontAwesomeIcon icon={faCheck} className="check" />
      </span>
    )}
    {!otpValid && formData.phone.length === 10 && !otpSent && (
      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={handleSendOtp}
      >
        Send OTP
      </button>
    )}
  </div>

  {/* Display OTP input field if OTP is sent but not yet verified */}
  {otpSent && !otpValid && (
    <div className="mt-1">
      <div className="row">
        <div className="col-lg-8">
          <input
            type="text"
            className="form-control"
            id="otp"
            value={formData.otp || ""}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
          />
          {/* Display OTP error message */}
          {otpError && <small className="text-white">{otpError}</small>}
          {/* Display OTP success message */}
          {otpSuccess && <small className="text-white">{otpSuccess}</small>}
        </div>
        <div className="col-lg-4">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  )}
</div>


                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="ocassion"
                        placeholder="Booking Purpose ..."
                        value={formData.ocassion}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group d-flex align-items-center">
                      <label
                        htmlFor="date-picker"
                        className="form-label text-white mb-0 me-2"
                        id="lab"
                        style={{ minWidth: "120px" }}
                      >
                        Booking Date:
                      </label>
                      <DatePicker
                        className="form-control date-picker"
                        id="booking_date"
                        selected={startDate}
                        minDate={new Date() + 1} // Prevent selecting previous dates
                        onChange={(date) => {
                          setStartDate(date);
                          setFormData({ ...formData, booking_date: date });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        id="no_of_person"
                        placeholder="Number of Person"
                        value={formData.no_of_person}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        id="no_of_kids"
                        placeholder="Number of Kids"
                        value={formData.no_of_kids}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <select
                        className="form-select"
                        id="branch"
                        value={formData.branch}
                        onChange={(e) =>
                          setFormData({ ...formData, branch: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.branch}{" "}
                            {/* Ensure this matches the correct field name */}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <select
                        className="form-select"
                        id="time_slot"
                        value={formData.time_slot}
                        onChange={(e) => handleTimeSlotChange(e)}
                        disabled={!formData.branch} // Disable if no branch is selected

                        required
                      >
                        <option value="">Select Time Slot</option>
                        {timeSlots.length > 0 ? (
                          timeSlots.map((slot) => (
                            <option key={slot.id} value={slot.bookingtime}>
                              {slot.bookingtime}
                            </option>
                          ))
                        ) : (
                          <option value="">No Time Slots Available</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="button-holder">
                      <button
                        type="submit"
                        id="registerBtn"
                        className="btn btn-fill-blue btn-register w-100"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="row">
          <div className="col-lg-6">
            <img
              src={banner}
              className="d-block w-100 img-fluid"
              alt="Banner Image"
            />
          </div>
          <div className="col-lg-6 mt-4 mt-md-0">
            <img
              src={ban1}
              className="d-block w-100 img-fluid"
              alt="Ban1 Image"
            />
          </div>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="row w-100 ">
          <img src={menu} alt="" className="menu-image img-fluid"  id="menu-card"/>
        </div>
      </div>

      <hr />
      <Footer />
    </>
  );
};

export default Form;
