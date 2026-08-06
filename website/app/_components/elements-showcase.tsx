"use client";

import { useState } from "react";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Container } from "@/components/ui/container";
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
} from "@/components/ui/combobox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PricingCalendar } from "@/components/layout/calendars/pricing-calendar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  KeyboardArrowDownIcon,
  CheckCircleIcon,
  WarningIcon,
} from "@/components/icons";
import SupportCostForm from "./support-cost-form";

// Tech options grouped by category
const techOptions = [
  { label: "Frontend", options: ["React", "Next.js", "Vue", "Svelte", "Angular", "Solid", "Qwik", "Tailwind CSS", "Shadcn UI"] },
  { label: "Backend", options: ["Node.js", "Python", "Go", "Rust", "Java", "Spring Boot", "Django", "FastAPI"] },
  { label: "DevOps", options: ["Docker", "Kubernetes", "Terraform", "AWS", "GCP", "Azure", "Ansible", "Jenkins"] },
];

const allTechs = techOptions.flatMap((group) => group.options);

// ---------- Realistic mock data ----------
const componentGrowthData = [
  { month: "Jan", components: 12, downloads: 420, users: 80 },
  { month: "Feb", components: 18, downloads: 680, users: 140 },
  { month: "Mar", components: 24, downloads: 1100, users: 230 },
  { month: "Apr", components: 32, downloads: 1800, users: 380 },
  { month: "May", components: 40, downloads: 2800, users: 620 },
  { month: "Jun", components: 48, downloads: 4200, users: 1020 },
];

const telegramData = [
  { month: "Jan", subscribers: 120 },
  { month: "Feb", subscribers: 240 },
  { month: "Mar", subscribers: 380 },
  { month: "Apr", subscribers: 520 },
  { month: "May", subscribers: 780 },
  { month: "Jun", subscribers: 1284 },
];

const figmaViewsData = [
  { month: "Jan", views: 1200 },
  { month: "Feb", views: 2400 },
  { month: "Mar", views: 3800 },
  { month: "Apr", views: 5200 },
  { month: "May", views: 6800 },
  { month: "Jun", views: 8400 },
];

const techStackData = [
  { name: "React", value: 45 },
  { name: "Next.js", value: 30 },
  { name: "Vue", value: 12 },
  { name: "Svelte", value: 8 },
  { name: "Solid", value: 5 },
];

const COLORS = [
  "var(--primary)",
  "var(--brand-6)",
  "var(--brand-4)",
  "var(--brand-2)",
  "var(--brand-0)",
];

// Chart config for shadcn
const chartConfig = {
  components: { label: "Components", color: "var(--primary)" },
  downloads: { label: "Downloads", color: "var(--brand-6)" },
  users: { label: "Active Users", color: "var(--success)" },
  subscribers: { label: "Subscribers", color: "var(--primary)" },
  views: { label: "Views", color: "var(--brand-6)" },
};

export function ElementsShowcase() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // Calculate price: base $67/day + $12/day per selected tech
  const basePricePerDay = 67;
  const extraPerTech = 12;
  const pricePerDay = basePricePerDay + selectedTechs.length * extraPerTech;

  return (
    <section className="py-8 md:py-16 bg-(--bg)/30">
      <Container>
        <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-4">
          Components in Action
        </h2>
        <p className="text-body-2 text-(--on-bg-medium) mb-8 max-w-2xl">
          Interactive elements, data visualization, and form controls - all powered by Unidoka UI.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Card - updated */}
          <SupportCostForm />

          {/* Data & Stats Card - now with rich charts */}
          <Card className="relative overflow-hidden p-6 border-(--outline) bg-(--card-glass) backdrop-blur-glass shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <div className="relative z-10 space-y-6 max-h-[600px] overflow-y-auto pr-2">
              <div className="flex items-center justify-between sticky top-0 bg-(--card-glass)/80 backdrop-blur-sm py-2 z-10">
                <h3 className="text-display-4 text-(--on-bg-high)">Data Dashboard</h3>
                <Badge variant="glass-static" size="chip-small">Example</Badge>
              </div>

              {/* 1. Area Chart - Component Growth */}
              <div>
                <h4 className="text-body-4 text-(--on-bg-medium) mb-3">Component Growth</h4>
                <ChartContainer config={chartConfig} className="h-[160px] w-full">
                  <AreaChart data={componentGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" />
                    <XAxis dataKey="month" tickLine={false} stroke="var(--on-bg-low)" />
                    <YAxis tickLine={false} stroke="var(--on-bg-low)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="components" stroke="var(--primary)" strokeWidth={2} fill="url(#areaGrad)" />
                  </AreaChart>
                </ChartContainer>
              </div>

              {/* 2. Bar Chart - Monthly Downloads */}
              <div>
                <h4 className="text-body-4 text-(--on-bg-medium) mb-3">Downloads (k)</h4>
                <ChartContainer config={chartConfig} className="h-[140px] w-full">
                  <BarChart data={componentGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} stroke="var(--on-bg-low)" />
                    <YAxis tickLine={false} stroke="var(--on-bg-low)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="downloads" fill="var(--brand-6)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>

              {/* 3. Donut Chart - Tech Stack */}
              <div>
                <h4 className="text-body-4 text-(--on-bg-medium) mb-3">Tech Stack Usage</h4>
                <div className="flex justify-center">
                  <ChartContainer config={chartConfig} className="h-[140px] w-[140px]">
                    <PieChart>
                      <Pie
                        data={techStackData}
                        dataKey="value"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={2}
                        stroke="var(--card)"
                        strokeWidth={2}
                      >
                        {techStackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {techStackData.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-body-5 text-(--on-bg-medium)">{item.name}</span>
                      <span className="text-body-5 text-(--on-bg-low)">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Line Chart - Subscribers & Views */}
              <div>
                <h4 className="text-body-4 text-(--on-bg-medium) mb-3">Growth Metrics</h4>
                <ChartContainer config={chartConfig} className="h-[140px] w-full">
                  <LineChart data={componentGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} stroke="var(--on-bg-low)" />
                    <YAxis tickLine={false} stroke="var(--on-bg-low)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="users" stroke="var(--success)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="downloads" stroke="var(--brand-6)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                  </LineChart>
                </ChartContainer>
                <div className="flex justify-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-(--success)" />
                    <span className="text-body-6 text-(--on-bg-low)">Active Users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-(--brand-6)" />
                    <span className="text-body-6 text-(--on-bg-low)">Downloads (k)</span>
                  </div>
                </div>
              </div>

              {/* 5. Quick Metrics - compact */}
              <div>
                <h4 className="text-body-4 text-(--on-bg-medium) mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-(--outline) bg-(--card)/50 p-3">
                    <p className="text-body-5 text-(--on-bg-low)">Total Components</p>
                    <p className="text-display-3 text-(--on-bg-high)">128</p>
                    <Badge variant="glass-static" size="chip-small" className="mt-1">+12.5%</Badge>
                  </div>
                  <div className="rounded-lg border border-(--outline) bg-(--card)/50 p-3">
                    <p className="text-body-5 text-(--on-bg-low)">Telegram Subs</p>
                    <p className="text-display-3 text-(--on-bg-high)">1,284</p>
                    <Badge variant="glass-static" size="chip-small" className="mt-1">+8.2%</Badge>
                  </div>
                  <div className="rounded-lg border border-(--outline) bg-(--card)/50 p-3 col-span-2">
                    <p className="text-body-5 text-(--on-bg-low)">Figma Views</p>
                    <p className="text-display-3 text-(--on-bg-high)">8.4K</p>
                    <Badge variant="glass-static" size="chip-small" className="mt-1">+14.3%</Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sticky bottom-0 bg-(--card-glass)/80 backdrop-blur-sm py-3">
                <Button variant="glass" size="small" className="gap-1">
                  <CheckCircleIcon className="size-4" /> Export Data
                </Button>
                <Button variant="tonal-card" size="small">Refresh</Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}