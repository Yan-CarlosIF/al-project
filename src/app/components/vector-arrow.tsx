import { useEffect, useRef } from "react";
import * as THREE from "three";

export function VectorArrow({
  from = [0, 0, 0],
  to = [1, 0, 0],
  color = "red",
}) {
  const ref = useRef<THREE.ArrowHelper>(null);

  useEffect(() => {
    const fromVec = new THREE.Vector3(...from);
    const toVec = new THREE.Vector3(...to);
    const dir = toVec.clone().sub(fromVec).normalize();
    const length = toVec.clone().sub(fromVec).length();

    if (ref.current) {
      ref.current.setDirection(dir);
      ref.current.setLength(length);
    }
  }, [from, to]);

  return (
    <primitive
      object={
        new THREE.ArrowHelper(
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          1,
          color,
        )
      }
      ref={ref}
    />
  );
}
