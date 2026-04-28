import { CrudManager } from "@/components/dashboard/crud-manager";
import { getEvents } from "@/lib/repositories";

export default async function DashboardEventsPage() {
  const items = await getEvents();

  return (
    <CrudManager
      description="Create, update, and remove event records, including Google Maps links and date ranges."
      entity="events"
      fields={[
        { name: "title", label: "Title" },
        { name: "slug", label: "Slug" },
        { name: "location_name", label: "Location" },
        { name: "google_maps_url", label: "Google Maps URL" },
        { name: "start_at", label: "Start", type: "date" },
        { name: "end_at", label: "End", type: "date" },
        { name: "status", label: "Status", type: "select", options: ["upcoming", "live", "past"] },
        { name: "short_description", label: "Short description", type: "textarea" },
        { name: "long_description", label: "Long description", type: "textarea" },
        { name: "hero_image_url", label: "Hero image URL" }
      ]}
      initialItems={items.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        location_name: item.locationName,
        start_at: item.startAt,
        end_at: item.endAt,
        status: item.status
      }))}
      title="Events"
    />
  );
}

