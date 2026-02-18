(() => {
  const slider = document.querySelector(".modular-slider");
  if (!slider || typeof gsap === "undefined") {
    return;
  }

  const titles = Array.from(slider.querySelectorAll(".modular-slider__title"));
  const titlesTrack = slider.querySelector(".modular-slider__titles");
  const imgTopContainer = slider.querySelector(".modular-slider__img-top");
  const imgBottomContainer = slider.querySelector(".modular-slider__img-bottom");

  if (!titlesTrack || !imgTopContainer || !imgBottomContainer) {
    return;
  }

  const images = [
    "images/portfolio/p1.webp",
    "images/portfolio/p2.webp",
    "images/portfolio/7.png",
    "images/portfolio/9.png",
    "images/portfolio/0.png",
    "images/portfolio/5.png"
  ];

  let currentIndex = 1;
  const totalSlides = images.length - 1;

  const updateActiveSlide = () => {
    titles.forEach((title, index) => {
      if (index === currentIndex) {
        title.classList.add("is-active");
      } else {
        title.classList.remove("is-active");
      }
    });
  };

  const updateImages = (imageIndex) => {
    const imgSrc = images[imageIndex % images.length];
    const imgTop = document.createElement("img");
    const imgBottom = document.createElement("img");

    imgTop.src = imgSrc;
    imgBottom.src = imgSrc;

    imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    imgTop.style.transform = "scale(2)";
    imgBottom.style.transform = "scale(2)";

    imgTopContainer.appendChild(imgTop);
    imgBottomContainer.appendChild(imgBottom);

    gsap.to([imgTop, imgBottom], {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      transform: "scale(1)",
      duration: 2,
      ease: "power4.out",
      stagger: 0.15,
      onComplete: trimExcessImages,
    });
  };

  const trimExcessImages = () => {
    [imgTopContainer, imgBottomContainer].forEach((container) => {
      const imagesInContainer = Array.from(container.querySelectorAll("img"));
      const excessCount = imagesInContainer.length - 5;
      if (excessCount > 0) {
        imagesInContainer
          .slice(0, excessCount)
          .forEach((image) => container.removeChild(image));
      }
    });
  };

  const handleSlider = () => {
    if (currentIndex < totalSlides) {
      currentIndex += 1;
    } else {
      currentIndex = 1;
    }

    gsap.to(titlesTrack, {
      onStart: () => {
        setTimeout(updateActiveSlide, 100);
        updateImages(currentIndex + 1);
      },
      x: `-${(currentIndex - 1) * 11.1111}%`,
      duration: 2,
      ease: "power4.out",
    });
  };

  slider.addEventListener("click", handleSlider);

  updateImages(2);
  updateActiveSlide();
})();
