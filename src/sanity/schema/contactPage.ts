import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
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
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., 'Cumberland, Maine'",
    }),
    defineField({
      name: "locationDetail",
      title: "Location Detail",
      type: "string",
      description: "e.g., 'Serving Southern Maine & New England'",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "responseTime",
      title: "Response Time Note",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "successTitle",
      title: "Form Success Title",
      type: "string",
      description: "Shown after form is submitted (e.g., 'Thank You!')",
    }),
    defineField({
      name: "successMessage",
      title: "Form Success Message",
      type: "text",
      rows: 2,
    }),
  ],
});
