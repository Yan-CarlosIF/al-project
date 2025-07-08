import Image from "next/image";
import Link from "next/link";

export const revalidate = 604800;

export default function Home() {
  return (
    <main className="bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-blue-600 px-4 py-20 text-center text-white">
        <h1 className="mx-auto mb-6 max-w-6xl text-5xl leading-tight font-bold">
          Transformações Lineares e Mudanças de Base aplicadas a Modelos 3D
        </h1>
        <p className="mx-auto max-w-3xl text-center text-lg md:text-xl">
          Entenda como vetores, transformações lineares e mudanças de base são
          essenciais na computação gráfica usando React Three Fiber.
        </p>
      </section>

      {/* Integração com Computação Gráfica */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            🎮 Integração com Computação Gráfica
          </h2>
          <p className="mb-4">
            A Álgebra Linear permite transformar, rotacionar e escalar objetos
            em ambientes 3D com precisão matemática. Com React Three Fiber,
            essas transformações são aplicadas de forma declarativa e
            performática.
          </p>
          <p>
            Essas aplicações incluem engines 3D, animações em tempo real e
            visualizações científicas com alto grau de realismo.
          </p>
        </div>
        <Image
          src="/graphic.jpg"
          alt="Exemplo de cena 3D"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Vetores em R³ */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 bg-gray-50 px-6 py-16 md:grid-cols-2">
        <Image
          src="/vector.jpg"
          alt="Representação de Vetores em R³"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            📐 Representação de Vetores em R³
          </h2>
          <p className="mb-4">
            Vetores em R³ são fundamentais para representar posições e direções
            em espaços tridimensionais. Cada vetor é definido por uma tripla
            ordenada [x, y, z], podendo representar deslocamentos, forças ou
            posições.
          </p>
          <p>
            Na computação gráfica, vetores determinam a movimentação e
            orientação de câmeras, luzes e objetos.
          </p>
        </div>
      </section>

      {/* Mudança de Base */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold">🔄 Mudança de Base</h2>
          <p className="mb-4">
            Transformar vetores de uma base para outra permite visualizar
            objetos a partir de diferentes perspectivas. Essa técnica é
            essencial para animações e manipulação de objetos em diferentes
            sistemas de coordenadas.
          </p>
          <p>
            Em 3D, as mudanças de base são realizadas por meio de multiplicações
            matriciais eficientes.
          </p>
        </div>
        <Image
          src="/change-base.jpg"
          alt="Exemplo de mudança de base"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Escala e Transformações Lineares */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 bg-gray-50 px-6 py-16 md:grid-cols-2">
        <Image
          src="/transformacoes1.png"
          alt="Transformações Lineares 3D"
          width={600}
          height={400}
          className="rounded-2xl shadow-2xl"
        />
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            🧮 Escala e Outras Transformações
          </h2>
          <p className="mb-4">
            Transformações lineares, como escala, rotação e translação, são
            operações fundamentais na construção de cenas 3D. Elas são
            representadas por matrizes aplicadas aos vetores que compõem os
            objetos.
          </p>
          <p>
            Essas operações permitem animar, deformar e posicionar elementos de
            forma realista e eficiente.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl items-center justify-center gap-10 bg-gray-50 px-6 py-16">
        <Link
          href="/inspect"
          className="rounded-2xl bg-gradient-to-br from-purple-700 to-blue-600 px-16 py-5 text-xl font-bold text-white shadow-purple-400 transition-all duration-300 hover:shadow-2xl"
        >
          Inspecionar Modelo
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 text-center text-white">
        <p>
          Desenvolvido com 💡 por{" "}
          <a
            href="https://github.com/Yan-CarlosIF"
            target="_blank"
            className="font-semibold text-purple-400 transition-colors duration-300 hover:text-purple-500"
          >
            Yan Carlos
          </a>{" "}
          • Projeto baseado em React Three Fiber e conceitos de Álgebra Linear.
        </p>
      </footer>
    </main>
  );
}
