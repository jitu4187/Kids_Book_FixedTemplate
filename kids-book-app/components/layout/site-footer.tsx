// Footer with product-focused reminders and quick links.
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-10">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">WonderBook Labs</p>
          <p className="text-xs text-muted-foreground">
            Building magical personalized stories for curious kids everywhere.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="mailto:hello@wonderbook.app">hello@wonderbook.app</Link>
          <Link href="https://example.com/privacy">Privacy</Link>
          <Link href="https://example.com/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
