import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      description: "Small text above the main heading (e.g., 'Southern Maine Portrait & Lifestyle Photographer')",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main heading (e.g., 'Capturing Authentic Joy & Love')",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutSubtitle",
      title: "About Section Subtitle",
      type: "string",
      description: "e.g., 'Meet Francesca'",
    }),
    defineField({
      name: "aboutTitle",
      title: "About Section Title",
      type: "string",
      description: "e.g., 'A Mom, an Artist, & Your Biggest Fan'",
    }),
    defineField({
      name: "servicesSubtitle",
      title: "Services Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "servicesTitle",
      title: "Services Section Title",
      type: "string",
    }),
    defineField({
      name: "servicesDescription",
      title: "Services Section Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "services",
      title: "Services List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonialsSubtitle",
      title: "Testimonials Subtitle",
      type: "string",
    }),
    defineField({
      name: "testimonialsTitle",
      title: "Testimonials Title",
      type: "string",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 2,
    }),
  ],
});
