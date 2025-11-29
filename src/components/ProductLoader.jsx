import React from "react";
import "../styles/Loader.css";

export default function ProductCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skel skel-img"></div>

      <div className="skel skel-brand"></div>
      <div className="skel skel-title"></div>

      <div className="skel skel-mrp"></div>
      <div className="skel skel-price"></div>

      <div className="skel skel-btn"></div>
    </div>
  );
}
