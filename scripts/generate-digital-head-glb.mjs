import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outputPath = resolve("public/models/digital-head.glb");
const vertexCount = 12000;

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function generateBustPositions(count) {
  const positions = new Float32Array(count * 3);
  let cursor = 0;

  const push = (x, y, z) => {
    if (cursor >= positions.length) {
      return;
    }

    positions[cursor] = x;
    positions[cursor + 1] = y;
    positions[cursor + 2] = z;
    cursor += 3;
  };

  const smoothstep = (edge0, edge1, value) => {
    const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  const gauss = (value, center, width) => {
    const normalized = (value - center) / width;
    return Math.exp(-normalized * normalized);
  };

  const headCount = Math.floor(count * 0.66);
  const featureCount = Math.floor(count * 0.1);
  const neckCount = Math.floor(count * 0.11);
  const shoulderCount = count - headCount - featureCount - neckCount;

  for (let i = 0; i < headCount; i += 1) {
    const v = seededRandom(i + 101) * 2 - 1;
    const t = (v + 1) * 0.5;
    const theta = seededRandom(i + 203) * Math.PI * 2;
    const sphereRadius = Math.sqrt(Math.max(0, 1 - v * v));
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
    const y = -0.04 + v * 0.95 - smoothstep(0.0, 0.16, t) * 0.1;
    const x = Math.cos(theta) * sphereRadius * width * sideFlatten * (1 - nose * 0.3);
    const z = Math.sin(theta) * sphereRadius * depth + facePlane + nose - eyeRecess - mouthRecess;

    push(x, y + 0.52, z);
  }

  for (let i = 0; i < featureCount; i += 1) {
    const bucket = i / featureCount;
    const local = seededRandom(i + 307);
    const angle = seededRandom(i + 401) * Math.PI * 2;
    const r = Math.sqrt(seededRandom(i + 503));

    if (bucket < 0.18) {
      const t = local;
      const bridge = Math.sin(t * Math.PI);
      push(
        Math.cos(angle) * r * (0.012 + bridge * 0.024),
        1.02 - t * 0.48,
        0.43 + bridge * 0.09 + t * 0.025 + Math.sin(angle) * r * 0.018,
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
      const t = local;
      push(
        side * (0.17 + t * 0.16),
        0.22 - t * 0.12 + Math.sin(angle) * r * 0.018,
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

  return positions;
}

function align4(value) {
  return (value + 3) & ~3;
}

function createGlb(positions) {
  const bin = Buffer.from(positions.buffer);
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (let i = 0; i < positions.length; i += 3) {
    min[0] = Math.min(min[0], positions[i]);
    min[1] = Math.min(min[1], positions[i + 1]);
    min[2] = Math.min(min[2], positions[i + 2]);
    max[0] = Math.max(max[0], positions[i]);
    max[1] = Math.max(max[1], positions[i + 1]);
    max[2] = Math.max(max[2], positions[i + 2]);
  }

  const json = JSON.stringify({
    asset: {
      version: "2.0",
      generator: "AB Kinetics procedural digital bust",
    },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ name: "DigitalHeadBust", mesh: 0 }],
    meshes: [
      {
        name: "DigitalHeadBustMesh",
        primitives: [
          {
            attributes: { POSITION: 0 },
            mode: 4,
          },
        ],
      },
    ],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: positions.length / 3,
        type: "VEC3",
        min,
        max,
      },
    ],
    bufferViews: [
      {
        buffer: 0,
        byteOffset: 0,
        byteLength: bin.length,
        target: 34962,
      },
    ],
    buffers: [{ byteLength: bin.length }],
  });

  const jsonLength = align4(Buffer.byteLength(json));
  const binLength = align4(bin.length);
  const glb = Buffer.alloc(12 + 8 + jsonLength + 8 + binLength);
  let offset = 0;

  glb.writeUInt32LE(0x46546c67, offset);
  offset += 4;
  glb.writeUInt32LE(2, offset);
  offset += 4;
  glb.writeUInt32LE(glb.length, offset);
  offset += 4;

  glb.writeUInt32LE(jsonLength, offset);
  offset += 4;
  glb.writeUInt32LE(0x4e4f534a, offset);
  offset += 4;
  glb.write(json, offset);
  glb.fill(0x20, offset + Buffer.byteLength(json), offset + jsonLength);
  offset += jsonLength;

  glb.writeUInt32LE(binLength, offset);
  offset += 4;
  glb.writeUInt32LE(0x004e4942, offset);
  offset += 4;
  bin.copy(glb, offset);

  return glb;
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, createGlb(generateBustPositions(vertexCount)));
console.log(`Wrote ${outputPath}`);
