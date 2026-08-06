import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-(--outline) bg-(--bg) px-2.5 py-2 text-base text-(--on-bg-high) transition-colors outline-none placeholder:text-(--on-bg-low) focus-visible:border-(--primary) focus-visible:ring-3 focus-visible:ring-(--primary)/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--error) aria-invalid:ring-3 aria-invalid:ring-(--error)/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }