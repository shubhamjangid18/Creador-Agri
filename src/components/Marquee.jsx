import React, { useState, useEffect, useCallback } from "react";
import "./Marquee.css";

/* =========================================
   PRODUCTS
========================================= */

const PRODUCT_FOLDER = encodeURIComponent(
  "Creador Fertilizer Packagings"
);

const PRODUCTS = Array.from(
  { length: 28 },
  (_, i) =>
    `/products/${PRODUCT_FOLDER}/${String(i + 1).padStart(
      2,
      "0"
    )}.png`
);


/* =========================================
   ROWS
   9 + 9 + 10 = 28
========================================= */

const ROWS = [
  PRODUCTS.slice(0, 9),
  PRODUCTS.slice(9, 18),
  PRODUCTS.slice(18, 28),
];


/* =========================================
   OPEN ALL PRODUCTS
   (unchanged — still opens a new tab)
========================================= */

const openAllProducts = () => {
  const newTab = window.open("", "_blank");

  if (!newTab) return;

  newTab.document.write(`
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Products</title>

  <style>

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }


    html {
      background: #050b08;
    }


    body {
      min-height: 100vh;

      background:
        radial-gradient(
          circle at 50% -10%,
          rgba(38, 92, 62, 0.35),
          transparent 45%
        ),
        radial-gradient(
          circle at 100% 100%,
          rgba(18, 62, 40, 0.2),
          transparent 40%
        ),
        #050b08;

      font-family:
        Inter,
        Arial,
        Helvetica,
        sans-serif;

      overflow-x: hidden;
    }


    /* =====================================
       GALLERY
    ===================================== */

    .gallery {

      width: 100%;

      min-height: 100vh;

      padding: 42px;

    }


    .gallery-grid {

      width: 100%;

      max-width: 1700px;

      margin: 0 auto;

      display: grid;

      grid-template-columns:
        repeat(4, minmax(0, 1fr));

      gap: 20px;

    }


    /* =====================================
       PRODUCT CARD
    ===================================== */

    .product-card {

      position: relative;

      width: 100%;

      aspect-ratio: 1 / 1;

      overflow: hidden;

      border-radius: 18px;

      background: #0c1711;

      border:
        1px solid
        rgba(255, 255, 255, 0.08);

      cursor: pointer;

      transition:
        transform 0.5s
          cubic-bezier(0.2, 0.7, 0.2, 1),
        border-color 0.4s ease,
        box-shadow 0.5s ease;

    }


    .product-card::after {

      content: "";

      position: absolute;

      inset: 0;

      pointer-events: none;

      background:
        linear-gradient(
          135deg,
          rgba(255,255,255,0.08),
          transparent 35%
        );

      opacity: 0;

      transition: opacity 0.4s ease;

    }


    .product-card:hover {

      transform:
        translateY(-6px)
        scale(1.01);

      border-color:
        rgba(255, 255, 255, 0.18);

      box-shadow:
        0 28px 70px
        rgba(0, 0, 0, 0.5);

    }


    .product-card:hover::after {
      opacity: 1;
    }


    .product-card img {

      width: 100%;

      height: 100%;

      display: block;

      object-fit: cover;

      user-select: none;

      transition:
        transform 0.8s
        cubic-bezier(0.2, 0.7, 0.2, 1);

    }


    .product-card:hover img {

      transform: scale(1.055);

    }


    /* =====================================
       VIEWER
    ===================================== */

    .viewer {

      position: fixed;

      inset: 0;

      z-index: 99999;

      display: none;

      align-items: center;

      justify-content: center;

      padding: 40px;

      background:
        rgba(2, 8, 5, 0.97);

      backdrop-filter:
        blur(18px);

      -webkit-backdrop-filter:
        blur(18px);

    }


    .viewer.active {
      display: flex;
    }


    .viewer-image {

      max-width: 88vw;

      max-height: 88vh;

      width: auto;

      height: auto;

      object-fit: contain;

      border-radius: 14px;

      user-select: none;

      -webkit-user-drag: none;

      box-shadow:
        0 35px 120px
        rgba(0, 0, 0, 0.75);

      animation:
        viewerImageIn
        0.35s
        cubic-bezier(0.2, 0.7, 0.2, 1);

    }


    @keyframes viewerImageIn {

      from {
        opacity: 0;
        transform: scale(0.96);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }

    }


    /* =====================================
       VIEWER BUTTON
    ===================================== */

    .viewer-button {

      position: absolute;

      width: 58px;

      height: 58px;

      display: flex;

      align-items: center;

      justify-content: center;

      padding: 0;

      border:
        1px solid
        rgba(255, 255, 255, 0.14);

      border-radius: 50%;

      background:
        rgba(255, 255, 255, 0.07);

      color: white;

      cursor: pointer;

      backdrop-filter:
        blur(12px);

      -webkit-backdrop-filter:
        blur(12px);

      transition:
        background 0.3s ease,
        border-color 0.3s ease,
        transform 0.3s ease,
        box-shadow 0.3s ease;

    }


    .viewer-button svg {

      width: 23px;

      height: 23px;

      stroke: currentColor;

      fill: none;

      stroke-width: 1.7;

      stroke-linecap: round;

      stroke-linejoin: round;

    }


    .viewer-button:hover {

      background:
        rgba(255, 255, 255, 0.14);

      border-color:
        rgba(255, 255, 255, 0.28);

      box-shadow:
        0 10px 35px
        rgba(0, 0, 0, 0.35);

    }


    /* =====================================
       LEFT
    ===================================== */

    .viewer-button-left {

      left: 30px;

      top: 50%;

      transform:
        translateY(-50%);

    }


    .viewer-button-left:hover {

      transform:
        translateY(-50%)
        scale(1.08);

    }


    /* =====================================
       RIGHT
    ===================================== */

    .viewer-button-right {

      right: 30px;

      top: 50%;

      transform:
        translateY(-50%);

    }


    .viewer-button-right:hover {

      transform:
        translateY(-50%)
        scale(1.08);

    }


    /* =====================================
       CLOSE
    ===================================== */

    .viewer-button-close {

      top: 25px;

      right: 30px;

    }


    .viewer-button-close:hover {

      transform:
        rotate(90deg)
        scale(1.08);

    }


    /* =====================================
       MOBILE
    ===================================== */

    @media (max-width: 1200px) {

      .gallery {
        padding: 30px;
      }

      .gallery-grid {
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
      }

    }


    @media (max-width: 750px) {

      .gallery {
        padding: 16px;
      }

      .gallery-grid {

        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        gap: 12px;

      }


      .product-card {
        border-radius: 13px;
      }


      .viewer {
        padding: 18px;
      }


      .viewer-image {

        max-width: 90vw;

        max-height: 82vh;

        border-radius: 10px;

      }


      .viewer-button {

        width: 46px;

        height: 46px;

      }


      .viewer-button svg {

        width: 20px;

        height: 20px;

      }


      .viewer-button-left {
        left: 9px;
      }


      .viewer-button-right {
        right: 9px;
      }


      .viewer-button-close {

        top: 13px;

        right: 13px;

      }

    }


    @media (max-width: 430px) {

      .gallery-grid {
        gap: 9px;
      }

    }

  </style>

</head>


<body>


  <main class="gallery">

    <div
      class="gallery-grid"
      id="galleryGrid"
    ></div>

  </main>


  <!-- VIEWER -->

  <div
    class="viewer"
    id="viewer"
  >

    <!-- PREVIOUS -->

    <button
      class="viewer-button viewer-button-left"
      id="previousButton"
      aria-label="Previous"
    >

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >

        <path d="M15 5L8 12L15 19"></path>

      </svg>

    </button>


    <!-- IMAGE -->

    <img
      class="viewer-image"
      id="viewerImage"
      src=""
      alt=""
    />


    <!-- NEXT -->

    <button
      class="viewer-button viewer-button-right"
      id="nextButton"
      aria-label="Next"
    >

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >

        <path d="M9 5L16 12L9 19"></path>

      </svg>

    </button>


    <!-- CLOSE -->

    <button
      class="viewer-button viewer-button-close"
      id="closeButton"
      aria-label="Close"
    >

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >

        <path d="M6 6L18 18"></path>

        <path d="M18 6L6 18"></path>

      </svg>

    </button>

  </div>


  <script>

    const products =
      ${JSON.stringify(PRODUCTS)};


    const galleryGrid =
      document.getElementById(
        "galleryGrid"
      );


    const viewer =
      document.getElementById(
        "viewer"
      );


    const viewerImage =
      document.getElementById(
        "viewerImage"
      );


    const previousButton =
      document.getElementById(
        "previousButton"
      );


    const nextButton =
      document.getElementById(
        "nextButton"
      );


    const closeButton =
      document.getElementById(
        "closeButton"
      );


    let currentIndex = 0;


    /* =====================================
       CREATE GALLERY
    ===================================== */

    products.forEach(
      (image, index) => {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "product-card";


        const img =
          document.createElement(
            "img"
          );


        img.src = image;

        img.alt = "";

        img.loading = "lazy";

        img.draggable = false;


        card.appendChild(img);


        card.addEventListener(
          "click",
          () => {

            openViewer(index);

          }
        );


        galleryGrid.appendChild(
          card
        );

      }
    );


    /* =====================================
       OPEN
    ===================================== */

    function openViewer(index) {

      currentIndex = index;

      updateViewer();

      viewer.classList.add(
        "active"
      );

      document.body.style.overflow =
        "hidden";

    }


    /* =====================================
       UPDATE
    ===================================== */

    function updateViewer() {

      viewerImage.src =
        products[currentIndex];

    }


    /* =====================================
       NEXT
    ===================================== */

    function nextImage() {

      currentIndex =
        (
          currentIndex + 1
        ) % products.length;


      updateViewer();

    }


    /* =====================================
       PREVIOUS
    ===================================== */

    function previousImage() {

      currentIndex =
        (
          currentIndex -
          1 +
          products.length
        ) % products.length;


      updateViewer();

    }


    /* =====================================
       CLOSE
    ===================================== */

    function closeViewer() {

      viewer.classList.remove(
        "active"
      );

      document.body.style.overflow =
        "";

    }


    /* =====================================
       BUTTON EVENTS
    ===================================== */

    nextButton.addEventListener(
      "click",
      nextImage
    );


    previousButton.addEventListener(
      "click",
      previousImage
    );


    closeButton.addEventListener(
      "click",
      closeViewer
    );


    /* =====================================
       OUTSIDE CLICK
    ===================================== */

    viewer.addEventListener(
      "click",
      (event) => {

        if (
          event.target === viewer
        ) {

          closeViewer();

        }

      }
    );


    /* =====================================
       KEYBOARD
    ===================================== */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          !viewer.classList.contains(
            "active"
          )
        ) {
          return;
        }


        if (
          event.key ===
          "ArrowRight"
        ) {

          nextImage();

        }


        if (
          event.key ===
          "ArrowLeft"
        ) {

          previousImage();

        }


        if (
          event.key ===
          "Escape"
        ) {

          closeViewer();

        }

      }
    );

  <\/script>


</body>

</html>
  `);

  newTab.document.close();
};


/* =========================================
   MARQUEE ROW
========================================= */

const MarqueeRow = ({
  images,
  direction,
  speed = 32,
  onOpen,
}) => {

  return (

    <div className="agri-marquee">

      <div
        className={`
          agri-track
          ${
            direction === "right"
              ? "agri-track-right"
              : "agri-track-left"
          }
        `}
        style={{
          "--agri-speed": `${speed}s`,
        }}
      >

        {/* SET 1 */}

        <div className="agri-set">

          {images.map(
            (image, index) => (

              <button
                className="agri-card"
                key={`first-${image}-${index}`}
                type="button"
                onClick={() =>
                  onOpen(image)
                }
                aria-label="Open product"
              >

                <img
                  src={image}
                  alt=""
                  draggable="false"
                />

              </button>

            )
          )}

        </div>


        {/* SET 2
            IMPORTANT:
            This is a separate identical set.
            This makes the loop seamless.
        */}

        <div
          className="agri-set"
          aria-hidden="true"
        >

          {images.map(
            (image, index) => (

              <button
                className="agri-card"
                key={`second-${image}-${index}`}
                type="button"
                onClick={() =>
                  onOpen(image)
                }
                tabIndex={-1}
              >

                <img
                  src={image}
                  alt=""
                  draggable="false"
                />

              </button>

            )
          )}

        </div>

      </div>

    </div>

  );
};


/* =========================================
   INLINE PREMIUM VIEWER (LIGHTBOX)

   Opens on the same page — no new tab.
   Navigates across the full product set.
========================================= */

const ProductViewer = ({
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}) => {

  /* LOCK SCROLL WHILE OPEN */

  useEffect(() => {

    if (isOpen) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";

    }


    return () => {

      document.body.style.overflow =
        "";

    };

  }, [isOpen]);


  /* KEYBOARD NAVIGATION */

  useEffect(() => {

    if (!isOpen) return;


    const handleKeyDown = (
      event
    ) => {

      if (event.key === "Escape") {

        onClose();

      }


      if (
        event.key ===
        "ArrowRight"
      ) {

        onNext();

      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        onPrevious();

      }

    };


    document.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, [isOpen, onClose, onNext, onPrevious]);


  if (!isOpen) return null;


  return (

    <div
      className="agri-viewer active"
      onClick={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {

          onClose();

        }

      }}
    >

      {/* PREVIOUS */}

      <button
        className="agri-viewer-button agri-viewer-button-left"
        onClick={onPrevious}
        aria-label="Previous product"
        type="button"
      >

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >

          <path d="M15 5L8 12L15 19"></path>

        </svg>

      </button>


      {/* IMAGE */}

      <img
        className="agri-viewer-image"
        src={PRODUCTS[currentIndex]}
        alt=""
        draggable="false"
        key={currentIndex}
      />


      {/* NEXT */}

      <button
        className="agri-viewer-button agri-viewer-button-right"
        onClick={onNext}
        aria-label="Next product"
        type="button"
      >

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >

          <path d="M9 5L16 12L9 19"></path>

        </svg>

      </button>


      {/* CLOSE */}

      <button
        className="agri-viewer-button agri-viewer-button-close"
        onClick={onClose}
        aria-label="Close"
        type="button"
      >

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >

          <path d="M6 6L18 18"></path>

          <path d="M18 6L6 18"></path>

        </svg>

      </button>


      {/* COUNTER */}

      <div className="agri-viewer-counter">

        {currentIndex + 1}
        {" / "}
        {PRODUCTS.length}

      </div>

    </div>

  );
};


/* =========================================
   MAIN
========================================= */

const Marquee = () => {

  const [
    viewerOpen,
    setViewerOpen,
  ] = useState(false);


  const [
    viewerIndex,
    setViewerIndex,
  ] = useState(0);


  const openInlineViewer = useCallback(
    (image) => {

      const index =
        PRODUCTS.indexOf(image);


      setViewerIndex(
        index === -1 ? 0 : index
      );


      setViewerOpen(true);

    },
    []
  );


  const closeInlineViewer =
    useCallback(() => {

      setViewerOpen(false);

    }, []);


  const showNext = useCallback(
    () => {

      setViewerIndex(
        (previous) =>
          (previous + 1) %
          PRODUCTS.length
      );

    },
    []
  );


  const showPrevious = useCallback(
    () => {

      setViewerIndex(
        (previous) =>
          (previous -
            1 +
            PRODUCTS.length) %
          PRODUCTS.length
      );

    },
    []
  );


  return (

    <section
      className="agri-marquee-section"
    >

      <div
        className="agri-marquee-wrapper"
      >

        <MarqueeRow
          images={ROWS[0]}
          direction="left"
          speed={34}
          onOpen={openInlineViewer}
        />


        <MarqueeRow
          images={ROWS[1]}
          direction="right"
          speed={37}
          onOpen={openInlineViewer}
        />


        <MarqueeRow
          images={ROWS[2]}
          direction="left"
          speed={40}
          onOpen={openInlineViewer}
        />

      </div>


      <div
        className="agri-view-wrapper"
      >

        <button
          className="agri-view-all"
          onClick={openAllProducts}
          type="button"
        >

          <span>
            View All Products
          </span>

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >

            <path
              d="M5 12h14"
            />

            <path
              d="M13 6l6 6-6 6"
            />

          </svg>

        </button>

      </div>


      {/* INLINE PREMIUM VIEWER */}

      <ProductViewer
        isOpen={viewerOpen}
        currentIndex={viewerIndex}
        onClose={closeInlineViewer}
        onNext={showNext}
        onPrevious={showPrevious}
      />

    </section>

  );
};


export default Marquee;