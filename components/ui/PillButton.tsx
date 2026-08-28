import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PillButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  download?: string;
};

export default function PillButton({
  href,
  onClick,
  variant = "secondary",
  children,
  className,
  external,
  download,
}: PillButtonProps) {
  const variantMap = {
    primary: "default" as const,
    secondary: "outline" as const,
    ghost: "ghost" as const,
  };

  const classes = cn(
    buttonVariants({ variant: variantMap[variant] }),
    "rounded-full px-6 py-3 h-auto text-sm font-medium tracking-wide",
    variant === "secondary" && "bg-card border-border pill-shadow hover:bg-card/90",
    variant === "primary" && "pill-shadow",
    className
  );

  if (href) {
    if (external || download) {
      return (
        <a
          href={href}
          target={download ? undefined : "_blank"}
          rel={download ? undefined : "noopener noreferrer"}
          download={download}
          className={classes}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return <ArrowUpRight className={cn("size-3.5", className)} aria-hidden />;
}
