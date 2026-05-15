"use client";

import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { XIcon } from "../Icon/XIcon";
import { FacebookIcon } from "../Icon/FacebookIcon";
import { LinkedinIcon } from "../Icon/LinkedinIcon";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 pt-16 border-t border-gray-200 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Company Details Column */}
          <div className="flex flex-col space-y-6 lg:col-span-1">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <div className="bg-gray-50 p-3 rounded-2xl inline-block border border-gray-200">
                <Image
                  src="/logo.webp"
                  alt="Vasudev Precast Logo"
                  width={120}
                  height={80}
                  className="h-10 w-auto object-contain opacity-90"
                />
              </div>
            </Link>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 tracking-wide">
                SHREE VASUDEV{" "}
                <span className="text-blue-500 block text-sm tracking-widest mt-1">
                  CEMENT PRODUCTS
                </span>
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Manufacturing premium RCC Readymade Precast Binding Walls
                engineered for durability, security, and quick installation.
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              <Link
                target="_blank"
                href="https://www.facebook.com"
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-none bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white hover:border-gray-900 transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </Link>
              <Link
                target="_blank"
                href="https://x.com"
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-none bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white hover:border-gray-900 transition-all"
              >
                <XIcon className="w-4 h-4" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com"
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-none bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white hover:border-gray-900 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-gray-900 font-bold uppercase text-sm relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-3 mt-4">
              {["About Us", "Products", "Testimonials", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 group text-gray-900 transition-colors text-sm hover:text-blue-500 hover:underline"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-500 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{item}</span>
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Legal Links Column */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-gray-900 font-bold uppercase text-sm relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
              Legal Info
            </h4>
            <div className="flex flex-col space-y-3 mt-4">
              <Link
                href="/privacy"
                className="text-gray-900 transition-colors text-sm flex items-center gap-2 group hover:text-blue-500 hover:underline"
              >
                <ChevronRight className="w-3 h-3 text-gray-500 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-900 transition-colors text-sm flex items-center gap-2 group hover:text-blue-500 hover:underline"
              >
                <ChevronRight className="w-3 h-3 text-gray-500 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-gray-900 font-bold uppercase text-sm relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
              Reach Us
            </h4>
            <div className="flex flex-col space-y-4 text-sm mt-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
                <p className="leading-relaxed text-gray-600">
                  NH 8, Surat-Bharuch Highway,
                  <br />
                  Near Pipodra Flyover Bridge,
                  <br />
                  Surat, Gujarat, India - 394110
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                <div className="flex flex-col">
                  <Link
                    href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER_01}`}
                    className="text-gray-900 transition-colors hover:text-blue-500 hover:underline"
                  >
                    {/* +91 97265 93874 */}
                    {process.env.NEXT_PUBLIC_PHONE_NUMBER_01}
                  </Link>
                  <Link
                    href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER_02}`}
                    className="text-gray-900 transition-colors hover:text-blue-500 hover:underline"
                  >
                    {/* +91 90330 50390 */}
                    {process.env.NEXT_PUBLIC_PHONE_NUMBER_02}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="text-gray-900 transition-colors hover:text-blue-500 hover:underline break-all"
                >
                  {process.env.NEXT_PUBLIC_EMAIL}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Copyright Bar */}
      <div className="py-8 bg-gray-200 border-t border-gray-200 gap-4">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p
            className="text-xs text-gray-500 font-medium"
            suppressHydrationWarning
          >
            &copy; {new Date().getFullYear()} Shree Vasudev Cement Products. All
            rights reserved.
          </p>
          <p className="text-xs text-gray-500 font-medium">
            Designed for{" "}
            <span className="text-gray-900">Strength & Durability</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
