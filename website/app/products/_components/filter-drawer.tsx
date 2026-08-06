"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "@/components/icons";
import { Product } from "@/utils/interfaces";

interface FilterDrawerProps {
  products: Product[];
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;
  selectedTypes: string[];
  setSelectedTypes: (value: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;
  onReset: () => void;
}

export function FilterDrawer({
  products,
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
  selectedTypes,
  setSelectedTypes,
  selectedSizes,
  setSelectedSizes,
  onReset,
}: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  const colors = [...new Set(products.map((p) => p.color))];
  const types = [...new Set(products.map((p) => p.type))];
  const sizes = [...new Set(products.flatMap((p) => p.size))];

  const toggleSelection = (
    setter: (value: string[]) => void,
    current: string[],
    value: string
  ) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outlined" size="medium" className="gap-2">
          <FilterIcon className="size-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[380px] p-6 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="mb-2 block">Price Range</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  min={0}
                  step={1}
                />
              </div>
              <span>to</span>
              <div className="flex-1">
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  min={0}
                  step={1}
                />
              </div>
            </div>
            <Slider
              value={priceRange}
              min={0}
              max={50}
              step={1}
              onValueChange={(val) => setPriceRange(val as [number, number])}
              className="mt-2"
            />
          </div>

          {/* Colors - vertical list */}
          <div>
            <Label className="mb-2 block">Color</Label>
            <div className="flex flex-col gap-2">
              {colors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() =>
                      toggleSelection(setSelectedColors, selectedColors, color)
                    }
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Types - vertical list */}
          <div>
            <Label className="mb-2 block">Type</Label>
            <div className="flex flex-col gap-2">
              {types.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() =>
                      toggleSelection(setSelectedTypes, selectedTypes, type)
                    }
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sizes - vertical list */}
          <div>
            <Label className="mb-2 block">Size</Label>
            <div className="flex flex-col gap-2">
              {sizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() =>
                      toggleSelection(setSelectedSizes, selectedSizes, size)
                    }
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="text"
              size="small"
              onClick={onReset}
              className="text-(--on-bg-low)"
            >
              Clear all
            </Button>
            <Button
              variant="filled"
              size="small"
              onClick={() => setOpen(false)}
              className="ml-auto"
            >
              Apply
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
