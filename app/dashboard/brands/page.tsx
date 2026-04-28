import { CrudManager } from "@/components/dashboard/crud-manager";
import { getBrands } from "@/lib/repositories";

export default async function DashboardBrandsPage() {
  const items = await getBrands();

  return (
    <CrudManager
      description="Manage brand records, zones, bios, booth locations, and stock previews."
      entity="brands"
      fields={[
        { name: "name", label: "Brand name" },
        { name: "slug", label: "Slug" },
        { name: "zone", label: "Zone", type: "select", options: ["A", "B", "C", "D", "M", "Y"] },
        { name: "booth_location", label: "Booth location" },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "hero_image_url", label: "Hero image URL" },
        { name: "website_url", label: "Website URL" },
        { name: "stock_preview", label: "Stock preview JSON", type: "textarea" }
      ]}
      initialItems={items.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        zone: item.zone,
        booth_location: item.boothLocation
      }))}
      title="Brands"
    />
  );
}

