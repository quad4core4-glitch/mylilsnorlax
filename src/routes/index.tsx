import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { StoryIntro } from "@/components/StoryIntro";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Finale } from "@/components/Finale";
import { MusicToggle } from "@/components/MusicToggle";
import { Moonlight } from "@/components/Moonlight";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mylil Snorlax!" },
      {
        name: "description",
        content:
          "A cinematic, dark, and emotional love letter — built line by line.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Moonlight />
      <MusicToggle />
      <Hero />
      <StoryIntro />
      <Timeline />
      <Gallery />
      <Finale />
    </main>
  );
}
