import Privacy from "./Privacy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Shree Vasudev Cement Products",
  description: "Privacy Policy of Shree Vasudev Cement Products",
  keywords: [
    "Privacy Policy",
    "Shree Vasudev Cement Products",
    "Vasudev Precast",
    "precast binding walls privacy policy",
    "precast concrete retaining walls privacy policy",
    "binding wall privacy policy",
    "precast retaining walls privacy policy",
    "binding walls privacy policy",
  ],
  authors: [{ name: "Shree Vasudev Cement Products" }],
  creator: "Shree Vasudev Cement Products",
  publisher: "Shree Vasudev Cement Products",
  openGraph: {
    title: "Privacy Policy | Shree Vasudev Cement Products",
    description: "Privacy Policy of Shree Vasudev Cement Products",
    type: "website",
    url: "https://vasudevprecast.com/privacy",
    siteName: "Shree Vasudev Cement Products",
    images: [
      {
        url: "https://vasudevprecast.com/logo_full.png",
        width: 1200,
        height: 630,
        alt: "Shree Vasudev Cement Products",
      },
    ],
  },
};

export default function PrivacyPage() {
  return <Privacy />;
}
