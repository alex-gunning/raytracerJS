const RGBColour = (r, g, b) => ({ r, g, b });
const TriangleDrawable = (triangle, colour) => ([
    0,                      // Type
    ...triangle.toArray(),  // Points
    colour.r / 255,
    colour.g / 255,
    colour.b / 255
])
const SphereDrawable = (x, y, z, radius, colour) => ([
    1,
    x,
    y,
    z,
    radius,
    colour.r / 255,
    colour.g / 255,
    colour.b / 255
])
const intersection = (distance, colour) => ({ distance, colour });

const getPixelIntensitiesForTriangle = (cameraOrigin, viewPlane, drawable) => {
  const intersections = calcIntersectionPoints(
    drawable.triangle,
    viewPlane,
    cameraOrigin
  );
};

const calcViewWinners = (intersections) =>
  Array(intersections.length).map((y) =>
    Array(intersections[0].length).map((x) =>
      intersections.reduceRight(
        (max, curr) => (curr[y][x].distance > max.distance ? curr : max),
        intersection(0.0, RGBColour(0, 0, 0))
      )
    )
  );

const angle = (x, y, pixelSize, pixDimension, pitchDegrees, yawDegrees) => {
  const focus = [
    pixelSize * (x - pixDimension / 2),
    pixelSize * (y - pixDimension / 2),
    1.0,
  ];
  return rotX(pitchDegrees, rotY(yawDegrees, focus))
};

const buildViewPlaneAngles = (
  pixDimension,
  pixelSize,
  pitchDegrees,
  yawDegrees
) =>
  Array(pixDimension)
    .fill(0)
    .map((_, y) =>
      Array(pixDimension)
        .fill(0)
        .map((__, x) =>
          angle(x, y, pixelSize, pixDimension, pitchDegrees, yawDegrees)
        )
    ).reverse();
