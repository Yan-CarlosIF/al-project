import React, { useMemo } from "react";
import * as THREE from "three";

const TriangleGeometry = ({ scale = [1, 1, 1] }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    // Vértices do triângulo 3D (pirâmide triangular)
    const vertices = new Float32Array([
      // Triângulo frontal
      0,
      1 * scale[1],
      0, // vértice superior
      -1 * scale[0],
      -1 * scale[1],
      1 * scale[2], // vértice inferior esquerdo
      1 * scale[0],
      -1 * scale[1],
      1 * scale[2], // vértice inferior direito

      // Triângulo traseiro
      0,
      1 * scale[1],
      0, // vértice superior
      1 * scale[0],
      -1 * scale[1],
      -1 * scale[2], // vértice inferior direito
      -1 * scale[0],
      -1 * scale[1],
      -1 * scale[2], // vértice inferior esquerdo

      // Face inferior (quadrado dividido em 2 triângulos)
      -1 * scale[0],
      -1 * scale[1],
      1 * scale[2], // frontal esquerdo
      -1 * scale[0],
      -1 * scale[1],
      -1 * scale[2], // traseiro esquerdo
      1 * scale[0],
      -1 * scale[1],
      -1 * scale[2], // traseiro direito

      -1 * scale[0],
      -1 * scale[1],
      1 * scale[2], // frontal esquerdo
      1 * scale[0],
      -1 * scale[1],
      -1 * scale[2], // traseiro direito
      1 * scale[0],
      -1 * scale[1],
      1 * scale[2], // frontal direito

      // Face lateral esquerda
      0,
      1 * scale[1],
      0, // vértice superior
      -1 * scale[0],
      -1 * scale[1],
      -1 * scale[2], // traseiro esquerdo
      -1 * scale[0],
      -1 * scale[1],
      1 * scale[2], // frontal esquerdo

      // Face lateral direita
      0,
      1 * scale[1],
      0, // vértice superior
      1 * scale[0],
      -1 * scale[1],
      1 * scale[2], // frontal direito
      1 * scale[0],
      -1 * scale[1],
      -1 * scale[2], // traseiro direito
    ]);

    // Calculando normais para cada face
    const normals = new Float32Array([
      // Triângulo frontal
      0, 0, 1, 0, 0, 1, 0, 0, 1,

      // Triângulo traseiro
      0, 0, -1, 0, 0, -1, 0, 0, -1,

      // Face inferior (2 triângulos)
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

      // Face lateral esquerda
      -0.7071, 0.7071, 0, -0.7071, 0.7071, 0, -0.7071, 0.7071, 0,

      // Face lateral direita
      0.7071, 0.7071, 0, 0.7071, 0.7071, 0, 0.7071, 0.7071, 0,
    ]);

    // UVs para texturização
    const uvs = new Float32Array([
      // Triângulo frontal
      0.5, 1, 0, 0, 1, 0,

      // Triângulo traseiro
      0.5, 1, 1, 0, 0, 0,

      // Face inferior
      0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1,

      // Face lateral esquerda
      0.5, 1, 0, 0, 1, 0,

      // Face lateral direita
      0.5, 1, 0, 0, 1, 0,
    ]);

    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    return geo;
  }, [scale]);

  return <primitive object={geometry} />;
};

export default TriangleGeometry;
