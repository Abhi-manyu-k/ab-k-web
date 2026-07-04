"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { cn } from "@/lib/utils";

interface DigitalBustHeroProps {
  className?: string;
  modelPath?: string;
  particleBudget?: number;
}

const vertexShader = `
uniform float uTime;
uniform float uPixelRatio;
uniform float uMotionScale;
uniform vec3 uMouse;
uniform float uMouseActive;

attribute float aSeed;

varying float vPulse;
varying float vHover;
varying float vSeed;
varying float vHeight;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 c = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 d = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, c.yyy));
  vec3 x0 = v - i + dot(i, c.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + c.xxx;
  vec3 x2 = x0 - i2 + c.yyy;
  vec3 x3 = x0 - d.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * d.wyz - d.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(
    dot(p0, p0),
    dot(p1, p1),
    dot(p2, p2),
    dot(p3, p3)
  ));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(
    dot(x0, x0),
    dot(x1, x1),
    dot(x2, x2),
    dot(x3, x3)
  ), 0.0);
  m = m * m;

  return 42.0 * dot(m * m, vec4(
    dot(p0, x0),
    dot(p1, x1),
    dot(p2, x2),
    dot(p3, x3)
  ));
}

void main() {
  vec3 p = position;
  vec3 direction = normalize(position + vec3(0.0, 0.16, 0.08));
  float breath = snoise(position * 2.15 + vec3(uTime * 0.075, uTime * 0.045, aSeed));
  float fine = snoise(position * 6.0 + vec3(aSeed, uTime * 0.11, -uTime * 0.08));

  p += direction * (breath * 0.78 + fine * 0.22) * uMotionScale;

  float mouseDistance = distance(p, uMouse);
  float hover = uMouseActive * smoothstep(0.58, 0.02, mouseDistance);
  vec3 repelDirection = normalize(p - uMouse + vec3(0.001));
  p += repelDirection * hover * 0.12;

  vec4 modelPosition = modelMatrix * vec4(p, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  float depthScale = clamp(4.2 / -viewPosition.z, 0.55, 1.8);
  float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + aSeed * 18.849 + position.y * 2.6);

  gl_Position = projectedPosition;
  gl_PointSize = (1.65 + pulse * 0.55 + hover * 1.8) * depthScale * uPixelRatio;

  vPulse = pulse;
  vHover = hover;
  vSeed = aSeed;
  vHeight = position.y;
}
`;

const fragmentShader = `
uniform float uTime;

varying float vPulse;
varying float vHover;
varying float vSeed;
varying float vHeight;

void main() {
  vec2 centered = gl_PointCoord - vec2(0.5);
  float distanceFromCenter = length(centered);
  float core = smoothstep(0.5, 0.12, distanceFromCenter);
  float halo = smoothstep(0.5, 0.0, distanceFromCenter);

  float cyanWave = smoothstep(0.72, 1.0, sin(vHeight * 4.2 + vSeed * 11.0 + uTime * 0.62) * 0.5 + 0.5);
  float amberWave = smoothstep(0.82, 1.0, sin(vHeight * -3.1 + vSeed * 15.0 - uTime * 0.44) * 0.5 + 0.5);

  vec3 base = vec3(0.36, 0.43, 0.50);
  vec3 cyan = vec3(0.27, 0.92, 1.0);
  vec3 amber = vec3(1.0, 0.62, 0.16);

  vec3 color = base;
  color = mix(color, cyan, cyanWave * 0.58 + vHover * 0.32);
  color = mix(color, amber, amberWave * 0.44);

  float alpha = core * (0.42 + vPulse * 0.22 + cyanWave * 0.26 + amberWave * 0.18 + vHover * 0.42);
  alpha += halo * (cyanWave + amberWave + vHover) * 0.08;

  if (alpha < 0.02) {
    discard;
  }

  gl_FragColor = vec4(color, alpha);
}
`;

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function normalizePositions(source: Float32Array) {
  const min = new THREE.Vector3(Infinity, Infinity, Infinity);
  const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);

  for (let i = 0; i < source.length; i += 3) {
    min.x = Math.min(min.x, source[i]);
    min.y = Math.min(min.y, source[i + 1]);
    min.z = Math.min(min.z, source[i + 2]);
    max.x = Math.max(max.x, source[i]);
    max.y = Math.max(max.y, source[i + 1]);
    max.z = Math.max(max.z, source[i + 2]);
  }

  const center = new THREE.Vector3().addVectors(min, max).multiplyScalar(0.5);
  const size = new THREE.Vector3().subVectors(max, min);
  const scale = 2.35 / Math.max(size.x, size.y, size.z, 0.001);
  const normalized = new Float32Array(source.length);

  for (let i = 0; i < source.length; i += 3) {
    normalized[i] = (source[i] - center.x) * scale;
    normalized[i + 1] = (source[i + 1] - center.y) * scale - 0.06;
    normalized[i + 2] = (source[i + 2] - center.z) * scale;
  }

  return normalized;
}

function capPositions(source: Float32Array, particleBudget: number) {
  const sourceCount = Math.floor(source.length / 3);
  const targetCount = Math.min(sourceCount, particleBudget);

  if (sourceCount <= targetCount) {
    return source;
  }

  const capped = new Float32Array(targetCount * 3);
  const stride = sourceCount / targetCount;

  for (let i = 0; i < targetCount; i += 1) {
    const jitter = seededRandom(i + 17);
    const sourceIndex = Math.min(sourceCount - 1, Math.floor((i + jitter) * stride));
    capped[i * 3] = source[sourceIndex * 3];
    capped[i * 3 + 1] = source[sourceIndex * 3 + 1];
    capped[i * 3 + 2] = source[sourceIndex * 3 + 2];
  }

  return capped;
}

function createParticleGeometry(source: Float32Array, particleBudget: number) {
  const positions = capPositions(normalizePositions(source), particleBudget);
  const count = Math.floor(positions.length / 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    seeds[i] = seededRandom(i + 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.computeBoundingSphere();

  return geometry;
}

function extractModelPositions(root: THREE.Object3D) {
  const values: number[] = [];
  const vertex = new THREE.Vector3();

  root.updateMatrixWorld(true);
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;

    if (!mesh.isMesh || !mesh.geometry) {
      return;
    }

    const position = mesh.geometry.getAttribute("position");

    if (!position) {
      return;
    }

    for (let i = 0; i < position.count; i += 1) {
      vertex.fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld);
      values.push(vertex.x, vertex.y, vertex.z);
    }
  });

  return new Float32Array(values);
}

function generateProceduralBust(particleBudget: number) {
  const positions = new Float32Array(particleBudget * 3);
  let cursor = 0;

  const push = (x: number, y: number, z: number) => {
    if (cursor >= positions.length) {
      return;
    }

    positions[cursor] = x;
    positions[cursor + 1] = y;
    positions[cursor + 2] = z;
    cursor += 3;
  };

  const smoothstep = (edge0: number, edge1: number, value: number) => {
    const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  const gauss = (value: number, center: number, width: number) => {
    const normalized = (value - center) / width;
    return Math.exp(-normalized * normalized);
  };

  const headCount = Math.floor(particleBudget * 0.66);
  const featureCount = Math.floor(particleBudget * 0.1);
  const neckCount = Math.floor(particleBudget * 0.11);
  const shoulderCount = particleBudget - headCount - featureCount - neckCount;

  for (let i = 0; i < headCount; i += 1) {
    const v = seededRandom(i + 101) * 2 - 1;
    const t = (v + 1) * 0.5;
    const theta = seededRandom(i + 203) * Math.PI * 2;
    const radius = Math.sqrt(Math.max(0, 1 - v * v));
    const frontAngle = Math.atan2(Math.sin(theta - Math.PI * 0.5), Math.cos(theta - Math.PI * 0.5));
    const front = gauss(frontAngle, 0, 0.42);
    const back = Math.max(0, -Math.sin(theta));
    const jaw = gauss(t, 0.22, 0.14);
    const cheek = gauss(t, 0.44, 0.16);
    const temple = gauss(t, 0.68, 0.18);
    const chinTaper = smoothstep(0.0, 0.18, t);
    const crownTaper = 1 - smoothstep(0.86, 1.0, t) * 0.52;
    const sideFlatten = 1 - Math.abs(Math.sin(theta)) * 0.12;
    const width = (0.16 + jaw * 0.18 + cheek * 0.25 + temple * 0.17) * chinTaper * crownTaper;
    const depth = (0.18 + Math.sin(Math.PI * t) * 0.18 + back * 0.08) * (0.72 + chinTaper * 0.28);
    const nose = front * (gauss(t, 0.52, 0.1) * 0.22 + gauss(t, 0.65, 0.13) * 0.07);
    const eyeRecess = front * gauss(t, 0.66, 0.07) * 0.04;
    const mouthRecess = front * gauss(t, 0.36, 0.06) * 0.03;
    const facePlane = front * (0.04 + cheek * 0.035 - smoothstep(0.76, 1.0, t) * 0.07);
    const x = Math.cos(theta) * radius * width * sideFlatten * (1 - nose * 0.3);
    const y = -0.04 + v * 0.95 - smoothstep(0.0, 0.16, t) * 0.1;
    const z = Math.sin(theta) * radius * depth + facePlane + nose - eyeRecess - mouthRecess;

    push(x, y + 0.52, z);
  }

  for (let i = 0; i < featureCount; i += 1) {
    const bucket = i / featureCount;
    const local = seededRandom(i + 307);
    const angle = seededRandom(i + 601) * Math.PI * 2;
    const r = Math.sqrt(seededRandom(i + 503));

    if (bucket < 0.18) {
      const bridge = Math.sin(local * Math.PI);
      push(
        Math.cos(angle) * r * (0.012 + bridge * 0.024),
        1.02 - local * 0.48,
        0.43 + bridge * 0.09 + local * 0.025 + Math.sin(angle) * r * 0.018,
      );
    } else if (bucket < 0.34) {
      const side = i % 2 === 0 ? -1 : 1;
      const arc = (local - 0.5) * 1.8;
      push(
        side * (0.16 + Math.cos(arc) * 0.1) + Math.cos(angle) * r * 0.02,
        0.83 + Math.sin(arc) * 0.025 + Math.sin(angle) * r * 0.012,
        0.42 + Math.abs(Math.sin(arc)) * 0.02,
      );
    } else if (bucket < 0.48) {
      const side = i % 2 === 0 ? -1 : 1;
      const arc = (local - 0.5) * 1.7;
      push(
        side * (0.18 + Math.cos(arc) * 0.085) + Math.cos(angle) * r * 0.018,
        0.72 + Math.sin(arc) * 0.02 + Math.sin(angle) * r * 0.012,
        0.43,
      );
    } else if (bucket < 0.62) {
      const arc = (local - 0.5) * Math.PI;
      push(
        Math.sin(arc) * 0.18 + Math.cos(angle) * r * 0.018,
        0.43 + Math.cos(arc) * 0.018 + Math.sin(angle) * r * 0.012,
        0.42 + Math.abs(Math.sin(arc)) * 0.018,
      );
    } else if (bucket < 0.72) {
      const side = i % 2 === 0 ? -1 : 1;
      push(
        side * (0.17 + local * 0.16),
        0.22 - local * 0.12 + Math.sin(angle) * r * 0.018,
        0.33 + Math.cos(angle) * r * 0.02,
      );
    } else {
      const side = i % 2 === 0 ? -1 : 1;
      const earAngle = local * Math.PI * 2;
      const shell = 0.72 + r * 0.28;
      push(
        side * (0.43 + Math.cos(angle) * 0.025),
        0.66 + Math.sin(earAngle) * 0.19 * shell,
        -0.02 + Math.cos(earAngle) * 0.085 * shell,
      );
    }
  }

  for (let i = 0; i < neckCount; i += 1) {
    const t = seededRandom(i + 809);
    const angle = seededRandom(i + 907) * Math.PI * 2;
    const r = Math.sqrt(seededRandom(i + 1009));
    push(
      Math.cos(angle) * r * 0.23,
      -0.36 + t * 0.52,
      Math.sin(angle) * r * 0.18 - 0.03,
    );
  }

  for (let i = 0; i < shoulderCount; i += 1) {
    const angle = seededRandom(i + 1103) * Math.PI * 2;
    const r = Math.sqrt(seededRandom(i + 1201));
    const x = Math.cos(angle) * r * 0.98;
    const z = Math.sin(angle) * r * 0.34 - 0.08;
    const slope = Math.abs(x) * 0.18;
    push(x, -0.76 - slope + seededRandom(i + 1301) * 0.18, z);
  }

  return positions.slice(0, cursor);
}

export function DigitalBustHero({
  className,
  modelPath = "/models/digital-head.glb",
  particleBudget = 12000,
}: DigitalBustHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    let points: THREE.Points | null = null;
    let geometry: THREE.BufferGeometry | null = null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.08, 5.1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = -0.03;
    group.rotation.y = -0.52;
    scene.add(group);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) },
        uMotionScale: { value: reduceMotion ? 0.008 : 0.035 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uMouseActive: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const hitPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hitPoint = new THREE.Vector3();

    const setGeometry = (nextGeometry: THREE.BufferGeometry) => {
      if (disposed) {
        nextGeometry.dispose();
        return;
      }

      if (points) {
        group.remove(points);
        geometry?.dispose();
      }

      geometry = nextGeometry;
      points = new THREE.Points(geometry, material);
      group.add(points);
    };

    const loadFallback = () => {
      setGeometry(createParticleGeometry(generateProceduralBust(particleBudget), particleBudget));
    };

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const positions = extractModelPositions(gltf.scene);

        if (positions.length < 900) {
          loadFallback();
          return;
        }

        setGeometry(createParticleGeometry(positions, particleBudget));
      },
      undefined,
      loadFallback,
    );

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      material.uniforms.uPixelRatio.value = pixelRatio;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();

      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      raycaster.setFromCamera(pointer, camera);

      if (raycaster.ray.intersectPlane(hitPlane, hitPoint)) {
        group.worldToLocal(hitPoint);
        material.uniforms.uMouse.value.copy(hitPoint);
        material.uniforms.uMouseActive.value = reduceMotion ? 0.35 : 1;
      }
    };

    const handlePointerLeave = () => {
      material.uniforms.uMouseActive.value = 0;
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      material.uniforms.uMotionScale.value = reduceMotion ? 0.008 : 0.035;
      material.uniforms.uMouseActive.value = 0;
    };

    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    motionQuery.addEventListener("change", handleMotionChange);

    const startedAt = performance.now();
    const render = () => {
      if (disposed) {
        return;
      }

      const elapsed = (performance.now() - startedAt) / 1000;
      material.uniforms.uTime.value = elapsed;

      if (!reduceMotion) {
        group.rotation.y = -0.52 + elapsed * 0.055;
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
      resizeObserver.disconnect();
      geometry?.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [modelPath, particleBudget]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate min-h-[320px] w-full overflow-hidden bg-[#0a0a0c]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_54%_38%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_44%_62%,rgba(245,158,11,0.09),transparent_36%)]",
        "after:pointer-events-none after:absolute after:inset-x-8 after:bottom-8 after:h-px after:bg-gradient-to-r after:from-transparent after:via-cyan-info/30 after:to-transparent",
        className,
      )}
      aria-hidden="true"
    />
  );
}
