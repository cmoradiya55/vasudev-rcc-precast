"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, Phone, Mail, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "UAE" },
];

const CONTACT_INFO = [
  {
    icon: Phone,
    // text: "+91 97265 93874",
    text: process.env.NEXT_PUBLIC_PHONE_NUMBER_01,
    label: "Call Directly",
    href: "tel:" + process.env.NEXT_PUBLIC_PHONE_NUMBER_01,
  },
  {
    icon: Mail,
    text: process.env.NEXT_PUBLIC_EMAIL,
    label: "Email Us",
    href: "mailto:" + process.env.NEXT_PUBLIC_EMAIL,
  },
];

export default function Contact() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    contact: "",
    requirement: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (formData.contact.length !== 10)
      newErrors.contact = "Enter a valid 10-digit number";
    if (!formData.requirement.trim())
      newErrors.requirement = "Please describe your requirement";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsDropdownOpen(false);
    };
    if (isDropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const sanitized =
      name === "contact" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData({ ...formData, [name]: sanitized });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    console.log("formData", formData);
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        countryCode: "+91",
        contact: "",
        requirement: "",
      });
    }, 1500);
  };

  const inputClasses =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all";
  const labelClasses =
    "text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1";

  return (
    <section
      id="contact"
      className="w-full bg-gray-100 py-12 md:py-16 relative overflow-hidden"
    >
      {/* Bg Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 bg-cyan-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-3">
              Contact Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Let&apos;s Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Exceptional
              </span>{" "}
              Together
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 p-8 md:p-10 rounded-[2.5rem] shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className={labelClasses}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Patel"
                      className={cn(
                        inputClasses,
                        errors.name && "border-red-400 focus:ring-red-400",
                      )}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 font-bold ml-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-2">
                    <label className={labelClasses}>Contact Number</label>
                    <div
                      className={cn(
                        "relative flex items-center rounded-xl transition-all",
                        errors.contact ? "ring-1 ring-red-400" : "",
                      )}
                      ref={dropdownRef}
                    >
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="absolute left-4 flex items-center gap-1 border-r border-gray-200 pr-1 cursor-pointer z-10"
                      >
                        <span className="text-gray-400 text-sm font-bold">
                          {formData.countryCode}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 text-gray-400 transition-transform",
                            isDropdownOpen && "rotate-180",
                          )}
                        />
                      </div>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            className="absolute left-0 top-[calc(100%+8px)] w-40 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl z-50 p-2"
                          >
                            {COUNTRY_CODES.map((item) => (
                              <button
                                key={item.code}
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    countryCode: item.code,
                                  });
                                  setIsDropdownOpen(false);
                                  if (errors.countryCode)
                                    setErrors((prev) => {
                                      const n = { ...prev };
                                      delete n.countryCode;
                                      return n;
                                    });
                                }}
                                className={cn(
                                  "w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-sm transition-all",
                                  formData.countryCode === item.code
                                    ? "bg-gray-100 text-black"
                                    : "hover:bg-gray-50 text-gray-600",
                                )}
                              >
                                <span className="font-bold">{item.code}</span>
                                <span className="text-[10px] text-gray-400">
                                  {item.label}
                                </span>
                                {formData.countryCode === item.code && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-800" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="90000 00000"
                        className={cn(
                          inputClasses,
                          "pl-[70px]",
                          errors.contact && "border-red-400 focus:ring-red-400",
                        )}
                      />
                    </div>
                    {errors.contact && (
                      <p className="text-[10px] text-red-500 font-bold ml-1">
                        {errors.contact}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Your Requirements</label>
                  <textarea
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Size, location, and wall type..."
                    className={cn(
                      inputClasses,
                      "resize-none",
                      errors.requirement && "border-red-400 focus:ring-red-400",
                    )}
                  />
                  {errors.requirement && (
                    <p className="text-[10px] text-red-500 font-bold ml-1">
                      {errors.requirement}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Inquiry
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 py-3 rounded-xl border border-green-100">
                    <CheckCircle2 className="w-5 h-5" />
                    <p className="text-sm font-bold">Inquiry received!</p>
                  </div>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_INFO.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="bg-white border border-gray-100 rounded-[2rem] p-4 flex flex-col items-center text-center hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-gray-50 border border-gray-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="text-gray-900 font-bold tracking-tight break-all">
                      {item.text}
                    </p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="relative w-full flex-grow min-h-[250px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4006.19117396734!2d72.95940800000001!3d21.3549336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0389cdd9a8731%3A0x9c74f3836a443dd0!2sVasudev%20Precast%20Wall!5e1!3m2!1sen!2sin!4v1742651634825!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                ></iframe>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">
                    Factory Location
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
