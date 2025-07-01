"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import { button, useControls } from "leva";
import { useState } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { VectorArrow } from "../components/vector-arrow";

export default function Inspect() {
  const [isGrabing, setIsGrabing] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const { scale, position, rotation, object } = useControls(
    "Transforma\u00e7\u00e3o",
    {
      scale: { label: "tamanho", value: 1, min: 0, max: 5, step: 0.05 },
      position: {
        label: "posi\u00e7\u00e3o",
        value: [0, 0, 0],
        min: -10,
        max: 10,
        step: 0.1,
      },
      rotation: {
        value: [0, 0, 0],
        step: 0.1,
        min: -Math.PI * 2,
        max: Math.PI * 2,
      },
      object: {
        options: ["box", "sphere"],
        value: "box",
      },
    },
  );

  const { b1, b2, b3 } = useControls("Base B", {
    b1: { value: [1, 0, 0], step: 0.1 },
    b2: { value: [0, 1, 0], step: 0.1 },
    b3: { value: [0, 0, 1], step: 0.1 },
  });

  const B = new THREE.Matrix3().set(
    b1[0],
    b2[0],
    b3[0],
    b1[1],
    b2[1],
    b3[1],
    b1[2],
    b2[2],
    b3[2],
  );

  const { scaleX, scaleY, scaleZ } = useControls("Escala (Matriz)", {
    scaleX: { value: 1, min: -5, max: 5, step: 0.1 },
    scaleY: { value: 1, min: -5, max: 5, step: 0.1 },
    scaleZ: { value: 1, min: -5, max: 5, step: 0.1 },
  });

  const Binv = B.clone().invert();

  const { vCanon } = useControls("Vetor", {
    vCanon: { value: [1, 2, 1], step: 0.1 },
    "Exibir setas": button(() => setShowArrows((prev) => !prev)),
  });

  const vB = new THREE.Vector3(...vCanon).applyMatrix3(Binv);
  const vCanonVec = new THREE.Vector3(...vCanon);

  const { animatedPosition, animatedScale, animatedRotation } = useSpring({
    animatedScale: scale,
    animatedPosition: position,
    animatedRotation: rotation,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const S = new THREE.Matrix3().set(scaleX, 0, 0, 0, scaleY, 0, 0, 0, scaleZ);

  const vEscalado = vCanonVec.clone().applyMatrix3(S);

  return (
    <div
      className="h-screen w-screen"
      style={{ background: "linear-gradient(to bottom, #313a49b8, #283449b8)" }}
    >
      <Canvas
        className={isGrabing ? "cursor-grabbing" : "cursor-grab"}
        onMouseDown={() => setIsGrabing(true)}
        onMouseUp={() => setIsGrabing(false)}
        shadows
        camera={{ position: [6, 5, 6], fov: 60, far: 1000 }}
      >
        <Environment preset="city" />

        <a.mesh
          scale={animatedScale}
          position={animatedPosition}
          // @ts-ignore
          rotation={animatedRotation}
          castShadow
          receiveShadow
        >
          {object === "sphere" ? (
            <sphereGeometry args={[1, 30, 30]} />
          ) : (
            <boxGeometry args={[1, 1, 1]} />
          )}
          <meshStandardMaterial color="white" />
        </a.mesh>

        {/* Eixos base can\u00f4nica */}
        {showArrows && (
          <>
            <VectorArrow to={[1, 0, 0]} color="red" />
            <VectorArrow to={[0, 1, 0]} color="green" />
            <VectorArrow to={[0, 0, 1]} color="blue" />
          </>
        )}

        {showArrows && (
          <>
            <VectorArrow to={[1, 0, 0]} color="red" />
            <VectorArrow to={[0, 1, 0]} color="green" />
            <VectorArrow to={[0, 0, 1]} color="blue" />
          </>
        )}

        {/* Base B */}
        {showArrows && (
          <>
            <VectorArrow to={b1} color="orange" />
            <VectorArrow to={b2} color="purple" />
            <VectorArrow to={b3} color="cyan" />
          </>
        )}

        {/* Vetor na base can\u00f4nica */}
        {showArrows && (
          <>
            <VectorArrow to={vCanonVec.toArray()} color="yellow" />
            {/* Exibir valores no espa\u00e7o */}
            <Text position={vCanonVec.toArray()} fontSize={0.3} color="yellow">
              {`v = [${vCanonVec.x.toFixed(1)}, ${vCanonVec.y.toFixed(1)}, ${vCanonVec.z.toFixed(1)}]`}
            </Text>

            <Text
              position={[vCanonVec.x + 0.5, vCanonVec.y + 0.5, vCanonVec.z]}
              fontSize={0.25}
              color="white"
            >
              {`vB = [${vB.x.toFixed(2)}, ${vB.y.toFixed(2)}, ${vB.z.toFixed(2)}]`}
            </Text>
          </>
        )}

        {showArrows && (
          <>
            <VectorArrow to={vEscalado.toArray()} color="lime" />
            <Text position={vEscalado.toArray()} fontSize={0.25} color="lime">
              Escalado
            </Text>
          </>
        )}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
