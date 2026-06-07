import { Metadata } from "next";
import { chapters } from "@/data/chapters";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const chapter = chapters.find((c) => c.id === parseInt(resolvedParams.id));
  
  if (!chapter) return { title: 'Chapter Not Found' };

  return {
    title: `అధ్యాయం ${chapter.id}: ${chapter.title_telugu}`,
    description: chapter.summary_telugu,
  };
}

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
