import Link from "next/link";

export default function ActionButtons() {
  return (
    <section className="flex flex-col items-center mt-8">
      <Link
        key={"start"}
        href="/cycle/start"
        className="w-3xs py-3 rounded-xl bg-blue text-white font-bold text-center"
      >
        <span>Start New Cycle</span>
      </Link>
    </section>
  );
}
