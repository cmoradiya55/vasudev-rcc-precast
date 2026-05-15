import { Metadata } from "next";
import Terms from "./Terms";

export const metadata: Metadata = {
  title: "Terms & Conditions - Vasudev Precast",
  description: "Terms & Conditions for Vasudev Precast",
  keywords: [
    "Terms & Conditions",
    "Vasudev Precast",
    "Terms and Conditions",
    "Vasudev Precast Terms and Conditions",
    "Terms and Conditions for Vasudev Precast",
    "Terms and Conditions for Vasudev Precast Binding Walls",
    "precast binding walls terms and conditions",
    "precast concrete retaining walls terms and conditions",
    "binding wall terms and conditions",
  ],
  authors: [{ name: "Vasudev Precast" }],
  creator: "Vasudev Precast",
  publisher: "Vasudev Precast",
  openGraph: {
    title: "Terms & Conditions - Vasudev Precast",
    description: "Terms & Conditions for Vasudev Precast",
    type: "website",
    url: "https://vasudevprecast.com/terms",
    siteName: "Vasudev Precast",
    images: [
      {
        url: "https://vasudevprecast.com/images/logo_full.png",
        width: 1200,
        height: 630,
        alt: "Vasudev Precast",
      },
    ],
  },
};

export default function TermsPage() {
  return <Terms />;
}
