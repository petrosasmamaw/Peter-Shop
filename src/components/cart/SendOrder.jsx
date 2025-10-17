import React, { useState } from "react";

const SendOrder = ({ items, totalPrice }) => {
  const [status, setStatus] = useState("");

  const handleSendOrder = async (e) => {
    e.preventDefault();
    setStatus("Sending order...");

    // Prepare order details as text
    const orderDetails = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.title} — $${item.price} × ${item.quantity} = $${item.subtotal.toFixed(2)}`
      )
      .join("\n");

    const message = `
🛍️ New Order Received
-------------------------
${orderDetails}

Total: $${totalPrice.toFixed(2)}
-------------------------
Thank you!
`;

    const formData = new FormData();
    formData.append("access_key", "ec9594a0-ecd1-43ae-a8c3-c0451db084a5");
    formData.append("subject", "🛒 New Order from Your Shopping App");
    formData.append("from_name", "Shopping App");
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("✅ Order sent successfully!");
      } else {
        setStatus("❌ Failed to send order. Try again.");
      }
    } catch (error) {
      console.error("Error sending order:", error);
      setStatus("⚠️ Network error. Try again.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleSendOrder} className="btn dark-btn">
        Send Order
      </button>
      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
};

export default SendOrder;
