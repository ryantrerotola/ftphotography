import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services & Pricing Page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "portraitSectionTitle",
      title: "Portrait Section Title",
      type: "string",
    }),
    defineField({
      name: "portraitSectionSubtitle",
      title: "Portrait Section Subtitle",
      type: "string",
      description: "e.g., 'Families • Seniors • Headshots • Couples • Pets • Maternity'",
    }),
    defineField({
      name: "portraitPackages",
      title: "Portrait Packages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Package Name", type: "string" },
            { name: "price", title: "Price", type: "string", description: "e.g., '$250'" },
            { name: "duration", title: "Duration", type: "string", description: "e.g., '30 minutes'" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "popular", title: "Most Popular?", type: "boolean", initialValue: false },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "weddingSectionTitle",
      title: "Wedding Section Title",
      type: "string",
    }),
    defineField({
      name: "weddingSectionSubtitle",
      title: "Wedding Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "weddingPackages",
      title: "Wedding Packages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Package Name", type: "string" },
            { name: "price", title: "Price", type: "string" },
            { name: "duration", title: "Duration", type: "string" },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "addOns",
      title: "Add-Ons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "price", title: "Price", type: "string" },
          ],
        },
      ],
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
