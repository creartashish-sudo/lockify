import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Subscription() {
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  const availableFacilities = [
    {
      id: "documents",
      label:
        "Securely store and manage all your important documents in one place with easy access and full control over your files.",
      price: 199,
    },
    {
      id: "website",
      label:
        "Store and manage your website usernames and passwords safely, with optional encryption for added security.",
      price: 149,
    },
    {
      id: "encryption",
      label:
        "Protect sensitive data by enabling encryption for your stored documents and credentials, ensuring maximum privacy and security.",
      price: 99,
    },
  ];

  const totalPrice = facilities.reduce((total, selectedId) => {
    const facility = availableFacilities.find(f => f.id === selectedId);
    return total + (facility ? facility.price : 0);
  }, 0);
  

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFacilities([...facilities, value]);
    } else {
      setFacilities(facilities.filter((f) => f !== value));
    }
  };
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Facilities:", facilities);
    // handle form submission
    navigate("/");
  };

  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.post(
  //     "http://localhost/lock/create_order.php",
  //     {
  //       amount: 500,
  //     }
  //   );
  //   const { order_id, amount, currency } = response.data;

  //   const options = {
  //     key: "rzp_test_PvM4GxK9MYlCUc", // Your Razorpay Key ID
  //     amount: amount, // In paise (500 * 100 = ₹500)
  //     currency: currency,
  //     name: "Creart Solutions",
  //     description: "Test Transaction",
  //     order_id: order_id, // This comes from your PHP backend

  //     handler: async function (response) {
  //       try {
  //         const res = await axios.post(
  //           "http://localhost/lock/verify_payment.php",
  //           {
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_signature: response.razorpay_signature,
  //           }
  //         );

  //         if (res.data.status === "success") {
  //           const paymentRes = await axios.post(
  //             "http://localhost/lock/create_payment.php",
  //             {
                 
  //                 user_id: JSON.parse(localStorage.getItem("user")).id,
  //                 amount: 500,
  //             }
  //         );
          
  //         navigate("/");
  //         } else {
  //           alert("❌ Verification Failed: " + res.data.error);
  //         }
  //       } catch (err) {
  //         console.error("Error verifying payment:", err);
  //         alert("🚫 Server Error: " + err.message);
  //       }
  //     },

  //     prefill: {
  //       name: "Alkesh Kaba",
  //       email: "alkesh@creart.in",
  //       contact: "9016647480",
  //     },
  //     notes: {
  //       address: "CG Road, Ahmedabad",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  
  // };
  
  const handlePayment = async (e) => {
    e.preventDefault();

    if (facilities.length === 0) {
      alert("Please select at least one facility");
      return;
    }

    try {
      // 1️⃣ Create Order
      const orderRes = await axios.post(`${apiUrl}/payments/create-order`, {
        amount: totalPrice,
      });

      const { id: order_id, amount, currency } = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount,
        currency,
        name: "Lockify",
        description: "Subscription Payment",
        order_id,

        handler: async function (response) {
          try {
            // 2️⃣ Verify Payment
            const verifyRes = await axios.post(
              `${apiUrl}/payments/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: totalPrice,
                facilities,
                userId: JSON.parse(localStorage.getItem("user"))._id,
              }
            );

            if (verifyRes.data.status) {
              alert("✅ Payment Successful");
              navigate("/");
            } else {
              alert("❌ Payment Verification Failed");
            }
          } catch (err) {
            console.error(err);
            alert("Server error during verification");
          }
        },

        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Unable to initiate payment");
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Subscriptions
                  <br />
                </h1>
                <p className="mb-0">
                  Odio et unde deleniti. Deserunt numquam exercitationem.
                  Officiis quo odio sint voluptas consequatur ut a odio
                  voluptatem. Sit dolorum debitis veritatis natus dolores.
                  Quasi ratione sint. Sit quaerat ipsum dolorem.
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
                Subscription
                <br />
              </li>
            </ol>
          </div>
        </nav>
      </div>

      <div className="container p-5" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
          <div className="col-lg-8 mx-auto card p-4">
            <h3 className="text-center fw-bold pb-3 form-title">
              Subscription Facilities
            </h3>
            <form
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay={200}
              onSubmit={handlePayment}
            >
              <div className="row gy-4">
                {/* Checkbox list for facilities */}
                {availableFacilities.map((facility) => (
                  <div className="col-md-12" key={facility.id}>
                    <label>
                      <input
                      required
                        type="checkbox"
                        value={facility.id}
                        checked={facilities.includes(facility.id)}
                        onChange={handleCheckboxChange}
                      />{" "}
                      {facility.label}
                    </label>
                  </div>
                ))}

{facilities.length > 0 && (
  <div className="col-md-12">
    <div className="pricing-summary">
      <h5>Subscription Summary</h5>

      <ul>
        {facilities.map((id) => {
          const item = availableFacilities.find(f => f.id === id);
          return (
            <li key={id}>
              <span>{item.label.slice(0, 60)}...</span>
              <strong>₹{item.price}</strong>
            </li>
          );
        })}
      </ul>

      <div className="total-price">
        Total Amount: <span>₹{totalPrice}</span>
      </div>
    </div>
  </div>
)}

       


                {/* Conditional inputs */}
                {/* {facilities.includes("website") && (
                  <>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="website-username"
                        placeholder="Website Username"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="password"
                        className="form-control"
                        name="website-password"
                        placeholder="Website Password"
                        required
                      />
                    </div>
                  </>
                )} */}

                {/* {facilities.includes("documents") && (
                  <div className="col-md-12">
                    <input
                      type="file"
                      className="form-control"
                      name="documents"
                      multiple
                    />
                  </div>
                )}

                {facilities.includes("encryption") && (
                  <div className="col-md-12">
                    <input
                      type="password"
                      className="form-control"
                      name="encryption-password"
                      placeholder="Encryption Password"
                      required
                    />
                  </div>
                )} */}

                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                  <button type="submit">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
