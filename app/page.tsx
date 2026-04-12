import CompletePctg from "@/components/List/CompletePctg";
import List from "@/components/List/List";

export default function ListPage() {
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-24">
      <h2 className="text-3xl font-extrabold mb-6">My List</h2>
      <CompletePctg />
      <List isFixed={false} />
    </main>
  );
}
