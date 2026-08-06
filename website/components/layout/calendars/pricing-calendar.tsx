"use client";

import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { isWeekend } from "date-fns";

function countWorkdays(from: Date, to: Date): number {
  let count = 0;
  const current = new Date(from);
  const end = new Date(to);
  while (current <= end) {
    if (!isWeekend(current)) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

interface PricingCalendarProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  pricePerDay?: number;
}

export function PricingCalendar({
  value,
  onChange,
  pricePerDay = 67,
}: PricingCalendarProps) {
  const workdays = value?.from && value?.to ? countWorkdays(value.from, value.to) : 0;
  const totalPrice = workdays * pricePerDay;

  return (
    <div className="overflow-hidden rounded-lg border border-(--outline) bg-(--card)/50 backdrop-blur-sm">
      <div className="p-2">
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          disabled={(date) => isWeekend(date)}
          className="w-full [&_.rdp-month]:w-full"
        />
      </div>
      {/* Price bar - directly attached, no extra margin */}
      <div className="flex items-center justify-between gap-2 border-t border-(--outline) bg-(--bg)/50 px-4 py-3">
        <div>
          <p className="text-body-5 text-(--on-bg-low)">Workdays</p>
          <p className="text-display-4 text-(--on-bg-high)">{workdays}</p>
        </div>
        <div className="text-right">
          <p className="text-body-5 text-(--on-bg-low)">Est. price</p>
          <p className="text-display-4 text-(--on-bg-high)">${totalPrice.toLocaleString()}</p>
          <p className="text-body-6 text-(--on-bg-low)">(${pricePerDay}/day)</p>
        </div>
      </div>
    </div>
  );
}