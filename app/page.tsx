export default function ListPage() {
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto">

      <h2 className="text-3xl font-extrabold mb-6">My List</h2>

      <input
        placeholder="Add item..."
        id="search-list"
        className="w-full p-4 rounded-xl bg-gray-100 mb-6"
      />

      <div className="space-y-3">
        <div className="p-4 bg-white rounded-xl shadow">
          Organic Milk
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          Bread
        </div>
      </div>

    </main>
  );
}