"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { VectorArrow } from "../components/vector-arrow";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import TriangleGeometry from "../components/triangle";

function CameraLookAt({
  targetRef,
}: {
  targetRef: React.RefObject<THREE.Object3D | null>;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (targetRef.current) {
      camera.lookAt(targetRef.current.position);
    }
  });

  return null;
}

export default function Inspect() {
  const [scaleState, setScaleState] = useState(1);
  const [isGrabing, setIsGrabing] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [showVetorialArrows, setShowVetorialArrows] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const [showBackButton, setShowBackButton] = useState(true);

  useEffect(() => {
    const handleZoom = () => {
      const zoomLevel = window.devicePixelRatio;
      // Ajuste o threshold conforme o necessário
      setShowBackButton(zoomLevel <= 1);
    };

    handleZoom(); // Executa na montagem
    window.addEventListener("resize", handleZoom); // Escuta zoom e resize

    return () => window.removeEventListener("resize", handleZoom);
  }, []);

  const {
    position,
    rotation,
    lookAt,
    transparent,
    area: showArea,
    escala,
    modelo,
  } = useControls("Transformação", {
    scale: {
      label: "escala uniforme",
      value: scaleState,
      step: 0.05,
      onChange: (value) => setScaleState(value), // Sincroniza com o estado
    },
    escala: { value: [1, 1, 1], min: 0, max: 10, step: 0.1 },
    position: {
      label: "translação",
      value: [0, 0, 0],
      min: -50,
      max: 50,
      step: 0.1,
    },
    rotation: {
      label: "rotação",
      value: [0, 0, 0],
      step: 0.1,
      min: -Math.PI * 3,
      max: Math.PI * 3,
    },
    reflexao: button(() => {
      const newScale = scaleState * -1;
      setScaleState(newScale);
      // Força o controle do Leva a atualizar para o novo valor
      // Isso acontecerá automaticamente através da sincronização
    }),
    lookAt: { value: true },
    transparent: { value: true },
    area: {
      label: "Area paralelogramo",
      value: false,
    },
    modelo: {
      options: ["cubo", "Triângulo"],
      value: "cubo",
    },
  });

  const { u, v } = useControls("Produto Vetorial", {
    u: { value: [1, 0, 0], step: 0.1 },
    v: { value: [0, 1, 0], step: 0.1 },
    "Exibir setas do produto vetorial": button(() =>
      setShowVetorialArrows((prevState) => !prevState),
    ),
  });

  const vetorU = new THREE.Vector3(...u);
  const vetorV = new THREE.Vector3(...v);
  const produtoVetorial = new THREE.Vector3().crossVectors(vetorU, vetorV);
  const area = produtoVetorial.length();

  useControls("Arrows (Vetores)", {
    "Exibir setas": button(() => setShowArrows((prevState) => !prevState)),
  });

  const { animatedPosition, animatedScale, animatedRotation } = useSpring({
    animatedScale: scaleState, // Usa scaleState em vez de scale
    animatedPosition: position,
    animatedRotation: rotation,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <div
      className="h-screen w-screen"
      style={{ background: "linear-gradient(to bottom, #313a49b8, #283449b8)" }}
    >
      {showBackButton && (
        <Link
          href="/"
          className="absolute top-7 left-12 z-50 flex h-10 w-24 cursor-pointer items-center justify-center rounded-xl bg-blue-500 font-medium text-white transition-all duration-300 hover:bg-blue-600"
        >
          <ChevronLeft size={20} color="white" />
          Voltar
        </Link>
      )}
      <Canvas
        className={isGrabing ? "cursor-grabbing" : "cursor-grab"}
        onMouseDown={() => setIsGrabing(true)}
        onMouseUp={() => setIsGrabing(false)}
        shadows
        camera={{ position: [6, 5, 2], fov: 60, far: 1000 }}
      >
        <Environment preset="city" />
        <ambientLight intensity={10} />
        <gridHelper args={[100, 100, "#888", "#444"]} position={[0, -0.5, 0]} />
        {lookAt && <CameraLookAt targetRef={meshRef} />}

        <a.mesh
          scale={animatedScale}
          position={animatedPosition}
          rotation={animatedRotation as unknown as [number, number, number]}
          ref={meshRef}
          castShadow
          receiveShadow
        >
          {modelo === "cubo" ? (
            <boxGeometry args={[escala[0], escala[1], escala[2]]} />
          ) : (
            <TriangleGeometry scale={escala} />
          )}
          <meshStandardMaterial
            color="white"
            transparent
            opacity={transparent ? 0.4 : 1}
          />
          {showArrows && (
            <>
              {/* Vetores base */}
              <VectorArrow label="X" to={[1, 0, 0]} color="red" />
              <VectorArrow label="Y" to={[0, 1, 0]} color="green" />
              <VectorArrow label="Z" to={[0, 0, 1]} color="blue" />
            </>
          )}

          {showVetorialArrows && (
            <>
              {/* Vetores u, v e u×v */}
              <VectorArrow label="U" to={u} color="yellow" />
              <VectorArrow label="V" to={v} color="orange" />
              <VectorArrow
                label="U x V"
                to={produtoVetorial.toArray()}
                color="purple"
              />
            </>
          )}
        </a.mesh>

        <OrbitControls />
      </Canvas>
      {showArea && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-black/50 px-4 py-2 text-lg font-semibold text-white">
          Área do paralelogramo: {area.toFixed(2)}
        </div>
      )}
    </div>
  );
}
