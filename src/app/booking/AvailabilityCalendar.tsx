"use client";

import { useState } from "react";
import Link from "next/link";
import CalendarGrid, { formatDateLong } from "@/components/CalendarGrid";
import type { BookingException } from "@/components/CalendarGrid";

interface Props {
  availableDays: number[];
  weeksOut: number;
  exceptions: BookingException[];
  scheduleNote?: string;
}

export default function AvailabilityCalendar({
  availableDays,
  weeksOut,
  exceptions,
  scheduleNote,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | undefined>();

  return (
    <div className="max-w-lg mx-auto">
      {scheduleNote && (
        <p className="text-center text-warm-600 text-sm mb-6 italic">
          {scheduleNote}
        </p>
      )}

      <CalendarGrid
        availableDays={availableDays}
        weeksOut={weeksOut}
        exceptions={exceptions}
        selectedDate={selectedDate}
        onSelectDate={(date, note) => {
          setSelectedDate(date || null);
          setSelectedNote(note);
        }}
      />

      {selectedDate && (
        <div className="mt-8 bg-sage-50 border border-sage-200 p-6 text-center">
          <p className="text-warm-700 mb-1 text-sm">
            {formatDateLong(selectedDate)}
          </p>
          {selectedNote && (
            <p className="text-warm-500 text-xs mb-4">{selectedNote}</p>
          )}
          <Link
            href={`/contact?date=${encodeURIComponent(selectedDate)}`}
            className="inline-block bg-warm-700 text-warm-50 px-6 py-3 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
          >
            Request This Date
          </Link>
        </div>
      )}
    </div>
  );
}
