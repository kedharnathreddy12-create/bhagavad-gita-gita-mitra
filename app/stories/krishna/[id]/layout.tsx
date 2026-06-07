import { Metadata } from "next";
import { krishnaStories } from "@/data/krishna-stories";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const story = krishnaStories.find((s) => s.id === resolvedParams.id);
  
  if (!story) return { title: 'Story Not Found' };

  return {
    title: `${story.title} | శ్రీకృష్ణ లీలలు`,
    description: story.summary,
  };
}

export default function KrishnaStoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
