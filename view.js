const bleh = () => {
  // const requiredPixelDimension = 20;
    // const pixelSize = 0.1
  const requiredPixelDimension = 600;
  const pixelSize = 0.005;
  const cameraOrigin = Vector(0.0, 0.0, 0.0);
  const triangularObject1 = Triangle(
    Vector(0.0, 0.25, 1.0),
    Vector(-0.5, -0.5, 1.5),
    Vector(0.5, -0.5, 2.0)
  );
  const triangularObject2 = Triangle(
    Vector(0.7, 1.0, 2.5),
    Vector(0.3, 0.5, 2.0),
    Vector(1.1, 0.5, 2.5)
  );
  const triangularObject3 = Triangle(
    Vector(0.0, 0.25, 1.0),
    Vector(-0.5, 0.5, 1.5),
    Vector(-0.5, -0.5, 1.5),
  );
  const myScene2 = Array.of(
    TriangleDrawable(triangularObject1, RGBColour(255, 0, 180)),
    TriangleDrawable(triangularObject2, RGBColour(0, 200, 0)),
    TriangleDrawable(triangularObject3, RGBColour(0, 200, 200)),
    // TriangleDrawable(triangularObject4, RGBColour(162, 42, 42)),
    // SphereDrawable(0.0, 0.0, 0.5, 0.3, RGBColour(255, 69, 0))
  );

  let yawDegrees = 0.0;
  let pitchDegrees = 0.0;

  let cameraOriginX = 0.0;
  let cameraOriginY = 0.0;
  let cameraOriginZ = 0.0;

  document.addEventListener('keydown', e => {
      e.preventDefault()
      if(e.code === "ArrowUp") {
          cameraOriginY += 0.03
      }
      if(e.code === "ArrowDown") {
          cameraOriginY -= 0.03
      }
      if(e.code === "ArrowRight") {
          cameraOriginX += 0.03
      }
      if(e.code === "ArrowLeft") {
          cameraOriginX -= 0.03
      }
      if(e.code === "KeyQ") {
        cameraOriginZ += 0.01
      }
      if(e.code === "KeyA") {
        cameraOriginZ -= 0.01
      }
  })

  //   const viewPlane = buildViewPlaneAngles(requiredPixelDimension, pixelSize, pitchDegrees, yawDegrees)
  const handle = document.getElementById("my-canvas");
  const kernel = getKernel(requiredPixelDimension, handle);
  const getFrame = () => {
    calcIntersectionPoints(
      requiredPixelDimension,
      pixelSize,
      myScene2,
      Vector(cameraOriginX, cameraOriginY, cameraOriginZ),
      pitchDegrees,
      yawDegrees,
      kernel
    );
  };
  const nextTick = () => {
    return window.requestAnimationFrame(() => {
      getFrame();
      nextTick();
    });
  };
  nextTick();
};
