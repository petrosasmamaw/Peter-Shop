// src/components/cart/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} from "./cartSlice";

const Cart = ({ user }) => {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  if (!user) return <p>Please login to manage your cart.</p>;

  return (
    <div className="cart">
      <h2>🛒 My Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> — ${item.price} × {item.quantity} =
                <b> ${item.subtotal.toFixed(2)}</b>
                <br />
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </li>
            ))}
          </ul>

          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
