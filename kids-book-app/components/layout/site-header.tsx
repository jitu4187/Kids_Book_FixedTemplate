// Primary navigation shell for the marketing/sales pages.
import Link from "next/link";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#templates", label: "Templates" },
  { href: "#workflow", label: "Workflow" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            WonderBook
          </Link>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/landing">Landing</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Launch Builder</Link>
            </Button>
          </div>
        </div>
    </header>
  );
}
