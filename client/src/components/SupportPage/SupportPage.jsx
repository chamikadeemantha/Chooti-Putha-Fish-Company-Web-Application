import React from "react";
import "./SupportPage.css";

function SupportPage() {
  const openWhatsAppChat = () => {
    const phoneNumber = "94703081363"; 
    const message = encodeURIComponent("Hello, I need support!"); 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="support-page">
      <h1>Contact Support</h1>
      <div className="contact-info">
        <p>
          For any inquiries or issues, please feel free to contact our support team.
        </p>
        <p>
          You can reach us via email at <a href="mailto:support@example.com">chamikade01@gmail.com</a>.
        </p>
        <p>
          Alternatively, you can call us at <a href="tel:+1234567890">+94 (72) 4678234/+94 (72) 63287412</a>.
          
        </p>
      </div>
      <button type="button" className="contact-button" onClick={openWhatsAppChat}>
        Contact Us
      </button>
    </div>
  );
}

export default SupportPage;
