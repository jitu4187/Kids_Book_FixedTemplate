import { DashboardView } from "@/components/dashboard/dashboard-view";
import { BOOK_TEMPLATES } from "@/data/book-templates";

export default function DashboardPage() {
  return <DashboardView templates={BOOK_TEMPLATES} />;
}
