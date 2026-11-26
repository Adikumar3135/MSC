
/* ==========================================
   MSC TECH STORE - SCROLL PRODUCT EXPERIENCE
   PC + DSLR + CCTV
========================================== */

gsap.registerPlugin(ScrollTrigger);

(() => {

    const canvas = document.getElementById("mscProductCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const TOTAL_FRAMES = 240;

    const products = [
        {
            folder: "pc",
            title: "BUILD YOUR <em>POWER.</em>",
            category: "PERFORMANCE COMPUTING",
            description:
                "Discover powerful custom-built computers engineered for gaming, editing and professional performance.",
            label: "GAMING PC"
        },
        {
            folder: "dslr",
            title: "CAPTURE THE <em>WORLD.</em>",
            category: "PROFESSIONAL PHOTOGRAPHY",
            description:
                "Explore professional camera equipment engineered for creativity, precision and extraordinary moments.",
            label: "DSLR CAMERA"
        },
        {
            folder: "cctv",
            title: "PROTECT WHAT <em>MATTERS.</em>",
            category: "SMART SECURITY SYSTEMS",
            description:
                "Discover advanced surveillance cameras and intelligent security solutions for every space.",
            label: "CCTV SYSTEM"
        }
    ];

    const images = products.map(() => []);

    const elements = {
        title: document.getElementById("mscProductTitle"),
        category: document.getElementById("mscProductCategory"),
        description: document.getElementById("mscProductDescription"),
        number: document.getElementById("mscProductNumber"),
        current: document.getElementById("mscFrameCurrent"),
        total: document.getElementById("mscFrameTotal"),
        label: document.getElementById("mscSequenceLabel"),
        progress: document.getElementById("mscSequenceProgress"),
        loading: document.getElementById("mscSequenceLoading"),
        loadingFill: document.getElementById("mscSequenceLoadingFill"),
        loadingPercent: document.getElementById("mscSequenceLoadingPercent"),
        loadingText: document.getElementById("mscSequenceLoadingText")
    };

    let completed = 0;
    let failed = 0;
    let currentScene = 0;
    let currentFrame = 0;
    let started = false;
    let lastScene = -1;

    const totalImages = products.length * TOTAL_FRAMES;

    /* ======================================
       CANVAS SIZE
    ====================================== */

    function resizeCanvas() {

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        renderFrame(currentScene, currentFrame);
    }

    /* ======================================
       FIND AVAILABLE FRAME
    ====================================== */

    function getAvailableImage(scene, frame) {

        const sequence = images[scene];

        if (!sequence) return null;

        if (
            sequence[frame] &&
            sequence[frame].complete &&
            sequence[frame].naturalWidth
        ) {
            return sequence[frame];
        }

        for (let distance = 1; distance < TOTAL_FRAMES; distance++) {

            const before = sequence[frame - distance];
            const after = sequence[frame + distance];

            if (before?.complete && before.naturalWidth) {
                return before;
            }

            if (after?.complete && after.naturalWidth) {
                return after;
            }
        }

        return null;
    }

    /* ======================================
       DRAW FRAME
    ====================================== */

    function renderFrame(scene, frame) {

        const img = getAvailableImage(scene, frame);

        if (!img) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        const scale = Math.min(
            width / img.naturalWidth,
            height / img.naturalHeight
        );

        const drawWidth = img.naturalWidth * scale;
        const drawHeight = img.naturalHeight * scale;

        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(
            img,
            x,
            y,
            drawWidth,
            drawHeight
        );

        elements.current.textContent =
            String(frame + 1).padStart(3, "0");
    }

    /* ======================================
       UPDATE PRODUCT CONTENT
    ====================================== */

    function updateProduct(scene) {

        const product = products[scene];

        if (!product) return;

        elements.number.textContent =
            String(scene + 1).padStart(2, "0");

        

        elements.title.innerHTML =
            product.title;

    


        elements.total.textContent =
            String(TOTAL_FRAMES).padStart(3, "0");
    }

    /* ======================================
       LOADING PROGRESS
    ====================================== */

    function updateLoading() {

        const done = completed + failed;

        const percentage = Math.round(
            (done / totalImages) * 100
        );

        elements.loadingFill.style.width =
            percentage + "%";

        elements.loadingPercent.textContent =
            percentage + "%";

        elements.loadingText.textContent =
            "LOADING PRODUCT EXPERIENCE";
    }

    /* ======================================
       PRELOAD IMAGES
    ====================================== */

    function preloadImages() {

        products.forEach((product, sceneIndex) => {

            for (let i = 1; i <= TOTAL_FRAMES; i++) {

                const img = new Image();

                img.decoding = "async";

                const frame = String(i).padStart(3, "0");

                img.onload = () => {

                    completed++;

                    updateLoading();

                    if (
                        currentScene === sceneIndex &&
                        currentFrame === i - 1
                    ) {
                        renderFrame(sceneIndex, currentFrame);
                    }

                    checkLoadingComplete();
                };

                img.onerror = () => {

                    failed++;

                    console.error(
                        "MSC image not found:",
                        img.src
                    );

                    updateLoading();

                    checkLoadingComplete();
                };

                // Image naming:
                // images/pc/ezgif-frame-001.jpg

                img.src =
                    `images/${product.folder}/ezgif-frame-${frame}.png`;

                images[sceneIndex].push(img);
            }

        });

    }

    /* ======================================
       START EXPERIENCE
    ====================================== */

    function checkLoadingComplete() {

        if (completed + failed !== totalImages) return;

        if (started) return;

        started = true;

        const firstFrame = getAvailableImage(0, 0);

        if (!firstFrame) {

            elements.loadingText.textContent =
                "PRODUCT IMAGES NOT FOUND";

            console.error(
                "Gaming PC sequence missing. Check image paths."
            );

            return;
        }

        resizeCanvas();

        renderFrame(0, 0);

        updateProduct(0);

        elements.loading.classList.add("hidden");

        startScrollAnimation();

        if (failed > 0) {
            console.warn(
                failed + " product frames failed to load."
            );
        }
    }

    /* ======================================
       GSAP SCROLL ANIMATION
    ====================================== */

    function startScrollAnimation() {

        const animation = {
            frame: 0
        };

        gsap.to(animation, {

            frame: (products.length * TOTAL_FRAMES) - 1,

            ease: "none",

            snap: "frame",

            scrollTrigger: {

                trigger: "#mscSequenceHero",

                start: "top top",

                end: () => "+=" + (
                    products.length * 1500
                ),

                scrub: 0.5,

                pin: true,

                anticipatePin: 1,

                invalidateOnRefresh: true,

                onUpdate: function(self) {

                    const total = products.length * TOTAL_FRAMES;

                    const globalFrame = Math.min(
                        total - 1,
                        Math.floor(animation.frame)
                    );

                    const scene = Math.floor(
                        globalFrame / TOTAL_FRAMES
                    );

                    const frame = globalFrame % TOTAL_FRAMES;

                    currentScene = scene;
                    currentFrame = frame;

                    renderFrame(scene, frame);

                    // Change product content
                    if (scene !== lastScene) {

                        lastScene = scene;

                        updateProduct(scene);

                        gsap.fromTo(
                            ".msc-sequence-content",
                            {
                                opacity: 0,
                                y: 20
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.45,
                                ease: "power2.out"
                            }
                        );
                    }

                    // Product scene progress
                    const progress =
                        ((frame + 1) / TOTAL_FRAMES) * 100;

                    elements.progress.style.width =
                        progress + "%";
                }
            }

        });

        ScrollTrigger.refresh();
    }

    /* ======================================
       RESIZE
    ====================================== */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            resizeCanvas();

            if (started) {
                ScrollTrigger.refresh();
            }

        }, 200);

    });

    /* ======================================
       INITIALIZE
    ====================================== */

    resizeCanvas();

    preloadImages();

})();
