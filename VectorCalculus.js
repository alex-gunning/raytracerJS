const Vector = (x, y, z) => ({
  x,
  y,
  z,
  unaryMinus: () => Vector(-x, -y, -z),
  plus: (other) => Vector(x + other.x, y + other.y, z + other.z),
  minus: (other) => Vector(x - other.x, y - other.y, z - other.z),
  vecDistanceTo: (other) =>
    Math.sqrt(
      (x - other.x).pow(2) + (y - other.y).pow(2) + (z - other.z).pow(2)
    ),
  dot: (other) => this.x * other.x + this.y * other.y + this.z * other.z,
  cross: (other) =>
    Vector(
      y * other.z - z * other.y,
      -(x * other.z - z * other.x),
      x * other.y - y * other.x
    ),
  length: () => Math.sqrt(this.dot(this)),
  rotY: (thetaDegrees) => {
    const thetaRadians = degreesToRadians(thetaDegrees);
    return [
      x * Math.cos(thetaRadians) + z * Math.sin(thetaRadians),
      y,
      -(x * Math.sin(thetaRadians)) + z * Math.cos(thetaRadians),
    ];
  },
  rotX: (thetaDegrees) => {
    const thetaRadians = degreesToRadians(thetaDegrees);
    return [
      x,
      y * Math.cos(thetaRadians) - z * Math.sin(thetaRadians),
      y * Math.sin(thetaRadians) + z * Math.cos(thetaRadians),
    ];
  },
  toArray: () => [x, y, z],
});

const rotX = (thetaDegrees, arr) => {
  const thetaRadians = degreesToRadians(thetaDegrees);
  const [x, y, z] = arr;
  return [
    x,
    y * Math.cos(thetaRadians) - z * Math.sin(thetaRadians),
    y * Math.sin(thetaRadians) + z * Math.cos(thetaRadians),
  ];
};

const rotY = (thetaDegrees, arr) => {
  const thetaRadians = degreesToRadians(thetaDegrees);
  const [x, y, z] = arr;
  return [
    x * Math.cos(thetaRadians) + z * Math.sin(thetaRadians),
    y,
    -(x * Math.sin(thetaRadians)) + z * Math.cos(thetaRadians),
  ];
};

const Line = (p1, p2) => ({
  length: () => {
    v1 = p2 - p1;
    return v1.length();
  },
});

function degreesToRadians(degrees) {
  return (Math.PI / 180) * degrees;
}
function distanceTo(vecX, vecY, vecZ, otherX, otherY, otherZ) {
  return Math.sqrt(
    Math.pow(vecX - otherX, 2) +
      Math.pow(vecY - otherY, 2) +
      Math.pow(vecZ - otherZ, 2)
  );
}
function crossX(vecX, vecY, vecZ, otherX, otherY, otherZ) {
  return vecY * otherZ - vecZ * otherY;
}
function crossY(vecX, vecY, vecZ, otherX, otherY, otherZ) {
  return -(vecX * otherZ - vecZ * otherX);
}
function crossZ(vecX, vecY, vecZ, otherX, otherY, otherZ) {
  return vecX * otherY - vecY * otherX;
}
function triangleNormalX(p1X, p1Y, p1Z, p2X, p2Y, p2Z, p3X, p3Y, p3Z) {
  const vec1X = p3X - p2X;
  const vec1Y = p3Y - p2Y;
  const vec1Z = p3Z - p2Z;

  const vec2X = p2X - p1X;
  const vec2Y = p2Y - p1Y;
  const vec2Z = p2Z - p1Z;

  const crsX = crossX(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  const crsY = crossY(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  const crsZ = crossZ(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  return crsX;
}
function triangleNormalY(p1X, p1Y, p1Z, p2X, p2Y, p2Z, p3X, p3Y, p3Z) {
  const vec1X = p3X - p2X;
  const vec1Y = p3Y - p2Y;
  const vec1Z = p3Z - p2Z;

  const vec2X = p2X - p1X;
  const vec2Y = p2Y - p1Y;
  const vec2Z = p2Z - p1Z;

  const crsY = crossY(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  return crsY;
}
function triangleNormalZ(p1X, p1Y, p1Z, p2X, p2Y, p2Z, p3X, p3Y, p3Z) {
  const vec1X = p3X - p2X;
  const vec1Y = p3Y - p2Y;
  const vec1Z = p3Z - p2Z;

  const vec2X = p2X - p1X;
  const vec2Y = p2Y - p1Y;
  const vec2Z = p2Z - p1Z;

  const crsZ = crossZ(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  return crsZ;
}
function vectorX(p1X, p1Y, p1Z, p2X, p2Y, p2Z) {
  return p2X - p1X;
}
function vectorY(p1X, p1Y, p1Z, p2X, p2Y, p2Z) {
  return p2Y - p1Y;
}
function vectorZ(p1X, p1Y, p1Z, p2X, p2Y, p2Z) {
  return p2Z - p1Z;
}
function rotXx(vecX, vecY, vecZ, theta) {
  return vecX;
}
function rotXy(vecX, vecY, vecZ, theta) {
  const thetaRadians = degreesToRadians(theta);
  return vecY * Math.cos(thetaRadians) - vecZ * Math.sin(thetaRadians);
}
function rotXz(vecX, vecY, vecZ, theta) {
  const thetaRadians = degreesToRadians(theta);
  return vecY * Math.sin(thetaRadians) + vecZ * Math.cos(thetaRadians);
}
function rotYx(vecX, vecY, vecZ, theta) {
  const thetaRadians = degreesToRadians(theta);
  return vecX * Math.cos(thetaRadians) + vecZ * Math.sin(thetaRadians);
}
function rotYy(vecX, vecY, vecZ, theta) {
  return vecY;
}
function rotYz(vecX, vecY, vecZ, theta) {
  const thetaRadians = degreesToRadians(theta);
  return -(vecX * Math.sin(thetaRadians)) + vecZ * Math.cos(thetaRadians);
}
function dot(vecX, vecY, vecZ, otherX, otherY, otherZ) {
  return vecX * otherX + vecY * otherY + vecZ * otherZ;
}
function k(normalX, normalY, normalZ, p1X, p1Y, p1Z) {
  return -dot(normalX, normalY, normalZ, p1X, p1Y, p1Z);
}
function distanceToTriangle(
  originX,
  originY,
  originZ,
  viewPlaneX,
  viewPlaneY,
  viewPlaneZ,
  triangleP1x,
  triangleP1y,
  triangleP1z,
  triangleP2x,
  triangleP2y,
  triangleP2z,
  triangleP3x,
  triangleP3y,
  triangleP3z
) {
  // is within triangle?c
  const normalX = triangleNormalX(
    triangleP1x,
    triangleP1y,
    triangleP1z,
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const normalY = triangleNormalY(
    triangleP1x,
    triangleP1y,
    triangleP1z,
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const normalZ = triangleNormalZ(
    triangleP1x,
    triangleP1y,
    triangleP1z,
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );

  const numerator =
    dot(normalX, normalY, normalZ, originX, originY, originZ) +
    -dot(normalX, normalY, normalZ, triangleP1x, triangleP1y, triangleP1z);
  const denominator = dot(
    viewPlaneX,
    viewPlaneY,
    viewPlaneZ,
    normalX,
    normalY,
    normalZ
  );
  let delta = -(numerator / denominator);

  const intersectionPointX = delta * viewPlaneX + originX;
  const intersectionPointY = delta * viewPlaneY + originY;
  const intersectionPointZ = delta * viewPlaneZ + originZ;

  const v1X = vectorX(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );
  const v1Y = vectorY(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );
  const v1Z = vectorZ(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );

  const v2X = vectorX(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP1x,
    triangleP1y,
    triangleP1z
  );
  const v2Y = vectorY(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP1x,
    triangleP1y,
    triangleP1z
  );
  const v2Z = vectorZ(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP1x,
    triangleP1y,
    triangleP1z
  );

  const v3X = vectorX(
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP1x,
    triangleP1y,
    triangleP1z
  );
  const v3Y = vectorY(
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP1x,
    triangleP1y,
    triangleP1z
  );
  const v3Z = vectorZ(
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP1x,
    triangleP1y,
    triangleP1z
  );

  const a1IntVecX = vectorX(
    intersectionPointX,
    intersectionPointY,
    intersectionPointZ,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const a1IntVecY = vectorY(
    intersectionPointX,
    intersectionPointY,
    intersectionPointZ,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const a1IntVecZ = vectorZ(
    intersectionPointX,
    intersectionPointY,
    intersectionPointZ,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );

  // a2IntVec = a1IntVec

  const a3IntVecX = vectorX(
    intersectionPointX,
    intersectionPointY,
    intersectionPointZ,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );
  const a3IntVecY = vectorY(
    intersectionPointX,
    intersectionPointY,
    intersectionPointZ,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );
  const a3IntVecZ = vectorZ(
    intersectionPointX,
    intersectionPointY,
    intersectionPointZ,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );

  const a1X = crossX(v1X, v1Y, v1Z, a1IntVecX, a1IntVecY, a1IntVecZ);
  const a1Y = crossY(v1X, v1Y, v1Z, a1IntVecX, a1IntVecY, a1IntVecZ);
  const a1Z = crossZ(v1X, v1Y, v1Z, a1IntVecX, a1IntVecY, a1IntVecZ);

  const a2X = crossX(v2X, v2Y, v2Z, a1IntVecX, a1IntVecY, a1IntVecZ);
  const a2Y = crossY(v2X, v2Y, v2Z, a1IntVecX, a1IntVecY, a1IntVecZ);
  const a2Z = crossZ(v2X, v2Y, v2Z, a1IntVecX, a1IntVecY, a1IntVecZ);

  const a3X = crossX(v3X, v3Y, v3Z, a3IntVecX, a3IntVecY, a3IntVecZ);
  const a3Y = crossY(v3X, v3Y, v3Z, a3IntVecX, a3IntVecY, a3IntVecZ);
  const a3Z = crossZ(v3X, v3Y, v3Z, a3IntVecX, a3IntVecY, a3IntVecZ);

  const b1IntVecX = vectorX(
    triangleP1x,
    triangleP1y,
    triangleP1z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const b1IntVecY = vectorY(
    triangleP1x,
    triangleP1y,
    triangleP1z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const b1IntVecZ = vectorZ(
    triangleP1x,
    triangleP1y,
    triangleP1z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );

  const b2IntVecX = vectorX(
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const b2IntVecY = vectorY(
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );
  const b2IntVecZ = vectorZ(
    triangleP2x,
    triangleP2y,
    triangleP2z,
    triangleP3x,
    triangleP3y,
    triangleP3z
  );

  const b3IntVecX = vectorX(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );
  const b3IntVecY = vectorY(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );
  const b3IntVecZ = vectorZ(
    triangleP3x,
    triangleP3y,
    triangleP3z,
    triangleP2x,
    triangleP2y,
    triangleP2z
  );

  const b1X = crossX(v1X, v1Y, v1Z, b1IntVecX, b1IntVecY, b1IntVecZ);
  const b1Y = crossY(v1X, v1Y, v1Z, b1IntVecX, b1IntVecY, b1IntVecZ);
  const b1Z = crossZ(v1X, v1Y, v1Z, b1IntVecX, b1IntVecY, b1IntVecZ);

  const b2X = crossX(v2X, v2Y, v2Z, b2IntVecX, b2IntVecY, b2IntVecZ);
  const b2Y = crossY(v2X, v2Y, v2Z, b2IntVecX, b2IntVecY, b2IntVecZ);
  const b2Z = crossZ(v2X, v2Y, v2Z, b2IntVecX, b2IntVecY, b2IntVecZ);

  const b3X = crossX(v3X, v3Y, v3Z, b3IntVecX, b3IntVecY, b3IntVecZ);
  const b3Y = crossY(v3X, v3Y, v3Z, b3IntVecX, b3IntVecY, b3IntVecZ);
  const b3Z = crossZ(v3X, v3Y, v3Z, b3IntVecX, b3IntVecY, b3IntVecZ);

  const c1 = dot(a1X, a1Y, a1Z, b1X, b1Y, b1Z);
  const c2 = dot(a2X, a2Y, a2Z, b2X, b2Y, b2Z);
  const c3 = dot(a3X, a3Y, a3Z, b3X, b3Y, b3Z);

  const withinTriangle = c1 >= 0 && c2 >= 0 && c3 >= 0;

  const distanceToTriangle = withinTriangle
    ? 1 /
      distanceTo(
        intersectionPointX,
        intersectionPointY,
        intersectionPointZ,
        originX,
        originY,
        originZ
      )
    : -1;

  return distanceToTriangle;
}

function unitVectorX(vecX, vecY, vecZ) {
  const length = Math.sqrt(vecX * vecX + vecY * vecY + vecZ * vecZ)
  return vecX/length
}
function unitVectorY(vecX, vecY, vecZ) {
  const length = Math.sqrt(vecX * vecX + vecY * vecY + vecZ * vecZ)
  return vecY/length
}
function unitVectorZ(vecX, vecY, vecZ) {
  const length = Math.sqrt(vecX * vecX + vecY * vecY + vecZ * vecZ)
  return vecZ/length
}

function distanceToSphere(
  sphereX,
  sphereY,
  sphereZ,
  radius,
  originX,
  originY,
  originZ,
  viewPlaneX,
  viewPlaneY,
  viewPlaneZ
) {
  const rayX = sphereX - viewPlaneX// - originX
  const rayY = sphereY - viewPlaneY// - originY
  const rayZ = sphereZ - viewPlaneZ// - originZ

  const unitRayX = unitVectorX(rayX, rayY, rayZ)
  const unitRayY = unitVectorY(rayX, rayY, rayZ)
  const unitRayZ = unitVectorZ(rayX, rayY, rayZ)

  const a = Math.pow(unitRayX, 2) + Math.pow(unitRayY, 2) + Math.pow(unitRayZ, 2)
  const b = -2*(unitRayX * (sphereX - originX) + unitRayY * (sphereY - originY) + unitRayZ * (sphereZ - originZ))
  const c = Math.pow(rayX, 2) + Math.pow(rayY, 2) + Math.pow(rayZ, 2) - Math.pow(radius, 2)

  const delta = Math.pow(b, 2) - 4*a*c

  // const cameraToSphereCenterX = sphereX - originX
  // const cameraToSphereCenterY = sphereY - originY
  // const cameraToSphereCenterZ = sphereZ - originZ

  // const cameraToSphereCenterX = unitRayX - sphereX
  // const cameraToSphereCenterY = unitRayY - sphereY
  // const cameraToSphereCenterZ = unitRayZ - sphereZ

  // const rayToCenterMagnitude = dot(unitRayX, unitRayY, unitRayZ, cameraToSphereCenterX, cameraToSphereCenterY, cameraToSphereCenterZ)
  // const a = Math.pow(rayToCenterMagnitude, 2)
  // const b = dot(cameraToSphereCenterX, cameraToSphereCenterY, cameraToSphereCenterZ, cameraToSphereCenterX, cameraToSphereCenterY, cameraToSphereCenterZ) - Math.pow(radius, 2)
  // const delta = a - b

  if(delta > 0) {
    // const distance = -(rayToCenterMagnitude) - Math.sqrt(delta)
    // const inverseDistance = 1 / distance
    const distance = (-b - Math.sqrt(Math.pow(b, 2) - 4*a*c))/ (2 * a)
    return 1 / distance
  } else {
    return -1
  }
}

const vecTriangleNormal = (p1X, p1Y, p1Z, p2X, p2Y, p2Z, p3X, p3Y, p3Z) => {
  const vec1X = p3X - p2X;
  const vec1Y = p3Y - p2Y;
  const vec1Z = p3Z - p2Z;

  const vec2X = p2X - p1X;
  const vec2Y = p2Y - p1Y;
  const vec2Z = p2Z - p1Z;

  const crsX = crossX(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  const crsY = crossY(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  const crsZ = crossZ(vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z);
  return [crsX, crsY, crsZ];
};
const vecDot = (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
const Plane = (point, normal) => ({ point, normal });
const Triangle = (p1, p2, p3) => ({
  p1,
  p2,
  p3,
  normal: () => {
    const v1 = p3.minus(p2);
    const v2 = p2.minus(p1);
    const { x, y, z } = v1.cross(v2);
    return [x, y, z];
  },
  // Plane constant "k"
  k: () =>
    -vecDot(
      vecTriangleNormal(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z),
      p1.toArray()
    ),
  toArray: () => [p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z],
});

let pieceWiseFuncs = [
  k,
  dot,
  distanceTo,
  degreesToRadians,
  vectorX,
  vectorY,
  vectorZ,
  unitVectorX,
  unitVectorY,
  unitVectorZ,
  rotXx,
  rotXy,
  rotXz,
  rotYx,
  rotYy,
  rotYz,
  crossX,
  crossY,
  crossZ,
  triangleNormalX,
  triangleNormalY,
  triangleNormalZ,
  distanceToTriangle,
  distanceToSphere
];
