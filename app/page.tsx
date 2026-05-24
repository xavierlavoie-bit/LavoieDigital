import ExplorePanels from "./_components/ExplorePanels";
import Hero from "./_components/Hero";
import PageNav from "./_components/PageNav";

export default function Home() {
  return (
    <>
      <Hero />
      <ExplorePanels />
      {/* Mobile only — desktop has the active-content area in ExplorePanels */}
      <div className="md:hidden">
        <PageNav
          next={{ href: "/services", label: "Services", eyebrow: "Suivant — 01" }}
        />
      </div>
    </>
  );
}
