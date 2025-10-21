// src/components/cart/SendOrder.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";

const SendOrder = ({ user, cartItems, totalPrice }) => {
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();

  const handleSendOrder = async () => {
    if (!user || !user.email) {
      alert("Please log in first!");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsSending(true);

    const orderSummary = cartItems
      .map((item) => `${item.title} (x${item.quantity}) - $${item.price}`)
      .join("\n");

    const orderDate = new Date().toLocaleString();

    try {
      // 1️⃣ Send invoice to customer
      await emailjs.send(
        "service_f9p0p7b",
        "template_5xv3bke",
        {
          to_name: user.name || user.email,
          to_email: user.email,
          order_summary: orderSummary,
          total_price: totalPrice.toFixed(2),
          order_date: orderDate,
        },
        "BeGy3nai4D3iywEnN"
      );

      // 2️⃣ Send notification to admin
      await emailjs.send(
        "service_f9p0p7b",
        "template_dsaauta",
        {
          customer_email: user.email,
          order_summary: orderSummary,
          total_price: totalPrice.toFixed(2),
        },
        "BeGy3nai4D3iywEnN"
      );

      alert("Invoice sent to customer and admin notified!");
      dispatch(clearCart()); // ✅ Clear cart after sending
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send order emails. Check console for details.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      onClick={handleSendOrder}
      disabled={isSending}
      className={`px-4 py-2 rounded-lg text-white ${
        isSending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isSending ? "Sending..." : "Send Order"}
    </button>
  );
};

export default SendOrder;
