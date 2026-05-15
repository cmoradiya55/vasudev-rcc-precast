"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Mail,
  Phone,
  Info,
  BarChart2,
  Share2,
  Cookie,
  Lock,
  ExternalLink,
  UserCheck,
  Baby,
  RefreshCw,
  MessageCircle,
  CheckCircle2,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import privacyData from "../../data/privacyData.json";
import SectionCard from "../../components/SectionCard";
interface PrivacySection {
  id: string;
  title: string;
  icon: string;
  text?: string;
  items?: string[];
  footer?: string;
  email?: string;
  phone?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Info: Info,
  BarChart2: BarChart2,
  Share2: Share2,
  Cookie: Cookie,
  Lock: Lock,
  ExternalLink: ExternalLink,
  UserCheck: UserCheck,
  Baby: Baby,
  RefreshCw: RefreshCw,
  MessageCircle: MessageCircle,
};

const BulletItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 group">
    <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
    <span className="text-gray-600 leading-relaxed">{text}</span>
  </li>
);

const Privacy = () => {
  const { content } = privacyData as { content: Record<string, unknown> };
  const sections = Object.entries(content)
    .filter(([key]) => key !== "intro")
    .map(([key, value]) => {
      const section = value as PrivacySection;
      return {
        id: key,
        title: section.title,
        icon: section.icon,
      };
    });

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Banner — unchanged layout, adjusted padding for mobile */}
      <section className="relative bg-gray-950 pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.25] bg-[url('/logo.webp')] bg-no-repeat bg-center bg-[length:320px] lg:bg-[length:420px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-semibold uppercase">
              Legal
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed"
          >
            Your privacy matters to us. This policy explains what data we
            collect, how we use it, and the choices you have.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="mt-6 text-[10px] md:text-xs text-gray-500 font-medium tracking-wide"
          >
            Last updated: May 2025
          </motion.p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Sticky Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-72 shrink-0 pt-8 lg:py-12"
            >
              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-blue-200 mb-0.5">
                      Contents
                    </p>
                    <h2 className="text-white text-sm font-semibold">
                      On this page
                    </h2>
                  </div>
                  <nav className="p-2 lg:p-3 flex flex-wrap lg:flex-col gap-1 lg:gap-0.5">
                    {sections.map((s) => {
                      const Icon = iconMap[s.icon] || ChevronRight;
                      return (
                        <Link
                          key={s.id}
                          href={`#${s.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl group hover:bg-blue-50 transition-all min-w-[140px] lg:min-w-0"
                        >
                          <span className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors">
                            <Icon className="w-3 h-3 text-blue-500 group-hover:text-white transition-colors" />
                          </span>
                          <span className="text-[12px] lg:text-[13px] text-gray-500 group-hover:text-blue-600 font-medium transition-colors flex-1">
                            {s.title}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Side trust badge — hidden on mobile to save space */}
                <div className="hidden lg:flex mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 items-start gap-3">
                  <Lock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-[12px] text-blue-700 leading-relaxed">
                    We never sell your personal data to third parties.
                  </p>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <article className="flex-1 max-w-3xl pb-12 lg:py-12 space-y-6 text-[14px] lg:text-[15px]">
              {/* Intro callout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-l-2xl" />
                <ShieldCheck className="w-6 h-6 text-blue-500 mb-3" />
                <p className="text-gray-700 leading-relaxed">
                  {content.intro as string}
                </p>
              </motion.div>

              {/* Sections from JSON */}
              {sections.map((s) => {
                const sectionContent = content[s.id] as PrivacySection;
                const Icon = iconMap[s.icon] || Info;

                return (
                  <SectionCard key={s.id} id={s.id} title={s.title} icon={Icon}>
                    <div className="space-y-4">
                      {sectionContent.text && (
                        <p className="text-gray-600 leading-relaxed">
                          {sectionContent.text}
                        </p>
                      )}

                      {sectionContent.items && (
                        <ul className="mt-4 space-y-2">
                          {sectionContent.items.map((item: string) => (
                            <BulletItem key={item} text={item} />
                          ))}
                        </ul>
                      )}

                      {sectionContent.footer && (
                        <p className="mt-4 text-gray-600 leading-relaxed">
                          {sectionContent.footer}
                        </p>
                      )}

                      {/* Special handling for contact section */}
                      {s.id === "contact" && (
                        <div className="mt-6 grid sm:grid-cols-2 gap-4">
                          <Link
                            href={`mailto:${sectionContent.email || ""}`}
                            className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-200 shrink-0">
                              <Mail className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">
                                Email
                              </p>
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all">
                                {process.env.NEXT_PUBLIC_EMAIL}
                              </p>
                            </div>
                          </Link>
                          <Link
                            href={`tel:${sectionContent.phone?.replace(/ /g, "") || ""}`}
                            className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-200 shrink-0">
                              <Phone className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">
                                Phone
                              </p>
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {process.env.NEXT_PUBLIC_PHONE_NUMBER_01}
                              </p>
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </SectionCard>
                );
              })}

              {/* Footer nav */}
              <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  Back to Home
                </Link>
                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white hover:shadow-lg transition-all group"
                >
                  <FileText className="w-4 h-4" />
                  View Terms &amp; Conditions
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
