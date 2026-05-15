"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, X, Menu } from "lucide-react";
import logo from "../../../public/logo.webp";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Use rAF-throttled scroll handler to avoid forced reflow
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Products", href: "/#products" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "About", href: "/#about" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        // Use scrollY instead of deprecated pageYOffset to avoid layout recalc
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      closeMenu();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-center px-2 sm:px-4 pt-4 pb-2 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-6xl rounded-full transition-all duration-500 flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-xl shadow-black/10 border border-white/20"
              : "bg-white shadow-md"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2 md:gap-3 group"
          >
            <Image
              src={logo}
              alt="Vasudev Precast Logo"
              width={48}
              height={36}
              className="w-10 h-7 md:w-12 md:h-9 object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="font-bold text-gray-800 tracking-tight text-lg md:text-xl">
              Vasudev Precast
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-[15px] font-medium text-gray-600 hover:text-blue-500 group transition-colors"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button / Contact */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 font-medium">
                Call Us Now
              </span>
              <span className="text-sm font-bold text-gray-800 leading-tight">
                {process.env.NEXT_PUBLIC_PHONE_NUMBER_01}
              </span>
            </div>
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all active:scale-95"
            >
              <Phone fill="currentColor" className="w-4 h-4" />
              <span>Let&apos;s Talk</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X strokeWidth={2} className="w-5 h-5" />
            ) : (
              <Menu strokeWidth={2} className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          <div className="pointer-events-auto mx-2 sm:mx-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-gray-100 overflow-hidden lg:hidden">
            <nav className="flex flex-col p-4 space-y-1">
              {[...navLinks, { name: "Contact", href: "/#contact" }].map(
                (link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3.5 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      closeMenu();
                    }}
                  >
                    {link.name}
                  </Link>
                ),
              )}
              <div className="pt-4 mt-2 border-t border-gray-100 px-4 pb-2">
                <div className="flex items-center gap-3 text-gray-800 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Phone fill="currentColor" className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                      Call Directly
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      +91-9726593874 / 9033050390
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 -z-10 lg:hidden"
            onClick={closeMenu}
          />
        </>
      )}
    </header>
  );
}
