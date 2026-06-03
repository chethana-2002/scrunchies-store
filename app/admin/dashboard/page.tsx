"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";

interface ColorItem {
  id: string;
  name: string;
  hex: string;
  stock: number;
}

export default function DashboardPage() {
  const [colors, setColors] = useState<ColorItem[]>([]);

  const [name, setName] = useState("");
  const [hex, setHex] = useState("#F7F1E8");
  const [stock, setStock] = useState(0);

  const [editingId, setEditingId] = useState("");
  const [editingName, setEditingName] = useState("");
  const [editingHex, setEditingHex] = useState("#F7F1E8");
  const [editingStock, setEditingStock] = useState(0);

  async function loadColors() {
    const snapshot = await getDocs(collection(db, "colors"));

    const list: ColorItem[] = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...(docItem.data() as Omit<ColorItem, "id">),
    }));

    setColors(list);
  }

  async function addColor() {
    if (!name.trim()) return;

    await addDoc(collection(db, "colors"), {
      name,
      hex,
      stock,
    });

    setName("");
    setHex("#F7F1E8");
    setStock(0);

    loadColors();
  }

  async function deleteColor(id: string) {
    await deleteDoc(doc(db, "colors", id));
    loadColors();
  }

  async function saveEdit() {
    if (!editingId) return;

    await updateDoc(doc(db, "colors", editingId), {
      name: editingName,
      hex: editingHex,
      stock: editingStock,
    });

    setEditingId("");
    loadColors();
  }

  async function logout() {
    await signOut(auth);
    window.location.href = "/admin";
  }

  useEffect(() => {
    loadColors();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf8f4] p-8">

      <div className="flex justify-between items-center mb-10">

        <h1
          className="text-6xl"
          style={{
            fontFamily: "'Brush Script MT', cursive",
          }}
        >
          Colour Manager
        </h1>

        <button
          onClick={logout}
          className="
            bg-red-500
            text-white
            px-5
            py-3
            rounded-xl
            shadow-lg
          "
        >
          Logout
        </button>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-xl mx-auto">

        <h2 className="text-2xl font-semibold mb-5">
          Add New Colour
        </h2>

        <input
          placeholder="Colour Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Pick Colour
          </label>

          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-24 h-14 rounded-lg cursor-pointer"
          />
        </div>

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full border p-3 rounded-xl mb-5"
        />

        <button
          onClick={addColor}
          className="bg-[#8b6b61] text-white px-6 py-3 rounded-xl"
        >
          Add Colour
        </button>

      </div>

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">

        {colors.map((color) => (
          <div
            key={color.id}
            className="bg-white p-6 rounded-3xl shadow-lg text-center"
          >
            <div
              className="w-24 h-24 rounded-xl mx-auto border"
              style={{
                backgroundColor: color.hex,
              }}
            />

            <h3 className="mt-4 text-xl font-semibold">
              {color.name}
            </h3>

            <p className="text-gray-600 mt-1">
              Stock: {color.stock}
            </p>

            <div className="flex justify-center gap-2 mt-5">

              <button
                onClick={() => {
                  setEditingId(color.id);
                  setEditingName(color.name);
                  setEditingHex(color.hex);
                  setEditingStock(color.stock);
                }}
                className="bg-[#8b6b61] text-white px-4 py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => deleteColor(color.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-3xl w-[420px] shadow-2xl">

            <h2 className="text-2xl font-bold mb-5">
              Edit Colour
            </h2>

            <input
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Pick Colour
              </label>

              <input
                type="color"
                value={editingHex}
                onChange={(e) => setEditingHex(e.target.value)}
                className="w-24 h-14"
              />
            </div>

            <input
              type="number"
              value={editingStock}
              onChange={(e) => setEditingStock(Number(e.target.value))}
              className="w-full border p-3 rounded-xl mb-5"
            />

            <div className="flex gap-3">

              <button
                onClick={saveEdit}
                className="bg-[#8b6b61] text-white px-5 py-3 rounded-xl"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditingId("")}
                className="bg-gray-300 px-5 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}