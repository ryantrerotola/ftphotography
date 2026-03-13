"use client";

import { useState } from "react";

export interface BookingException {
  _id: string;
  date: string;
  type: "booked" | "unavailable" | "hold" | "available";
  note?: string;
}

export interface CalendarProps {
  availableDays: number[];
  weeksOut: number;
  exceptions: BookingException[];
  selectedDate: string | null;
  onSelectDate: (date: string, note?: string) => void;
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

export default function CalendarGrid({
  availableDays,
  weeksOut,
  exceptions,
  selectedDate,
  onSelectDate,
}: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const exceptionMap = new Map<string, BookingException>();
  for (const ex of exceptions) {
    exceptionMap.set(ex.date, ex);
  }

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + weeksOut * 7);
  const maxDateKey = formatDateKey(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  const canGoPrev =
    currentYear > today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  const canGoNext =
    currentYear < maxDate.getFullYear() ||
    (currentYear === maxDate.getFullYear() && currentMonth < maxDate.getMonth());

  function getDateStatus(key: string, dayOfWeek: number) {
    if (key < todayKey || key > maxDateKey) return "inactive";
    const exception = exceptionMap.get(key);
    if (exception) {
      if (exception.type === "booked") return "booked";
      if (exception.type === "unavailable") return "unavailable";
      if (exception.type === "hold") return "hold";
      if (exception.type === "available") return "available";
    }
    if (availableDays.includes(dayOfWeek)) return "available";
    return "inactive";
  }

  return (
    <div>
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
          disabled={!canGoNext}
          className="p-2 text-warm-600 hover:text-warm-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
          <div key={d} className="text-center text-xs text-warm-500 tracking-wider uppercase py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const key = formatDateKey(currentYear, currentMonth, day);
          const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
          const status = getDateStatus(key, dayOfWeek);
          const exception = exceptionMap.get(key);
          const isSelected = selectedDate === key;
          const isToday = key === todayKey;

          let cellClass =
            "aspect-square flex items-center justify-center text-sm relative transition-all ";

          switch (status) {
            case "available":
              cellClass += "bg-sage-100 text-sage-800 cursor-pointer hover:bg-sage-200 font-semibold";
              if (isSelected) cellClass += " ring-2 ring-sage-500";
              break;
            case "booked":
              cellClass += "bg-warm-200 text-warm-400 line-through cursor-default";
              break;
            case "hold":
              cellClass += "bg-warm-100 text-warm-500 cursor-default";
              break;
            case "unavailable":
              cellClass += "text-warm-300 cursor-default";
              break;
            default:
              cellClass += "text-warm-400 cursor-default";
          }

          if (isToday) cellClass += " font-bold";

          return (
            <button
              key={key}
              onClick={() => {
                if (status === "available") {
                  onSelectDate(isSelected ? "" : key, exception?.note);
                }
              }}
              disabled={status !== "available"}
              className={cellClass}
              title={
                status === "available"
                  ? `Available${exception?.note ? ` — ${exception.note}` : ""}`
                  : status === "booked"
                    ? "Booked"
                    : status === "hold"
                      ? "On hold"
                      : undefined
              }
            >
              {day}
              {status === "available" && (
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
    </div>
  );
}

export function formatDateLong(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
