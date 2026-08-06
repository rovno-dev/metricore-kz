import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  href?: string
}

function Card({ className, href, children, ...props }: CardProps) {
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "block rounded-xl border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card }
