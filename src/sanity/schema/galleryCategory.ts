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
        "Drag and drop to reorder. Select multiple files when uploading to bulk-add photos.",
      of: [
        defineArrayMember({
          type: "image",
          title: "Photo",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
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
