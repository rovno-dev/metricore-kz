"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

function getHexFromCSSVar(varName: string): string {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  if (!color) return "-";

  if (color.startsWith("#")) return color.toUpperCase();

  if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match) {
      const [r, g, b] = match.map(Number);
      return `#${[r, g, b]
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()}`;
    }
  }

  return color;
}

function ColorSwatch({ varName, name }: { varName: string; name: string }) {
  const [hex, setHex] = useState<string>("");

  useEffect(() => {
    setHex(getHexFromCSSVar(varName));
  }, [varName]);

  return (
    <Card className="p-2 text-center transition-all hover:scale-105 hover:shadow-lg cursor-default">
      <div
        className="w-full aspect-square rounded-md mb-1.5 border border-(--outline)/50"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <p className="text-body-6 text-(--on-bg-medium) leading-tight">{name}</p>
      <p className="text-body-6 text-(--on-bg-low) font-mono text-[10px] leading-tight">
        {hex}
      </p>
      <p className="text-body-6 text-(--on-bg-low) font-mono text-[10px] leading-tight">
        {varName}
      </p>
    </Card>
  );
}

const colorGroups = [
  {
    label: "Brand & Primary",
    colors: [
      { name: "Primary", var: "--primary" },
      { name: "On Primary", var: "--on-primary" },
      { name: "Primary Card", var: "--primary-card" },
      { name: "On Primary Card", var: "--on-primary-card" },
      { name: "Primary Glass", var: "--primary-glass" },
    ],
  },
  {
    label: "Background & Surface",
    colors: [
      { name: "Background", var: "--bg" },
      { name: "Bg Disabled", var: "--bg-disabled" },
      { name: "Card", var: "--card" },
      { name: "Outline", var: "--outline" },
    ],
  },
  {
    label: "Text",
    colors: [
      { name: "On-bg High", var: "--on-bg-high" },
      { name: "On-bg Medium", var: "--on-bg-medium" },
      { name: "On-bg Low", var: "--on-bg-low" },
      { name: "On-bg Disabled", var: "--on-bg-disabled" },
    ],
  },
  {
    label: "Feedback",
    colors: [
      { name: "Error", var: "--error" },
      { name: "On Error", var: "--on-error" },
      { name: "Error Card", var: "--error-card" },
      { name: "On Error Card", var: "--on-error-card" },
      { name: "Success", var: "--success" },
      { name: "On Success", var: "--on-success" },
      { name: "Success Card", var: "--success-card" },
      { name: "On Success Card", var: "--on-success-card" },
      { name: "Warning", var: "--warning" },
      { name: "On Warning", var: "--on-warning" },
      { name: "Warning Card", var: "--warning-card" },
      { name: "On Warning Card", var: "--on-warning-card" },
    ],
  },
  {
    label: "States",
    colors: [
      { name: "Hover", var: "--state-hover" },
      { name: "Focus", var: "--state-focus" },
    ],
  },
];

export function TypographyColorShowcase() {
  return (
    <section className="py-8 md:py-16">
      <Container>
        <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-8">
          Typography &amp; Colors
        </h2>

        {/* Font showcase - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-(--on-bg-low) mb-3">
              Display - Oswald
            </h3>
            <div className="space-y-1.5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <p key={n} className={`text-display-${n} text-(--on-bg-high)`}>
                  Display {n}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider text-(--on-bg-low) mb-3">
              Heading - Noto Sans
            </h3>
            <div className="space-y-1.5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <p key={n} className={`text-heading-${n} text-(--on-bg-high)`}>
                  Heading {n}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider text-(--on-bg-low) mb-3">
              Body - Noto Sans
            </h3>
            <div className="space-y-1.5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <p key={n} className={`text-body-${n} text-(--on-bg-medium)`}>
                  Body {n}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Colors - grouped with hex values */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-(--on-bg-low) mb-6">
            Colors
          </h3>
          <div className="space-y-8">
            {colorGroups.map((group) => (
              <div key={group.label}>
                <h4 className="text-body-4 text-(--on-bg-medium) mb-2 font-medium">
                  {group.label}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {group.colors.map((color) => (
                    <ColorSwatch
                      key={color.var}
                      varName={color.var}
                      name={color.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}