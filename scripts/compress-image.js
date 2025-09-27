import fs from "fs/promises";
import path from "path";
import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";
import fg from "fast-glob";

const SRC_ROOT = "public/media/IMG";
const DEST_ROOT = "public/media/IMG_optimised";

(async () => {
  try {
    // Get all images inside SRC_ROOT (recursively)
    const files = await fg("**/*.{jpg,png}", { cwd: SRC_ROOT, absolute: true });

    for (const srcAbs of files) {
      const relPath = path.relative(SRC_ROOT, srcAbs);
      const destAbs = path.join(DEST_ROOT, relPath);

      // Make sure destination folder exists
      await fs.mkdir(path.dirname(destAbs), { recursive: true });

      try {
        // Optimize single file
        const inputBuffer = await fs.readFile(srcAbs);
        const outputBuffer = await imagemin.buffer(inputBuffer, {
          plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] })
          ]
        });

        await fs.writeFile(destAbs, outputBuffer);
        console.log(`✅ Optimized: ${srcAbs} → ${destAbs}`);
      } catch (fileErr) {
        // Fallback: copy original if optimization fails
        console.warn(`⚠️ Skipped optimization (mozjpeg/pngquant failed): ${srcAbs}`);
        await fs.copyFile(srcAbs, destAbs);
        console.log(`📄 Copied original: ${srcAbs} → ${destAbs}`);
      }
    }

    console.log("🎉 All images processed with folder structure preserved.");
  } catch (err) {
    console.error("❌ Optimisation process failed:", err);
  }
})();
