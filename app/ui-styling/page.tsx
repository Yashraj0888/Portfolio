import ServiceAccordion from "@/components/ui-styling/ServiceAccordion";

export const metadata = {
  title: "Services | Yashraj Singh",
  description: "Frontend and backend development services.",
};

export default function UIStylingPage() {
  return (
    <main className="pt-24">
      <ServiceAccordion />
    </main>
  );
}
