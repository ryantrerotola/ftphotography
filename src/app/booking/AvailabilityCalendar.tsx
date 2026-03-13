"use client";

import { useState } from "react";
import Link from "next/link";

interface BookingDate {
  _id: string;
  date: string;
  status: "available" | "booked" | "hold";
  note?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatMonthYear(year: number, month: number) {
  return new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function AvailabilityCalendar({
  bookingDates,
}: {
  bookingDates: BookingDate[];
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<BookingDate | null>(null);

  const dateMap = new Map<string, BookingDate>();
  for (const bd of bookingDates) {
    dateMap.set(bd.date, bd);
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  }

  const todayKey = formatDateKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Don't allow navigating before current month
  const canGoPrev =
    currentYear > today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  return (
    <div className="max-w-lg mx-auto">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 text-warm-600 hover:text-warm-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-heading text-2xl text-warm-900">
          {formatMonthYear(currentYear, currentMonth)}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 text-warm-600 hover:text-warm-900 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs text-warm-500 tracking-wider uppercase py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the 1st */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const key = formatDateKey(currentYear, currentMonth, day);
          const booking = dateMap.get(key);
          const isPast = key < todayKey;
          const isToday = key === todayKey;
          const isAvailable = booking?.status === "available";
          const isBooked = booking?.status === "booked";
          const isHold = booking?.status === "hold";
          const isSelected = selectedDate?.date === key;

          let cellClass =
            "aspect-square flex items-center justify-center text-sm relative transition-all ";

          if (isPast) {
            cellClass += "text-warm-300 cursor-default";
          } else if (isAvailable) {
            cellClass +=
              "bg-sage-100 text-sage-800 cursor-pointer hover:bg-sage-200 font-semibold";
            if (isSelected) cellClass += " ring-2 ring-sage-500";
          } else if (isBooked) {
            cellClass += "bg-warm-200 text-warm-400 line-through cursor-default";
          } else if (isHold) {
            cellClass += "bg-warm-100 text-warm-500 cursor-default";
          } else {
            cellClass += "text-warm-600 cursor-default";
          }

          if (isToday) {
            cellClass += " font-bold";
          }

          return (
            <button
              key={key}
              onClick={() => {
                if (isAvailable && !isPast) {
                  setSelectedDate(isSelected ? null : booking);
                }
              }}
              disabled={!isAvailable || isPast}
              className={cellClass}
              title={
                isAvailable
                  ? `Available${booking.note ? ` — ${booking.note}` : ""}`
                  : isBooked
                    ? "Booked"
                    : isHold
                      ? "On hold"
                      : undefined
              }
            >
              {day}
              {isAvailable && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-sage-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-xs text-warm-600">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-sage-100 border border-sage-300 inline-block" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-warm-200 border border-warm-300 inline-block" />
          Booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-warm-100 border border-warm-300 inline-block" />
          Hold
        </span>
      </div>

      {/* Selected date action */}
      {selectedDate && (
        <div className="mt-8 bg-sage-50 border border-sage-200 p-6 text-center">
          <p className="text-warm-700 mb-1 text-sm">
            {new Date(selectedDate.date + "T12:00:00").toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </p>
          {selectedDate.note && (
            <p className="text-warm-500 text-xs mb-4">{selectedDate.note}</p>
          )}
          <Link
            href={`/contact?date=${encodeURIComponent(selectedDate.date)}`}
            className="inline-block bg-warm-700 text-warm-50 px-6 py-3 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
          >
            Request This Date
          </Link>
        </div>
      )}
    </div>
  );
}
