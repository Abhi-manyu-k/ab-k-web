import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export interface BustPointCloud {
  positions: Float32Array;
  normals: Float32Array;
  randoms: Float32Array;
  count: number;
}

function deformHead(geometry: THREE.SphereGeometry) {
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    if (z < 0) z *= 0.82;
    y *= 1.08;
    x *= 0.9;

    if (y < -0.25) {
      const t = THREE.MathUtils.clamp((-0.25 - y) / 0.75, 0, 1);
      x *= 1 - t * 0.38;
      z *= 1 - t * 0.25;
    }

    if (y > 0.35 && z > 0) {
      z *= 0.88;
    }

    pos.setXYZ(i, x, y, z);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
}

function createProceduralBustMesh() {
  const parts: THREE.BufferGeometry[] = [];

  const head = new THREE.SphereGeometry(1, 72, 72);
  deformHead(head);
  head.scale(0.54, 0.6, 0.52);
  head.translate(0, 0.44, 0);
  parts.push(head);

  const neck = new THREE.CylinderGeometry(0.19, 0.27, 0.34, 36);
  neck.translate(0, 0.06, 0);
  parts.push(neck);

  const shoulders = new THREE.SphereGeometry(
    1,
    56,
    28,
    0,
    Math.PI * 2,
    Math.PI * 0.42,
    Math.PI * 0.38,
  );
  shoulders.scale(0.9, 0.38, 0.58);
  shoulders.translate(0, -0.2, 0.02);
  parts.push(shoulders);

  const merged = mergeGeometries(parts, false);
  if (!merged) throw new Error("Failed to merge bust geometries");
  merged.computeVertexNormals();
  return merged;
}

function sampleMesh(mesh: THREE.Mesh, count: number): BustPointCloud {
  const sampler = new MeshSurfaceSampler(mesh).build();
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const randoms = new Float32Array(count);

  const tempPos = new THREE.Vector3();
  const tempNorm = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    sampler.sample(tempPos, tempNorm);
    positions[i * 3] = tempPos.x;
    positions[i * 3 + 1] = tempPos.y;
    positions[i * 3 + 2] = tempPos.z;
    normals[i * 3] = tempNorm.x;
    normals[i * 3 + 1] = tempNorm.y;
    normals[i * 3 + 2] = tempNorm.z;
    randoms[i] = Math.random();
  }

  return { positions, normals, randoms, count };
}

export function createProceduralBustPointCloud(count = 14000): BustPointCloud {
  const geometry = createProceduralBustMesh();
  const mesh = new THREE.Mesh(geometry);
  const cloud = sampleMesh(mesh, count);
  geometry.dispose();
  return cloud;
}

export function extractPointCloudFromObject(
  object: THREE.Object3D,
  count = 14000,
): BustPointCloud {
  const geometries: THREE.BufferGeometry[] = [];

  object.updateWorldMatrix(true, true);
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const geo = child.geometry.clone();
    geo.applyMatrix4(child.matrixWorld);
    geometries.push(geo);
  });

  if (geometries.length === 0) {
    return createProceduralBustPointCloud(count);
  }

  const merged = mergeGeometries(geometries, false);
  geometries.forEach((g) => g.dispose());

  if (!merged) {
    return createProceduralBustPointCloud(count);
  }

  merged.computeVertexNormals();
  const mesh = new THREE.Mesh(merged);
  const cloud = sampleMesh(mesh, count);
  merged.dispose();
  return cloud;
}
