import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "homePhoto",
      title: "Home Page Photo",
      type: "image",
      options: { hotspot: true },
      description: "The photo shown in the 'Meet Francesca' section on the home page",
    }),
    defineField({
      name: "bio",
      title: "Bio (About Page)",
      type: "array",
      of: [{ type: "block" }],
      description: "Your bio text for the About page — the 'My Story' section",
    }),
    defineField({
      name: "homeBio",
      title: "Bio (Home Page)",
      type: "array",
      of: [{ type: "block" }],
      description: "Shorter bio text for the 'Meet Francesca' section on the home page",
    }),
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
      name: "storyTitle",
      title: "Story Section Title",
      type: "string",
    }),
    defineField({
      name: "approachSubtitle",
      title: "Approach Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "approachTitle",
      title: "Approach Section Title",
      type: "string",
    }),
    defineField({
      name: "approachSteps",
      title: "Approach Steps",
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
      name: "funFactsTitle",
      title: "Fun Facts Title",
      type: "string",
    }),
    defineField({
      name: "funFacts",
      title: "Fun Facts",
      type: "array",
      of: [{ type: "string" }],
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
