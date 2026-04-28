import { CrudManager } from "@/components/dashboard/crud-manager";
import { getSponsors } from "@/lib/repositories";

export default async function DashboardSponsorsPage() {
  const items = await getSponsors();

  return (
    <CrudManager
      description="Manage sponsor profiles, dedicated content pages, and media galleries."
      entity="sponsors"
      fields={[
        { name: "name", label: "Sponsor name" },
        { name: "slug", label: "Slug" },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "hero_image_url", label: "Hero image URL" },
        { name: "gallery", label: "Gallery JSON", type: "textarea" },
        { name: "body", label: "Content JSON", type: "textarea" }
      ]}
      initialItems={items.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        summary: item.summary
      }))}
      title="Sponsors"
    />
  );
}

