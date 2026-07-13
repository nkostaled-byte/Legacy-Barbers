import { useEffect, useRef } from "react";

const FRAME_COUNT = 480;

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    function currentFrame(index: number) {
      return `/images/BarbershopImages/Barbershop_${String(index + 1).padStart(6, "0")}.jpg`;
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawImage(0);
    }

    function drawImage(index: number) {
      const img = images[index];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);

      img.onload = () => {
        loaded++;

        if (loaded === 1) {
          drawImage(0);
        }
      };

      images.push(img);
    }

    function updateAnimation() {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = Math.min(
        window.scrollY / maxScroll,
        1
      );

      const frame = Math.floor(progress * (FRAME_COUNT - 1));

      requestAnimationFrame(() => drawImage(frame));
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateAnimation);
    };
  }, []);

  return (
  <div
    className="fixed inset-0"
    style={{
      zIndex: 0,
      overflow: "hidden",
    }}
  >
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  </div>
);
}