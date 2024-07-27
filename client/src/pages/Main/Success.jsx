import React from 'react';
import '../../css/success.css' // Import the CSS file for styling

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-icon">✓</div>
      <h1>Payment Successful</h1>
      <p>Your payment has been processed successfully. Thank you for your purchase!</p>
      <button className="success-button" onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
};

export default Success;
