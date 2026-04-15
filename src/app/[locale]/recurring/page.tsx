import List from "@/src/components/List/List";

export default function RecurringPage() {
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <h2 className="text-3xl font-extrabold">Recurring Items</h2>
      <p className="mb-6">Items that automatically refresh every cycle period.</p>
      <List isFixed={true} />
    </main>
  );
}