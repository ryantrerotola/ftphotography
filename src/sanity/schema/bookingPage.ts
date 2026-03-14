import { defineField, defineType } from "sanity";

export const bookingPage = defineType({
  name: "bookingPage",
  title: "Booking Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
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
      name: "steps",
      title: "How Booking Works Steps",
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
      name: "availabilityTitle",
      title: "Availability Section Title",
      type: "string",
    }),
    defineField({
      name: "availabilityNote",
      title: "Availability Note",
      type: "string",
      description: "Text below the title (e.g., 'Updated regularly — reach out to confirm specific dates')",
    }),
    defineField({
      name: "months",
      title: "Availability Months",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "month", title: "Month", type: "string", description: "e.g., 'April 2026'" },
            {
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Available", value: "available" },
                  { title: "Limited", value: "limited" },
                  { title: "Booked", value: "booked" },
                ],
              },
            },
            { name: "note", title: "Note", type: "string", description: "e.g., 'A few weekend slots remaining'" },
          ],
        },
      ],
    }),
    defineField({
      name: "availabilityFootnote",
      title: "Availability Footnote",
      type: "text",
      rows: 2,
      description: "Text below the calendar (e.g., 'Don\\'t see your preferred month?...')",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text", rows: 3 },
          ],
        },
      ],
    }),
  ],
});
