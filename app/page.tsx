import { MultiStepForm } from "./components/multi-step-form";
import { ThemeShowcase } from "./components/theme-switcher";
import { ExpandableSearchShowcase } from "./components/expandable-search";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 py-8">
      {/* <MultiStepForm /> */}
      {/* <ThemeShowcase /> */}
      <ExpandableSearchShowcase />
    </main>
  );
}
