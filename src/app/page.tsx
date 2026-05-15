"use client";
import { useEffect } from "react";
import Hero from "../components/HomePageComponent/Hero";
import PhotoGallery from "../components/HomePageComponent/PhotoGallery";
import AboutUs from "../components/HomePageComponent/AboutUs";
import Product from "../components/HomePageComponent/product";
import Contact from "../components/HomePageComponent/Contact";
import Testimonial from "../components/HomePageComponent/Testimonial";

export default function Home() {
  useEffect(() => {
    document.querySelectorAll("nav a").forEach((anchor) => {
      anchor.addEventListener("click", handleScroll);
    });

    return () => {
      document.querySelectorAll("nav a").forEach((anchor) => {
        anchor.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  const handleScroll = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target && target.getAttribute("href")) {
      const targetId = target.getAttribute("href")?.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="text-black">
      {/* Hero Section */}
      <Hero />

      {/* Photo Gallery Section */}
      <section
        id="gallery"
        className="flex flex-col bg-white py-16 text-center"
      >
        <PhotoGallery />
      </section>

      {/* Products Section */}
      <section id="products" className="bg-gray-100">
        <Product />
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="flex flex-col bg-gray-300 text-center"
      >
        <Testimonial />
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-12 md:py-16">
        <AboutUs />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
