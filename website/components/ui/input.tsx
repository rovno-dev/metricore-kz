import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-(--outline) bg-(--bg) px-2.5 py-1 text-base text-(--on-bg-high) transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-(--on-bg-high) placeholder:text-(--on-bg-low) focus-visible:border-(--primary) focus-visible:ring-3 focus-visible:ring-(--primary)/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--error) aria-invalid:ring-3 aria-invalid:ring-(--error)/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }