import { ArrowHelper, Vector3 } from "three";
import { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";

type Props = {
  from?: [number, number, number];
  to: [number, number, number];
  color?: string;
  label?: string;
};

export function VectorArrow({
  from = [0, 0, 0],
  to,
  color = "white",
  label,
}: Props) {
  const ref = useRef<ArrowHelper>(null);

  useEffect(() => {
    const dir = new Vector3(...to).sub(new Vector3(...from)).normalize();
    const len = new Vector3(...to).sub(new Vector3(...from)).length();
    if (ref.current) {
      ref.current.setDirection(dir);
      ref.current.setLength(len);
    }
  }, [from, to]);

  return (
    <>
      <arrowHelper
        ref={ref}
        args={[
          new Vector3(...to).sub(new Vector3(...from)).normalize(),
          new Vector3(...from),
          new Vector3(...to).sub(new Vector3(...from)).length(),
          color,
        ]}
      />
      {label && (
        <Text
          position={to}
          fontSize={0.2}
          color={color}
          fontStyle="italic"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </>
  );
}
