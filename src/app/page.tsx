import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-3xl">
        Transformações Lineares e Mudanças de Base aplicadas a Modelos 3D
      </h1>
      <Link
        href="/inspect"
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700"
      >
        Testar
      </Link>
    </div>
  );
}
