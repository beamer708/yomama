import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SharedListPage({ params: _ }: PageProps) {
  redirect("/resources");
}
