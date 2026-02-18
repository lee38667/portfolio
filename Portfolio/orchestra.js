(() => {
  const cubesData = {
    "cube-1": {
      initial: {
        top: -55,
        left: 37.5,
        rotateX: 360,
        rotateY: -360,
        rotateZ: -48,
        z: -30000,
      },
      final: {
        top: 50,
        left: 15,
        rotateX: 0,
        rotateY: 3,
        rotateZ: 0,
        z: 0,
      },
    },
    "cube-2": {
      initial: {
        top: -35,
        left: 32.5,
        rotateX: -360,
        rotateY: 360,
        rotateZ: 90,
        z: -30000,
      },
      final: {
        top: 75,
        left: 25,
        rotateX: 1,
        rotateY: 2,
        rotateZ: 0,
        z: 0,
      },
    },
    "cube-3": {
      initial: {
        top: -65,
        left: 50,
        rotateX: -360,
        rotateY: -360,
        rotateZ: -180,
        z: -30000,
      },
      final: {
        top: 25,
        left: 25,
        rotateX: -1,
        rotateY: 2,
        rotateZ: 0,
        z: 0,
      },
    },
    "cube-4": {
      initial: {
        top: -35,
        left: 50,
        rotateX: -360,
        rotateY: -360,
        rotateZ: -180,
        z: -30000,
      },
      final: {
        top: 75,
        left: 75,
        rotateX: 1,
        rotateY: -2,
        rotateZ: 0,
        z: 0,
      },
    },
    "cube-5": {
      initial: {
        top: -55,
        left: 62.5,
        rotateX: 360,
        rotateY: 360,
        rotateZ: -135,
        z: -30000,
      },
      final: {
        top: 25,
        left: 75,
        rotateX: -1,
        rotateY: -2,
        rotateZ: 0,
        z: 0,
      },
    },
    "cube-6": {
      initial: {
        top: -35,
        left: 67.5,
        rotateX: -180,
        rotateY: -360,
        rotateZ: -180,
        z: -30000,
      },
      final: {
        top: 50,
        left: 85,
        rotateX: 0,
        rotateY: -3,
        rotateZ: 0,
        z: 0,
      },
    },
  };

  const cubeImages = [
    "images/portfolio/9.png",
    "images/portfolio/1.png",
    "images/portfolio/0.png",
    "images/portfolio/p1.webp",
    "images/portfolio/p2.webp",
    "images/tote.jpg",
    "images/pewa.jpg",
    "images/portfolio/unnamed.png",
    "images/portfolio/9.png",
    "images/portfolio/6.png",
    "images/portfolio/5.png",
    "images/portfolio/7.png",
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const stickySection = document.querySelector(".orchestra-sticky");
    if (!stickySection || typeof gsap === "undefined") {
      return;
    }

    if (typeof ScrollTrigger !== "undefined" && gsap.registerPlugin) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const logo = document.querySelector(".orchestra-logo");
    const cubesContainer = document.querySelector(".orchestra-cubes");
    const header1 = document.querySelector(".orchestra-header-1");
    const header2 = document.querySelector(".orchestra-header-2");

    const cubeFaces = document.querySelectorAll(".orchestra-cube > div");
    cubeFaces.forEach((face, index) => {
      const img = document.createElement("img");
      img.src = cubeImages[index % cubeImages.length];
      img.alt = "Portfolio cube image";
      face.textContent = "";
      face.appendChild(img);
    });

    if (typeof Lenis !== "undefined") {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    const interpolate = (start, end, progress) => start + (end - start) * progress;

    const stickyHeight = window.innerHeight * 4;

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const initialProgress = Math.min(self.progress * 20, 1);
        if (logo) {
          logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
          const logoOpacityProgress =
            self.progress >= 0.02
              ? Math.min((self.progress - 0.02) * 100, 1)
              : 0;
          logo.style.opacity = 1 - logoOpacityProgress;
        }

        if (cubesContainer) {
          const cubesOpacityProgress =
            self.progress >= 0.01
              ? Math.min((self.progress - 0.01) * 100, 1)
              : 0;
          cubesContainer.style.opacity = cubesOpacityProgress;
        }

        if (header1) {
          const header1Progress = Math.min(self.progress * 2.5, 1);
          header1.style.transform = `translate(-50%, -50%) scale(${interpolate(
            1,
            1.5,
            header1Progress
          )})`;
          header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
          header1.style.opacity = 1 - header1Progress;
        }

        if (header2) {
          const header2StartProgress = (self.progress - 0.4) * 10;
          const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
          const header2Scale = interpolate(0.75, 1, header2Progress);
          const header2Blur = interpolate(10, 0, header2Progress);

          header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
          header2.style.filter = `blur(${header2Blur}px)`;
          header2.style.opacity = header2Progress;
        }

        const firstPhaseProgress = Math.min(self.progress * 2, 1);

        Object.entries(cubesData).forEach(([cubeClass, data]) => {
          const cube = document.querySelector(`.${cubeClass}`);
          if (!cube) {
            return;
          }

          const { initial, final } = data;

          const currentTop = interpolate(
            initial.top,
            final.top,
            firstPhaseProgress
          );
          const currentLeft = interpolate(
            initial.left,
            final.left,
            firstPhaseProgress
          );
          const currentRotateX = interpolate(
            initial.rotateX,
            final.rotateX,
            firstPhaseProgress
          );
          const currentRotateY = interpolate(
            initial.rotateY,
            final.rotateY,
            firstPhaseProgress
          );
          const currentRotateZ = interpolate(
            initial.rotateZ,
            final.rotateZ,
            firstPhaseProgress
          );
          const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

          cube.style.top = `${currentTop}%`;
          cube.style.left = `${currentLeft}%`;
          cube.style.transform = `
            translate3d(-50%, -50%, ${currentZ}px)
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY}deg)
            rotateZ(${currentRotateZ}deg)
          `;
        });
      },
    });
  });
})();
