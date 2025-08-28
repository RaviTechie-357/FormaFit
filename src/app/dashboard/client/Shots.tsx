'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import images from "../images.json";
import { motion, AnimatePresence } from "framer-motion";

export default function Shots() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-auto  flex flex-col md:flex-row items-center justify-center px-4 py-8 overflow-hidden">
      {/* Left Text */}
      <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[current].name + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-mono mb-4">{images[current].name}</h2>
            <p className="text-gray-600 font-sans  text-lg">{images[current].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[current].src}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              src={images[current].src}
              alt={images[current].name}
              width={600}
              height={400}
              className="rounded-xl shadow-xl object-cover w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
