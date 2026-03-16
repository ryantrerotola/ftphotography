import { defineField, defineType, defineArrayMember } from "sanity";

export const galleryCategory = defineType({
  name: "galleryCategory",
  title: "Gallery Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "The main image shown for this category on the portfolio page",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the portfolio page",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description:
        "Drag and drop to reorder. Click the + button to upload new photos.",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryPhoto",
          title: "Photo",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the image for accessibility",
            }),
            defineField({
              name: "featured",
              title: "Featured",
              type: "boolean",
              description:
                "Show this photo in the featured gallery on the portfolio page",
              initialValue: false,
            }),
            defineField({
              name: "date",
              title: "Date",
              type: "date",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
              featured: "featured",
            },
            prepare({ title, media, featured }) {
              return {
                title: title || "Untitled photo",
                subtitle: featured ? "Featured" : undefined,
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
