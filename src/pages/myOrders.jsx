import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../authContext";
import "../styles/MyOrders.css";

export default function MyOrders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.uid),
        where("status", "in", ["paid", "confirmed", "success"])
      );

      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setOrders(list);
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders found</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            
            {/* Order Header */}
            <div className="order-header">
              <p className="order-id">Order ID: {order.id}</p>
              <span
                className={`order-status ${
                  order.status === "confirmed" || order.status === "paid"
                    ? "success"
                    : "pending"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Date */}
            <p className="order-date">
              {order.createdAt?.toDate().toLocaleString()}
            </p>

            {/* Address Section */}
            <div className="order-address-box">
              <h4>Delivery Address</h4>
              <p><b>Name:</b> {order.address?.name}</p>
              <p><b>House:</b> {order.address?.house}</p>
              <p><b>Area:</b> {order.address?.area}</p>
              <p><b>City:</b> {order.address?.city}</p>
              <p><b>Pincode:</b> {order.address?.pincode}</p>
              <p><b>Phone:</b> {order.phone}</p>
            </div>

            {/* Items */}
            <div className="order-items">
              <h4>Items</h4>

              {order.items.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt="" />

                  <div className="order-item-info">
                    <p>{item.title} × {item.qty}</p>
                    <p className="price">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <p className="order-total">Total: ₹{order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
}
