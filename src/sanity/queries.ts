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
      "count": count(*[_type == "galleryImage" && references(^._id)])
    }
  `);
}

// Gallery images by category slug
export async function getGalleryImagesByCategory(categorySlug: string) {
  return client.fetch(
    `
    *[_type == "galleryImage" && category->slug.current == $categorySlug] | order(order asc, date desc) {
      _id,
      title,
      image,
      date
    }
  `,
    { categorySlug }
  );
}

// Featured gallery images
export async function getFeaturedImages() {
  return client.fetch(`
    *[_type == "galleryImage" && featured == true] | order(order asc, date desc) [0...8] {
      _id,
      title,
      image,
      "category": category->title
    }
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
    *[_type == "galleryImage" && category->slug.current != "weddings"] | order(order asc, date desc) {
      _id,
      title,
      image,
      "category": category->title,
      "categorySlug": category->slug.current
    }
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

// Booking page content
export async function getBookingPageContent() {
  return client.fetch(`
    *[_type == "bookingPage"][0] {
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
      heroSubtitle,
      heroTitle,
      heroDescription,
      location,
      locationDetail,
      email,
      responseTime,
      instagramUrl,
      facebookUrl,
      successTitle,
      successMessage
    }
  `);
}

// Portfolio page content
export async function getPortfolioPageContent() {
  return client.fetch(`
    *[_type == "portfolioPage"][0] {
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
      heroSubtitle,
      heroTitle,
      heroDescription,
      newsletterTitle,
      newsletterDescription
    }
  `);
}
