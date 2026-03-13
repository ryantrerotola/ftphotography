import { getContactPageContent } from "@/sanity/queries";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pageContent: any = null;

  try {
    pageContent = await getContactPageContent();
  } catch {
    // Sanity not configured yet
  }

  const content = {
    heroSubtitle: pageContent?.heroSubtitle || "Contact",
    heroTitle: pageContent?.heroTitle || "Let's Connect",
    heroDescription: pageContent?.heroDescription || "I'd love to hear from you! Whether you have questions, want to discuss a session, or are ready to book — fill out the form below and I'll get back to you within 24 hours.",
    location: pageContent?.location || "Cumberland, Maine",
    locationDetail: pageContent?.locationDetail || "Serving Southern Maine & New England",
    email: pageContent?.email || "hello@francescatrerotolaphotography.com",
    responseTime: pageContent?.responseTime || "I typically respond within 24 hours. During peak wedding season (May\u2013October), it may take a bit longer.",
    instagramUrl: pageContent?.instagramUrl || "https://www.instagram.com/francescatrerotolaphotography",
    facebookUrl: pageContent?.facebookUrl || "https://www.facebook.com/francescatrerotolaphotography",
    successTitle: pageContent?.successTitle || "Thank You!",
    successMessage: pageContent?.successMessage || "Your message has been sent. I'll be in touch within 24 hours. In the meantime, feel free to browse my portfolio!",
  };

  return <ContactForm content={content} />;
}
