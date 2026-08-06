"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PricingCalendar } from "@/components/layout/calendars/pricing-calendar";
import { KeyboardArrowDownIcon, CheckCircleIcon } from "@/components/icons";

// Tech options - flattened for fast filtering
const techOptions = [
  { label: "React", group: "Frontend" },
  { label: "Next.js", group: "Frontend" },
  { label: "Vue", group: "Frontend" },
  { label: "Svelte", group: "Frontend" },
  { label: "Angular", group: "Frontend" },
  { label: "Solid", group: "Frontend" },
  { label: "Qwik", group: "Frontend" },
  { label: "Tailwind CSS", group: "Frontend" },
  { label: "Shadcn UI", group: "Frontend" },
  { label: "Node.js", group: "Backend" },
  { label: "Python", group: "Backend" },
  { label: "Go", group: "Backend" },
  { label: "Rust", group: "Backend" },
  { label: "Java", group: "Backend" },
  { label: "Spring Boot", group: "Backend" },
  { label: "Django", group: "Backend" },
  { label: "FastAPI", group: "Backend" },
  { label: "Docker", group: "DevOps" },
  { label: "Kubernetes", group: "DevOps" },
  { label: "Terraform", group: "DevOps" },
  { label: "AWS", group: "DevOps" },
  { label: "GCP", group: "DevOps" },
  { label: "Azure", group: "DevOps" },
  { label: "Ansible", group: "DevOps" },
  { label: "Jenkins", group: "DevOps" },
];

const countries = [
  { code: "us", label: "United States" },
  { code: "gb", label: "United Kingdom" },
  { code: "de", label: "Germany" },
  { code: "fr", label: "France" },
  { code: "jp", label: "Japan" },
  { code: "cn", label: "China" },
  { code: "au", label: "Australia" },
  { code: "ca", label: "Canada" },
];

const defaultDateRange = {
  from: new Date(),
  to: addDays(new Date(), 7),
};

// Memoized calendar to prevent re-renders
const MemoizedPricingCalendar = memo(PricingCalendar);

export default function SupportCostForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [country, setCountry] = useState(countries[0]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const basePricePerDay = 67;
  const extraPerTech = 12;

  // Memoize price calculation
  const pricePerDay = useMemo(
    () => basePricePerDay + selectedTechs.length * extraPerTech,
    [selectedTechs.length]
  );

  // Memoize handlers
  const handleReset = useCallback(() => {
    setName("");
    setEmail("");
    setSelectedTechs([]);
    setCountry(countries[0]);
    setDateRange(defaultDateRange);
  }, []);

  const handleSubmit = useCallback(() => {
    // Here you'd normally send the data to an API
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  // Memoize country list to avoid re-renders
  const countryItems = useMemo(() => countries, []);

  // Memoize tech list - already flat
  const techItems = useMemo(() => techOptions, []);

  return (
    <>
      <Card className="relative overflow-hidden p-6 border-(--outline) bg-(--card) shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-display-4 text-(--on-bg-high)">Tech Support Estimate</h3>
            <Badge variant="glass-static" size="chip-small">Quote</Badge>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-body-4">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1 bg-(--card)/50 backdrop-blur-sm"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-body-4">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-1 bg-(--card)/50 backdrop-blur-sm"
              />
            </div>

            {/* Tech Stack - now with fast filtering */}
            <div>
              <Label className="text-body-4 block mb-1.5">Tech Stack</Label>
              <Combobox
                value={selectedTechs}
                onValueChange={(value) => setSelectedTechs(value as string[])}
                multiple
                items={techItems}
              >
                <ComboboxChips className="bg-(--card)/50 backdrop-blur-sm min-h-10">
                  {selectedTechs.map((tech) => (
                    <ComboboxChip key={tech}>{tech}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Search technologies..." className="bg-transparent" />
                </ComboboxChips>
                <ComboboxContent>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.label} value={item.label}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {selectedTechs.length > 0 && (
                <p className="text-body-6 text-(--on-bg-low) mt-1.5">
                  {selectedTechs.length} tech{selectedTechs.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            {/* Date Range - memoized */}
            <div>
              <Label className="text-body-4 block mb-1.5">Select Date Range</Label>
              <MemoizedPricingCalendar
                value={dateRange}
                onChange={setDateRange}
                pricePerDay={pricePerDay}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="glass" size="medium" className="flex-1" onClick={handleSubmit}>
              <CheckCircleIcon className="size-4" /> Request Quote
            </Button>
            <Button variant="outlined" size="medium" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 duration-200 rounded-2xl border border-(--outline) shadow-2xl bg-(--card) max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-2">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                ✓
              </div>
            </div>
            <DialogTitle className="text-center text-display-3 text-(--on-bg-high)">
              Just a Dialog
            </DialogTitle>
            <DialogDescription className="text-center text-body-2 text-(--on-bg-medium) max-w-sm mx-auto">
              Check other features too!)
              <br />
              <span className="text-body-5 text-(--on-bg-low) mt-2 block">
                Click outside or press Esc to close.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center sm:justify-center">
            <Button onClick={handleDialogClose} variant="filled" className="min-w-[120px]">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}