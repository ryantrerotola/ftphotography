import { defineField, defineType } from "sanity";

export const bookingDate = defineType({
  name: "bookingDate",
  title: "Booking Date",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Booked", value: "booked" },
          { title: "Hold", value: "hold" },
        ],
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sessionType",
      title: "Session Type",
      type: "string",
      description: "Optional — what type of session is booked",
      hidden: ({ parent }) => parent?.status === "available",
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "string",
      description: "Optional note (e.g., 'Morning only', 'Smith family wedding')",
    }),
  ],
  orderings: [
    {
      title: "Date",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      date: "date",
      status: "status",
      note: "note",
    },
    prepare({ date, status, note }) {
      const statusLabel =
        status === "available" ? "Available" : status === "booked" ? "Booked" : "Hold";
      return {
        title: date || "No date set",
        subtitle: `${statusLabel}${note ? ` — ${note}` : ""}`,
      };
    },
  },
});
