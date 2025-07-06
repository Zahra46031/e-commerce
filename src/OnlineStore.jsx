// OnlineStore.jsx (Plain React + CSS)
import React, { useState } from "react";
import "./OnlineStore.css";

const PRODUCTS = [
  { id: 1, name: "T-Shirt", category: "Clothing", price: 20 },
  { id: 2, name: "Book", category: "Books", price: 10 },
  { id: 3, name: "Mug", category: "Home", price: 8 },
  { id: 4, name: "Headphones", category: "Electronics", price: 50 },
  { id: 5, name: "Notebook", category: "Stationery", price: 5 },
];

const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

export default function OnlineStore() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [survey, setSurvey] = useState({ name: "", comment: "" });
  const [paymentInfo, setPaymentInfo] = useState({ name: "", card: "" });

  const filteredProducts =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("Payment info submitted!");
    setCart([]);
    setPaymentInfo({ name: "", card: "" });
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    alert("Thanks for your feedback!");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = total * 0.2;
  const finalTotal = total - discount;

  return (
    <div className="container">
      <h1>Mini Online Store</h1>
      <h3 className="helper-text">Filter items by category to find exactly what you need.</h3>

      <p className="promo-text">
        🎉 Limited-time Offer: Get 20% off select items today only! Don’t miss out!
      </p>

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map((item, i) => (
                <li key={i}>{item.name} - ${item.price}</li>
              ))}
            </ul>
            <p>Total: ${total.toFixed(2)}</p>
            <p>20% Discount: -${discount.toFixed(2)}</p>
            <p><strong>Final Total: ${finalTotal.toFixed(2)}</strong></p>
          </>
        )}
      </div>

      <form onSubmit={handlePaymentSubmit} className="form">
        <h2>Payment Info</h2>
        <input
          placeholder="Full Name"
          value={paymentInfo.name}
          onChange={(e) =>
            setPaymentInfo({ ...paymentInfo, name: e.target.value })
          }
          required
        />
        <input
          placeholder="Card Number"
          value={paymentInfo.card}
          onChange={(e) =>
            setPaymentInfo({ ...paymentInfo, card: e.target.value })
          }
          required
        />
        <button type="submit">Submit Payment</button>
      </form>

      <form onSubmit={handleSurveySubmit} className="form">
        <h2>We Value Your Feedback</h2>
        <p>
          Did you enjoy your visit? Share your experience with us—it only takes a moment, and it helps a lot!
        </p>
        <input
          placeholder="Your Name"
          value={survey.name}
          onChange={(e) => setSurvey({ ...survey, name: e.target.value })}
        />
        <textarea
          placeholder="How was your shopping experience?"
          value={survey.comment}
          onChange={(e) => setSurvey({ ...survey, comment: e.target.value })}
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
