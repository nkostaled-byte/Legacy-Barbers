import { useEffect, useRef, useState, RefObject } from "react";

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [shouldRenderLoader, setShouldRenderLoader] = useState<boolean>(true);
  const [fadeLoader, setFadeLoader] = useState<boolean>(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(480).fill(null));
  const currentFrameIndexRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  const frameCount = 480;
  const lerpFactor = 0.08; // Smooth momentum factor

  // Dynamically calculate the file path mapping to /public/images/BarbershopImages/
  const getPath = (i: number) => {
    const paddedIndex = i.toString().padStart(6, "0");
    return `/images/BarbershopImages/Barbershop_${paddedIndex}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images = imagesRef.current;
    let immediateLoaded = 0;
    const immediateTarget = 50;
    let animationFrameId: number;

    // Helper to draw image covering the entire canvas (aspect-fill style)
    const drawImageCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      const r = Math.max(cw / iw, ch / ih);
      const nw = iw * r;
      const nh = ih * r;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);
    };

    // Render logic with outward fallback to nearest loaded frame
    const renderFrame = (index: number) => {
      const roundedFrame = Math.max(0, Math.min(frameCount - 1, index));
      const img = images[roundedFrame];
      if (img && img.complete && img.naturalWidth > 0) {
        drawImageCover(img);
      } else {
        // Outward search for closest loaded frame to completely avoid black screen flickers
        let fallbackImg: HTMLImageElement | null = null;
        let left = roundedFrame - 1;
        let right = roundedFrame + 1;
        while (left >= 0 || right < frameCount) {
          if (left >= 0) {
            const leftImg = images[left];
            if (leftImg && leftImg.complete && leftImg.naturalWidth > 0) {
              fallbackImg = leftImg;
              break;
            }
          }
          if (right < frameCount) {
            const rightImg = images[right];
            if (rightImg && rightImg.complete && rightImg.naturalWidth > 0) {
              fallbackImg = rightImg;
              break;
            }
          }
          left--;
          right++;
        }
        if (fallbackImg) {
          drawImageCover(fallbackImg);
        }
      }
    };

    // Set correct dimensions for retina display/high DPI scaling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(currentFrameIndexRef.current));
    };

    // Smooth scroll interpolation loop using requestAnimationFrame
    let lastRenderedIndex = -1;
    const animate = () => {
      // Linear interpolation to smooth out rapid scrolls
      currentFrameIndexRef.current += (targetFrameRef.current - currentFrameIndexRef.current) * lerpFactor;
      
      const roundedIndex = Math.round(currentFrameIndexRef.current);
      if (roundedIndex !== lastRenderedIndex) {
        lastRenderedIndex = roundedIndex;
        renderFrame(roundedIndex);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Phase 1: Immediately preload the first 50 frames to power the initial loading state
    for (let i = 1; i <= immediateTarget; i++) {
      const img = new Image();
      img.src = getPath(i);
      img.onload = () => {
        images[i - 1] = img;
        immediateLoaded++;
        setLoadedCount(immediateLoaded);

        // If the very first frame finishes loading, render it on canvas instantly
        if (i === 1) {
          renderFrame(0);
        }

        // When the first 50 images are ready, transition the loader out
        if (immediateLoaded >= immediateTarget) {
          setIsPreloaded(true);
          // Kickoff phase 2: Load the rest in the background
          startBackgroundPreloading();
        }
      };
      img.onerror = () => {
        // Fallback for errors to keep the loader moving
        immediateLoaded++;
        setLoadedCount(immediateLoaded);
        if (immediateLoaded >= immediateTarget) {
          setIsPreloaded(true);
          startBackgroundPreloading();
        }
      };
      images[i - 1] = img;
    }

    // Phase 2: Sequential background preloader for frames 51 to 480
    let bgIndex = 51;
    const startBackgroundPreloading = () => {
      const maxWorkers = 5; // Concurrency level to not overwhelm browser thread
      const loadNext = () => {
        if (bgIndex > frameCount) return;
        const i = bgIndex++;
        
        // Skip if already loading or loaded due to on-scroll lookahead
        if (images[i - 1]) {
          loadNext();
          return;
        }

        const img = new Image();
        img.src = getPath(i);
        img.onload = () => {
          images[i - 1] = img;
          loadNext();
        };
        img.onerror = () => {
          loadNext();
        };
        images[i - 1] = img;
      };

      for (let w = 0; w < maxWorkers; w++) {
        loadNext();
      }
    };

    // Passive scroll listener to update target animation index
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const scrollPercent = Math.min(1, Math.max(0, scrollTop / maxScroll));
      
      // Calculate target frame
      const targetIndex = scrollPercent * (frameCount - 1);
      targetFrameRef.current = targetIndex;

      // Smart Look-ahead Fetcher: as user scrolls down, fetch the next 15 upcoming frames immediately
      const lookAhead = 15;
      const roundedTarget = Math.round(targetIndex);
      for (let offset = 0; offset < lookAhead; offset++) {
        const idx = roundedTarget + offset;
        if (idx < frameCount && !images[idx]) {
          const img = new Image();
          img.src = getPath(idx + 1);
          img.onload = () => {
            images[idx] = img;
          };
          img.onerror = () => {
            images[idx] = null; // Prevent retrying dead links
          };
          images[idx] = img;
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial resize to set bounds
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Gracefully transition full-screen loader away
  useEffect(() => {
    if (isPreloaded) {
      setFadeLoader(true);
      const timer = setTimeout(() => {
        setShouldRenderLoader(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isPreloaded]);

  const progressPercent = Math.round((loadedCount / 50) * 100);

  return (
    <>
      {/* Cinematic Vignette & Shadow Overlay for Text Contrast */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9) 100%)",
          zIndex: -1,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: "#000000",
          display: "block",
        }}
      />

      {/* Elegant HUD Indicator for Background Preloader (visible post initial paint) */}
      {isPreloaded && (
        <BackgroundLoaderProgress imagesRef={imagesRef} frameCount={frameCount} />
      )}

      {/* Full-Screen Premium Cinematic Preloader */}
      {shouldRenderLoader && (
        <div
          id="loader"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000000",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: fadeLoader ? 0 : 1,
            visibility: fadeLoader ? "hidden" : "visible",
            transition: "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.8s",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
                fontWeight: 300,
                letterSpacing: "0.15em",
                marginBottom: "8px",
                color: "#f4ecdc",
                textTransform: "uppercase",
              }}
            >
              LEGACY BARBERS
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.3em",
                color: "#ad8043",
                textTransform: "uppercase",
                marginBottom: "40px",
              }}
            >
              A Cinematic Grooming Experience
            </p>

            <div
              style={{
                width: "280px",
                height: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "1px",
                overflow: "hidden",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #ad8043, #e7d6b8)",
                  boxShadow: "0 0 12px rgba(173, 128, 67, 0.4)",
                  transition: "width 0.2s ease-out",
                }}
              />
            </div>
            
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "rgba(244, 236, 220, 0.5)",
                letterSpacing: "0.1em",
              }}
            >
              INITIALIZING EXPERIENCE : {progressPercent}%
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Small separate helper component for rendering background preloading progress at bottom right
function BackgroundLoaderProgress({
  imagesRef,
  frameCount,
}: {
  imagesRef: RefObject<(HTMLImageElement | null)[]>;
  frameCount: number;
}) {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let intervalId = setInterval(() => {
      const arr = imagesRef.current;
      if (!arr) return;
      let loaded = 0;
      for (let i = 0; i < frameCount; i++) {
        if (arr[i] && arr[i]?.complete && arr[i]?.naturalWidth && arr[i]?.naturalWidth > 0) {
          loaded++;
        }
      }
      const p = Math.round((loaded / frameCount) * 100);
      setPercent(p);
      if (loaded >= frameCount) {
        setComplete(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [imagesRef, frameCount]);

  if (complete) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "rgba(0, 0, 0, 0.85)",
        border: "1px solid rgba(173, 128, 67, 0.2)",
        padding: "8px 16px",
        borderRadius: "9999px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#ad8043",
          animation: "pulse-glow 1.8s infinite ease-in-out",
        }}
      />
      <span
        style={{
          fontSize: "9px",
          fontFamily: "'JetBrains Mono', monospace",
          color: "#e7d6b8",
          letterSpacing: "0.15em",
        }}
      >
        STREAMING DETAILS: {percent}%
      </span>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(0.85); box-shadow: 0 0 0 0 rgba(173, 128, 67, 0); }
          50% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 8px 2px rgba(173, 128, 67, 0.4); }
        }
      `}</style>
    </div>
  );
}
