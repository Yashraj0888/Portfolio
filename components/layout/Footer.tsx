import Link from "next/link";
import Image from "next/image";
import { siteConfig, socialLinks } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image
            src="/assets/image.png"
            alt={siteConfig.name}
            width={32}
            height={32}
            className="rounded-lg"
          />
          <Badge variant="default" className="h-auto rounded-full px-4 py-2 text-sm font-medium">
            {siteConfig.name}
          </Badge>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-card px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 pill-shadow transition-all duration-300 hover:scale-[1.03]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
