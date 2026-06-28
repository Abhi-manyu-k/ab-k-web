"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import {
  createProceduralBustPointCloud,
  extractPointCloudFromObject,
  type BustPointCloud,
} from "@/lib/three/bustPointCloud";
import {
  particleBustFragmentShaderGLSL3,
  particleBustVertexShaderGLSL3,
} from "@/lib/shaders/particleBust";

const BUST_MODEL_PATH = "/models/bust-head.glb";
const PARTICLE_COUNT = 14000;
const INTERACTION_SPHERE = new THREE.Sphere(new THREE.Vector3(0, 0.28, 0), 0.72);

interface ParticleBustProps {
  interactive?: boolean;
  lowMotion?: boolean;
}

function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: {
      uTime: { value: 0 },
      uMouseWorld: { value: new THREE.Vector3(0, 0.28, 0.5) },
      uMouseStrength: { value: 0 },
    },
    vertexShader: particleBustVertexShaderGLSL3,
    fragmentShader: particleBustFragmentShaderGLSL3,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function buildGeometry(cloud: BustPointCloud) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
  geometry.setAttribute("aNormal", new THREE.BufferAttribute(cloud.normals, 3));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(cloud.randoms, 1));
  return geometry;
}

function ParticleBustPoints({
  cloud,
  interactive = true,
  lowMotion = false,
}: {
  cloud: BustPointCloud;
  interactive?: boolean;
  lowMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, pointer } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseWorld = useMemo(() => new THREE.Vector3(0, 0.28, 0.5), []);
  const hitPoint = useMemo(() => new THREE.Vector3(), []);
  const smoothMouse = useMemo(() => new THREE.Vector3(0, 0.28, 0.5), []);

  const geometry = useMemo(() => buildGeometry(cloud), [cloud]);
  const material = useMemo(() => createParticleMaterial(), []);

  useEffect(() => {
    materialRef.current = material;
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    if (!groupRef.current || !materialRef.current) return;

    if (!lowMotion) {
      groupRef.current.rotation.y += delta * 0.18;
    }

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    let strength = 0;
    if (interactive) {
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectSphere(INTERACTION_SPHERE, hitPoint)) {
        mouseWorld.copy(hitPoint);
        groupRef.current.worldToLocal(mouseWorld);
        strength = 1;
      }

      smoothMouse.lerp(mouseWorld, 0.12);
      materialRef.current.uniforms.uMouseWorld.value.copy(smoothMouse);
      materialRef.current.uniforms.uMouseStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouseStrength.value,
        strength,
        0.1,
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.12, 0]}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

function ParticleBustFromGLTF({
  interactive,
  lowMotion,
}: ParticleBustProps) {
  const gltf = useGLTF(BUST_MODEL_PATH);
  const cloud = useMemo(
    () => extractPointCloudFromObject(gltf.scene, PARTICLE_COUNT),
    [gltf.scene],
  );
  return (
    <ParticleBustPoints cloud={cloud} interactive={interactive} lowMotion={lowMotion} />
  );
}

function ParticleBustProcedural({
  interactive,
  lowMotion,
}: ParticleBustProps) {
  const cloud = useMemo(() => createProceduralBustPointCloud(PARTICLE_COUNT), []);
  return (
    <ParticleBustPoints cloud={cloud} interactive={interactive} lowMotion={lowMotion} />
  );
}

export function ParticleBust({
  interactive = true,
  lowMotion = false,
}: ParticleBustProps) {
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(BUST_MODEL_PATH, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setModelReady(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (modelReady) {
    return (
      <Suspense
        fallback={
          <ParticleBustProcedural interactive={interactive} lowMotion={lowMotion} />
        }
      >
        <ParticleBustFromGLTF interactive={interactive} lowMotion={lowMotion} />
      </Suspense>
    );
  }

  return <ParticleBustProcedural interactive={interactive} lowMotion={lowMotion} />;
}
