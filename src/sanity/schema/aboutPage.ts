import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
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
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Your bio text for the About page",
    }),
  ],
});
