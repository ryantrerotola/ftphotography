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

// About page content
export async function getAboutContent() {
  return client.fetch(`
    *[_type == "aboutPage"][0] {
      headshot,
      homePhoto,
      bio
    }
  `);
}
