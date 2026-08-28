import ProjectGrid from "@/components/design/ProjectGrid";

export const metadata = {
  title: "Work | Yashraj Singh",
  description: "Selected projects and recent work.",
};

export default function DesignPage() {
  return (
    <main className="pt-24">
      <ProjectGrid />
    </main>
  );
}
