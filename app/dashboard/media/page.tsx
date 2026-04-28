import { CrudManager } from "@/components/dashboard/crud-manager";
import { getMediaAssets } from "@/lib/repositories";

export default async function DashboardMediaPage() {
  const items = await getMediaAssets();

  return (
    <CrudManager
      description="Upload and manage homepage carousel media, gallery content, and site-wide imagery."
      entity="media_assets"
      fields={[
        { name: "title", label: "Title" },
        { name: "kind", label: "Kind", type: "select", options: ["carousel", "gallery", "campaign"] },
        { name: "placement", label: "Placement" },
        { name: "image_url", label: "Image URL" },
        { name: "alt_text", label: "Alt text" }
      ]}
      initialItems={items.map((item) => ({
        id: item.id,
        title: item.title,
        kind: item.kind,
        placement: item.placement
      }))}
      title="Media library"
    />
  );
}

