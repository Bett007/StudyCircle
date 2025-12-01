import React from "react";

function SOSButton() {
  const phoneNumber = "+2547XXXXXXXX"; // Replace with your emergency contact
  const claimUrl = "https://lighthearted-squirrel-f7831a.netlify.app/claim";

  const message = encodeURIComponent(
    `SOS! I need help.\nClick here to CLAIM: ${claimUrl}`
  );

  const sendSMS = () => {
    window.location.href = `sms:${phoneNumber}?&body=${message}`;
  };

  return (
    <div className="container">
      <h1>SOS Emergency</h1>
      <button className="sos-btn" onClick={sendSMS}>
        SEND SOS
      </button>
    </div>
  );
}

export default SOSButton;
