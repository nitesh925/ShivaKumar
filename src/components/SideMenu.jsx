import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

export default function SideMenu({ open, setOpen }) {
  const [sections, setSections] = useState({
    nuts: false,
    driedFruits: false,
    dates: false,
    seeds: false,
    berries: false,
    exoticNuts: false,
    mixes: false,
    wholeSpices: false,
  });

  const toggle = (key) => {
    setSections({ ...sections, [key]: !sections[key] });
  };

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl p-6 
        transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button */}
        <button className="mb-6" onClick={() => setOpen(false)}>
          <X size={26} />
        </button>

        {/* Login / Signup */}
        <div className="flex items-center gap-4 mb-6">
          <button className="border border-black px-4 py-2 rounded-lg">
            Login
          </button>
          <button className="text-black font-medium">Sign up →</button>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Shop</h2>

        <div className="space-y-6">
          <MenuItem label="Nuts" open={sections.nuts} onClick={() => toggle("nuts")} />
          <MenuItem label="Dried Fruits" open={sections.driedFruits} onClick={() => toggle("driedFruits")} />
          <MenuItem label="Dates" open={sections.dates} onClick={() => toggle("dates")} />
          <MenuItem label="Seeds" open={sections.seeds} onClick={() => toggle("seeds")} />
          <MenuItem label="Berries" open={sections.berries} onClick={() => toggle("berries")} />

          <hr />

          <MenuItem label="Exotic Nuts" open={sections.exoticNuts} onClick={() => toggle("exoticNuts")} />
          <MenuItem label="Mixes" open={sections.mixes} onClick={() => toggle("mixes")} />

          <hr />

          <MenuItem label="Whole Spices" open={sections.wholeSpices} onClick={() => toggle("wholeSpices")} />
        </div>
      </div>
    </>
  );
}

function MenuItem({ label, open, onClick }) {
  return (
    <div>
      <div
        className="flex justify-between items-center text-lg cursor-pointer"
        onClick={onClick}
      >
        {label}
        <ChevronDown size={20} className={`${open ? "rotate-180" : ""} transition-transform`} />
      </div>

      {open && (
        <div className="ml-4 mt-2 text-gray-500 text-sm space-y-1">
          <p>• Premium</p>
          <p>• Classic</p>
          <p>• Budget</p>
        </div>
      )}
    </div>
  );
}
