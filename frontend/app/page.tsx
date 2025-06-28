import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a Farmacia</h1>
      <Link href="/medicamentos" className="text-blue-600 underline">
        Ver medicamentos
      </Link>
    </main>
  );
}
