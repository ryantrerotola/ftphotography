"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import CalendarGrid, { formatDateLong } from "@/components/CalendarGrid";
import type { BookingException } from "@/components/CalendarGrid";

interface PackageInfo {
  name: string;
  price: string;
  duration: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pkg: PackageInfo | null;
  availableDays: number[];
  weeksOut: number;
  exceptions: BookingException[];
}

export default function BookingModal({
  isOpen,
  onClose,
  pkg,
  availableDays,
  weeksOut,
  exceptions,
}: Props) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Reset date when modal opens with a new package
  useEffect(() => {
    if (isOpen) setSelectedDate(null);
  }, [isOpen, pkg?.name]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !pkg) return null;

  function handleContinue() {
    const params = new URLSearchParams();
    params.set("package", pkg!.name);
    if (selectedDate) params.set("date", selectedDate);
    router.push(`/contact?${params.toString()}`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-warm-400 hover:text-warm-700 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Package summary */}
        <div className="text-center mb-8">
          <p className="text-warm-500 text-xs tracking-widest uppercase mb-2">
            Selected Package
          </p>
          <h2 className="font-heading text-2xl text-warm-900">
            {pkg.name}
          </h2>
          <p className="text-warm-600 text-sm mt-1">
            {pkg.duration} &middot; {pkg.price}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-warm-200 mb-8" />

        {/* Calendar */}
        <p className="text-center text-warm-700 text-sm mb-6">
          Pick your preferred date
        </p>
        <CalendarGrid
          availableDays={availableDays}
          weeksOut={weeksOut}
          exceptions={exceptions}
          selectedDate={selectedDate}
          onSelectDate={(date) => setSelectedDate(date || null)}
        />

        {/* Selected date display */}
        {selectedDate && (
          <p className="text-center text-sage-700 text-sm mt-4 font-semibold">
            {formatDateLong(selectedDate)}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleContinue}
            disabled={!selectedDate}
            className="w-full bg-warm-700 text-warm-50 px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {selectedDate ? "Continue to Inquiry" : "Select a Date Above"}
          </button>
          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set("package", pkg!.name);
              router.push(`/contact?${params.toString()}`);
            }}
            className="w-full text-warm-500 text-xs tracking-widest uppercase hover:text-warm-700 transition-colors py-2"
          >
            Skip — I&apos;ll choose a date later
          </button>
        </div>
      </div>
    </div>
  );
}
