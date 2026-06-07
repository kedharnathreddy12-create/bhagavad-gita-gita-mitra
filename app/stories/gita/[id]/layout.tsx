import { Metadata } from "next";
import { gitaStories } from "@/data/gita-stories";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const story = gitaStories.find((s) => s.id === resolvedParams.id);
  
  if (!story) return { title: 'Story Not Found' };

  return {
    title: `${story.title} | గీతా కథలు`,
    description: story.summary,
  };
}

export default function GitaStoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
