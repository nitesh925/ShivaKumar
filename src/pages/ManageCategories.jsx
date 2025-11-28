import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import "../styles/ManageCategories.css";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";
import "../styles/ManageCategories.css";

const ManageCategories = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/" replace />;

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Fetch categories in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(list);
    });

    return () => unsub();
  }, []);

  // ADD CATEGORY
  const handleAdd = async () => {
    if (!newCategory.trim()) return alert("Category cannot be empty");

    const formatted = newCategory.toLowerCase().trim();

    try {
      await addDoc(collection(db, "categories"), {
        name: formatted,
      });
      setNewCategory("");
    } catch (err) {
      console.error(err);
      alert("Error adding category");
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteDoc(doc(db, "categories", id));
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  // UPDATE CATEGORY
  const handleUpdate = async (id) => {
    if (!editingName.trim()) return alert("Category cannot be empty");

    const formatted = editingName.toLowerCase().trim();

    try {
      await updateDoc(doc(db, "categories", id), {
        name: formatted,
      });
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      console.error(err);
      alert("Error updating category");
    }
  };

  return (
    <div className="manage-cat-container">
      <h2>Manage Categories</h2>

      {/* ---- Add New Category ---- */}
      <div className="add-cat-box">
        <input
          type="text"
          placeholder="Enter category name..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* ---- Categories List ---- */}
      <div className="cat-list">
        {categories.length === 0 ? (
          <p>No categories added yet.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="cat-item">
              {editingId === cat.id ? (
                <>
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(cat.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{cat.name}</span>
                  <div className="cat-actions">
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditingName(cat.name);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(cat.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
