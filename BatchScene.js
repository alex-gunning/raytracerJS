const calcIntersectionPoints = (
  pixelDimension,
  pixelSize,
  scene,
  origin,
  pitchDegrees,
  yawDegrees,
  kernel
) => {
  const { x, y, z } = origin;
  const originXYZ = [x, y, z];


  // console.time();
  kernel(pixelDimension, pixelSize, scene, originXYZ, yawDegrees, pitchDegrees)
  // console.log(kernel(pixelDimension, pixelSize, scene, originXYZ, yawDegrees, pitchDegrees));
  // console.timeEnd();
};

const getKernel = (pixelDimension, canvasHandle) => {
  const gpu = new GPU({
    mode: "gpu",
    // mode: 'dev',
  });
  pieceWiseFuncs.forEach((func) => gpu.addFunction(func));

  const kernelOpts = {
    output: [pixelDimension, pixelDimension],
    graphical: true,
    canvas: canvasHandle,
    constants: {
      ENTITY_COUNT: 4,
    },
  };
  const calculatePixel = gpu.createKernel(function (
    pixelDimension,
    pixelSize,
    entities,
    origin,
    pitchDegrees,
    yawDegrees
  ) {
    const x = this.thread.x;
    const y = this.thread.y;
    const viewPlaneInterceptX = pixelSize * (x - pixelDimension / 2);
    const viewPlaneInterceptY = pixelSize * (y - pixelDimension / 2);
    const viewPlaneInterceptZ = 1.0;

    const viewPlaneXrotY = rotYx(
      viewPlaneInterceptX,
      viewPlaneInterceptY,
      viewPlaneInterceptZ,
      pitchDegrees
    );
    const viewPlaneYrotY = rotYy(
      viewPlaneInterceptX,
      viewPlaneInterceptY,
      viewPlaneInterceptZ,
      pitchDegrees
    );
    const viewPlaneZrotY = rotYz(
      viewPlaneInterceptX,
      viewPlaneInterceptY,
      viewPlaneInterceptZ,
      pitchDegrees
    );

    const viewPlaneX = rotXx(
      viewPlaneXrotY,
      viewPlaneYrotY,
      viewPlaneZrotY,
      yawDegrees
    );
    const viewPlaneY = rotXy(
      viewPlaneXrotY,
      viewPlaneYrotY,
      viewPlaneZrotY,
      yawDegrees
    );
    const viewPlaneZ = rotXz(
      viewPlaneXrotY,
      viewPlaneYrotY,
      viewPlaneZrotY,
      yawDegrees
    );

    let closestDistance = -1.0;
    let closestR = 0;
    let closestG = 0;
    let closestB = 0;
    for (let i = 0; i < this.constants.ENTITY_COUNT; i++) {
      const entityType = entities[i][0];

      if (entityType == 0) {
        // Triangle calculations

        const triangleP1x = entities[i][1];
        const triangleP1y = entities[i][2];
        const triangleP1z = entities[i][3];

        const triangleP2x = entities[i][4];
        const triangleP2y = entities[i][5];
        const triangleP2z = entities[i][6];

        const triangleP3x = entities[i][7];
        const triangleP3y = entities[i][8];
        const triangleP3z = entities[i][9];

        const r = entities[i][10];
        const g = entities[i][11];
        const b = entities[i][12];

        const distance = distanceToTriangle(
          origin[0],
          origin[1],
          origin[2],
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
        );

        if (distance > closestDistance) {
          closestDistance = distance;
          closestR = r;
          closestG = g;
          closestB = b;
        }
      }
      if (entityType == 1) {
        // Sphere calculations
        const sphereX = entities[i][1];
        const sphereY = entities[i][2];
        const sphereZ = entities[i][3];

        const radius = entities[i][4];

        const r = entities[i][5];
        const g = entities[i][6];
        const b = entities[i][7];

        const distance = distanceToSphere(
          sphereX,
          sphereY,
          sphereZ,
          radius,
          origin[0],
          origin[1],
          origin[2],
          viewPlaneX,
          viewPlaneY,
          viewPlaneZ
        );
        
        if (distance > closestDistance) {
          closestDistance = distance;
          closestR = r;
          closestG = g;
          closestB = b;
        }
      }
    }
    this.color(
      closestDistance * closestR,
      closestDistance * closestG,
      closestDistance * closestB
    );
  },
  kernelOpts);

  return calculatePixel;
};
