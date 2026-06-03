"use client";


import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import WhatsappButton from "./components/WhatsappButton";

const images = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
];
interface ColorItem {
  id: string;
  name: string;
  hex: string;
  stock: number;
}



export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [colors, setColors] = useState<ColorItem[]>([]);
  useEffect(() => {
  async function loadColors() {
    const snapshot = await getDocs(collection(db, "colors"));

    const list: ColorItem[] = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...(docItem.data() as Omit<ColorItem, "id">),
    }));

    setColors(list);
  }

  loadColors();

  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);

  return (
    <main className="min-h-screen bg-[#faf8f4]">
     <p
  className="
    fixed
    bottom-24
    right-6
    z-50
    text-sm
    font-bold
    pointer-events-none
  "
  style={{
    color: "white",
    textShadow: `
      -1px -1px 0 #000,
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000
    `,
  }}
>
  Message us on WhatsApp to place your order
</p>
      <WhatsappButton />
      <a
  href="/admin"
  className="
    fixed
    bottom-6
    left-6
    z-50
    px-4
    py-3
    rounded-full
    bg-white/90
    shadow-lg
    text-sm
    font-semibold
    hover:scale-110
    transition
  "
>
  Admin
</a>

      <section className="relative h-screen overflow-hidden">

        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center 70px",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-white/20" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-4">

          <h1
            className="text-[6rem] md:text-[9rem] text-[#2f2f2f]"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              lineHeight: "0.9",
            }}
          >
            Scrunchies
          </h1>

          <p
            className="mt-1 max-w-4xl text-lg md:text-2xl text-[#4a4a4a]"
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            Soft, stylish scrunchies crafted to add a touch of charm to every day.
          </p>

          <p className="mt-2 text-3xl font-semibold text-[#2f2f2f]">
            LKR 80 Each
          </p>

          <div className="flex gap-4 mt-3 flex-wrap justify-center">

            <a
              href="#colors"
              className="
              px-8 py-3 rounded-full
              bg-[#8b6b61]
              text-white
              font-semibold
              shadow-lg
              hover:scale-105
              transition
              "
            >
              Available Colours
            </a>

            <a
              href="#gallery"
              className="
              px-8 py-3 rounded-full
              border-2 border-[#8b6b61]
              text-[#8b6b61]
              font-semibold
              bg-white/80
              shadow-lg
              hover:scale-105
              transition
              "
            >
              Sample Gallery
            </a>

          </div>
        </div>
      </section>

      <section
        id="colors"
        className="py-24 px-6 bg-white"
      >
        <h2
          className="text-center text-5xl mb-12"
          style={{
            fontFamily: "'Brush Script MT', cursive",
          }}
        >
          Available Colours
        </h2>
        <p
  className="text-center text-gray-600 max-w-3xl mx-auto mb-10"
>
  The available colours are shown below. Please refer to the Sample Gallery to view available texture and material options.
</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {[...colors]
  .sort((a, b) => b.stock - a.stock)
  .map((color) => (
            <div
  key={color.name}
  className="text-center"
>
              <div
                className="w-24 h-24 mx-auto rounded-xl border shadow-lg"
                style={{
                  backgroundColor: color.hex,
                }}
              />

              <p className="mt-3 font-semibold">
                {color.name}
              </p>
              

              {color.stock > 0 ? (
  <p className="text-gray-600">
    Stock: {color.stock}
  </p>
) : (
  <p className="text-red-500 font-semibold">
    Out of Stock
  </p>
)}

            </div>
          ))}

        </div>
      </section>

      <section
  id="gallery"
  className="py-24 px-6 bg-[#faf8f4]"
>
  <h2
    className="text-center text-5xl mb-12"
    style={{
      fontFamily: "'Brush Script MT', cursive",
    }}
  >
    Sample Gallery
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

    <img
      src="/hero/hero1.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero2.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero3.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero4.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero5.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero6.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero7.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero8.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero9.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

    <img
      src="/hero/hero10.jpg"
      alt="Scrunchie"
      className="rounded-2xl shadow-lg hover:scale-105 transition"
    />

  </div>
</section>
    </main>
  );
}