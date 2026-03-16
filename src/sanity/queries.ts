import { client } from "./client";

// Gallery Categories with image counts
export async function getGalleryCategories() {
  return client.fetch(`
    *[_type == "galleryCategory"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      coverImage,
      "count": count(images)
    }
  `);
}

// Gallery images by category slug (reads from embedded array)
export async function getGalleryImagesByCategory(categorySlug: string) {
  return client.fetch(
    `
    *[_type == "galleryCategory" && slug.current == $categorySlug][0].images[] {
      _key,
      title,
      "image": { "asset": asset, "hotspot": hotspot, "crop": crop },
      date
    }
  `,
    { categorySlug }
  );
}

// Featured gallery images (across all categories)
export async function getFeaturedImages() {
  return client.fetch(`
    *[_type == "galleryCategory"] | order(order asc) {
      "categoryTitle": title,
      "items": images[featured == true] {
        _key,
        title,
        "image": { "asset": asset, "hotspot": hotspot, "crop": crop },
        "category": ^.title
      }
    }.items[] | [0...8]
  `);
}

// Testimonials
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] | order(order asc) {
      _id,
      quote,
      clientName,
      sessionType,
      rating,
      googleReviewUrl
    }
  `);
}

// Lifestyle gallery images (all categories except weddings)
export async function getLifestyleImages() {
  return client.fetch(`
    *[_type == "galleryCategory" && slug.current != "weddings"] | order(order asc) {
      "categoryTitle": title,
      "categorySlug": slug.current,
      "items": images[] {
        _key,
        title,
        "image": { "asset": asset, "hotspot": hotspot, "crop": crop },
        "category": ^.title,
        "categorySlug": ^.slug.current
      }
    }.items[]
  `);
}

// Lifestyle categories (all except weddings)
export async function getLifestyleCategories() {
  return client.fetch(`
    *[_type == "galleryCategory" && slug.current != "weddings"] | order(order asc) {
      _id,
      title,
      "slug": slug.current
    }
  `);
}

// About page content
export async function getAboutContent() {
  return client.fetch(`
    *[_type == "aboutPage"][0] {
      heroImage,
      headshot,
      homePhoto,
      bio,
      homeBio,
      heroSubtitle,
      heroTitle,
      heroDescription,
      storyTitle,
      approachSubtitle,
      approachTitle,
      approachSteps[] { title, description },
      funFactsTitle,
      funFacts,
      ctaTitle,
      ctaDescription
    }
  `);
}

// Home page content
export async function getHomePageContent() {
  return client.fetch(`
    *[_type == "homePage"][0] {
      heroImage,
      heroSubtitle,
      heroTitle,
      heroDescription,
      aboutSubtitle,
      aboutTitle,
      servicesSubtitle,
      servicesTitle,
      servicesDescription,
      services[] { title, description },
      testimonialsSubtitle,
      testimonialsTitle,
      ctaTitle,
      ctaDescription
    }
  `);
}

// Services page content
export async function getServicesPageContent() {
  return client.fetch(`
    *[_type == "servicesPage"][0] {
      heroImage,
      heroSubtitle,
      heroTitle,
      heroDescription,
      portraitSectionTitle,
      portraitSectionSubtitle,
      portraitPackages[] { name, price, duration, description, popular, features },
      weddingSectionTitle,
      weddingSectionSubtitle,
      weddingPackages[] { name, price, duration, features },
      addOns[] { name, price },
      ctaTitle,
      ctaDescription
    }
  `);
}

// Booking schedule (weekly pattern)
export async function getBookingSchedule() {
  return client.fetch(`
    *[_type == "bookingSchedule"][0] {
      availableDays,
      weeksOut,
      note
    }
  `);
}

// Booking exceptions (booked dates, vacations, extra availability)
export async function getBookingExceptions() {
  return client.fetch(`
    *[_type == "bookingException" && date >= now()] | order(date asc) {
      _id,
      date,
      type,
      note
    }
  `);
}

// Booking page content
export async function getBookingPageContent() {
  return client.fetch(`
    *[_type == "bookingPage"][0] {
      heroImage,
      heroSubtitle,
      heroTitle,
      heroDescription,
      steps[] { title, description },
      availabilityTitle,
      availabilityNote,
      months[] { month, status, note },
      availabilityFootnote,
      faqs[] { question, answer }
    }
  `);
}

// Contact page content
export async function getContactPageContent() {
  return client.fetch(`
    *[_type == "contactPage"][0] {
      heroImage,
      heroSubtitle,
      heroTitle,
      heroDescription,
      location,
      locationDetail,
      email,
      responseTime,
      instagramUrl,
      successTitle,
      successMessage
    }
  `);
}

// Portfolio page content
export async function getPortfolioPageContent() {
  return client.fetch(`
    *[_type == "portfolioPage"][0] {
      heroImage,
      heroSubtitle,
      heroTitle,
      heroDescription,
      featuredSubtitle,
      featuredTitle,
      ctaTitle,
      ctaDescription
    }
  `);
}

// Blog page content
export async function getBlogPageContent() {
  return client.fetch(`
    *[_type == "blogPage"][0] {
      heroImage,
      heroSubtitle,
      heroTitle,
      heroDescription,
      newsletterTitle,
      newsletterDescription
    }
  `);
}
