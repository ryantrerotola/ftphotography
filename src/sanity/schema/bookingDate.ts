import { defineField, defineType } from "sanity";

// Singleton: your recurring weekly availability pattern
export const bookingSchedule = defineType({
  name: "bookingSchedule",
  title: "Booking Schedule",
  type: "document",
  fields: [
    defineField({
      name: "availableDays",
      title: "Available Days of the Week",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sunday", value: "0" },
          { title: "Monday", value: "1" },
          { title: "Tuesday", value: "2" },
          { title: "Wednesday", value: "3" },
          { title: "Thursday", value: "4" },
          { title: "Friday", value: "5" },
          { title: "Saturday", value: "6" },
        ],
      },
      description: "Select the days of the week you're typically available for shoots",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "weeksOut",
      title: "How Far Out to Show Availability",
      type: "number",
      description: "Number of weeks into the future to display (e.g., 12 = ~3 months)",
      initialValue: 12,
      validation: (Rule) => Rule.required().min(1).max(52),
    }),
    defineField({
      name: "note",
      title: "Calendar Note",
      type: "string",
      description: "Optional note shown above the calendar (e.g., 'Peak season — book early!')",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Booking Schedule" };
    },
  },
});

// Individual exceptions to the weekly schedule
export const bookingException = defineType({
  name: "bookingException",
  title: "Booking Exception",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Exception Type",
      type: "string",
      options: {
        list: [
          { title: "Booked (client session)", value: "booked" },
          { title: "Unavailable (personal/vacation)", value: "unavailable" },
          { title: "Hold (tentative)", value: "hold" },
          { title: "Extra availability (normally off)", value: "available" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "Private — not shown to visitors",
      hidden: ({ parent }) =>
        parent?.type !== "booked" && parent?.type !== "hold",
    }),
    defineField({
      name: "note",
      title: "Public Note",
      type: "string",
      description: "Shown to visitors (e.g., 'Morning only'). Leave blank for no note.",
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
      type: "type",
      clientName: "clientName",
      note: "note",
    },
    prepare({ date, type, clientName, note }) {
      const labels: Record<string, string> = {
        booked: "Booked",
        unavailable: "Unavailable",
        hold: "Hold",
        available: "Extra Availability",
      };
      const subtitle = [labels[type] || type, clientName, note]
        .filter(Boolean)
        .join(" — ");
      return {
        title: date || "No date set",
        subtitle,
      };
    },
  },
});
