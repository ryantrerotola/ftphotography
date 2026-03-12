"use client";

import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    preferredDate: "",
    message: "",
    howDidYouHear: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({
          name: "",
          email: "",
          phone: "",
          sessionType: "",
          preferredDate: "",
          message: "",
          howDidYouHear: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-500 tracking-[0.3em] uppercase text-sm mb-4">
            Contact
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-warm-900 mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            I&apos;d love to hear from you! Whether you have questions, want to
            discuss a session, or are ready to book — fill out the form below
            and I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Sidebar info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-lg text-warm-900 mb-2">
                  Location
                </h3>
                <p className="text-warm-600 text-sm">
                  Cumberland, Maine
                  <br />
                  Serving Southern Maine &amp; New England
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg text-warm-900 mb-2">
                  Email
                </h3>
                <a
                  href="mailto:hello@francescatrerotolaphotography.com"
                  className="text-warm-600 text-sm hover:text-warm-800 transition-colors"
                >
                  hello@francescatrerotolaphotography.com
                </a>
              </div>
              <div>
                <h3 className="font-heading text-lg text-warm-900 mb-2">
                  Response Time
                </h3>
                <p className="text-warm-600 text-sm">
                  I typically respond within 24 hours. During peak wedding
                  season (May–October), it may take a bit longer.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg text-warm-900 mb-2">
                  Follow Along
                </h3>
                <div className="flex gap-4 mt-2">
                  <a
                    href="https://www.instagram.com/francescatrerotolaphotography"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-500 hover:text-warm-700 transition-colors text-sm"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/francescatrerotolaphotography"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-500 hover:text-warm-700 transition-colors text-sm"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              {status === "sent" ? (
                <div className="bg-sage-50 p-12 text-center">
                  <h3 className="font-heading text-2xl text-warm-900 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-warm-600">
                    Your message has been sent. I&apos;ll be in touch within 24
                    hours. In the meantime, feel free to browse my{" "}
                    <a href="/portfolio" className="underline">
                      portfolio
                    </a>
                    !
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm text-warm-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-warm-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm text-warm-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sessionType"
                        className="block text-sm text-warm-700 mb-2"
                      >
                        Session Type *
                      </label>
                      <select
                        id="sessionType"
                        required
                        value={formData.sessionType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sessionType: e.target.value,
                          })
                        }
                        className="w-full border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent"
                      >
                        <option value="">Select a session type</option>
                        <option value="family">Family Portraits</option>
                        <option value="wedding">Wedding</option>
                        <option value="engagement">Engagement / Proposal</option>
                        <option value="senior">Senior Portraits</option>
                        <option value="headshot">Headshots</option>
                        <option value="pet">Pet Photography</option>
                        <option value="maternity">Maternity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-sm text-warm-700 mb-2"
                    >
                      Preferred Date(s)
                    </label>
                    <input
                      type="text"
                      id="preferredDate"
                      placeholder="e.g., Any Saturday in June, or June 15, 2026"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredDate: e.target.value,
                        })
                      }
                      className="w-full border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-warm-700 mb-2"
                    >
                      Tell Me About Your Vision *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="What are you looking for? Any special details, locations, or ideas you have in mind..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent resize-vertical"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="howDidYouHear"
                      className="block text-sm text-warm-700 mb-2"
                    >
                      How Did You Hear About Me?
                    </label>
                    <select
                      id="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          howDidYouHear: e.target.value,
                        })
                      }
                      className="w-full border border-warm-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent"
                    >
                      <option value="">Select one</option>
                      <option value="google">Google Search</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="referral">Friend / Family Referral</option>
                      <option value="wedding-wire">Wedding Wire</option>
                      <option value="the-knot">The Knot</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-warm-700 text-warm-50 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-600 text-sm text-center">
                      Something went wrong. Please try again or email me
                      directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
