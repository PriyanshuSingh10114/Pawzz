import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Capture a specific DOM element as a high-resolution PNG data URL
 */
export async function captureSlideAsImage(element, pixelRatio = 2) {
  if (!element) throw new Error('DOM element is required for capture');
  return await toPng(element, {
    quality: 0.98,
    pixelRatio,
    cacheBust: true,
  });
}

/**
 * Download a single slide as a PNG file
 */
export async function downloadSlidePng(element, filename = 'slide.png') {
  const dataUrl = await captureSlideAsImage(element);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Export all slide elements to a combined multi-page PDF (ideal for LinkedIn Carousel)
 */
export async function exportCarouselToPdf({
  slideElements,
  title = 'Carousel',
  aspectRatio = 'portrait', // 'portrait' (4:5) or 'square' (1:1)
  onProgress,
}) {
  if (!slideElements || slideElements.length === 0) {
    throw new Error('No slide elements found to export');
  }

  // Define PDF page dimensions
  // LinkedIn optimal: 1080 x 1350 px (portrait) or 1080 x 1080 px (square)
  const isPortrait = aspectRatio === 'portrait';
  const widthMm = 210; // Standard reference width in mm
  const heightMm = isPortrait ? (210 * 1350) / 1080 : 210;

  const pdf = new jsPDF({
    orientation: isPortrait ? 'portrait' : 'landscape',
    unit: 'mm',
    format: [widthMm, heightMm],
  });

  for (let i = 0; i < slideElements.length; i++) {
    const el = slideElements[i];
    if (onProgress) {
      onProgress(i + 1, slideElements.length);
    }

    const imgData = await captureSlideAsImage(el, 2);

    if (i > 0) {
      pdf.addPage([widthMm, heightMm], isPortrait ? 'portrait' : 'landscape');
    }

    pdf.addImage(imgData, 'PNG', 0, 0, widthMm, heightMm, undefined, 'FAST');
  }

  const sanitizedTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);
  pdf.save(`${sanitizedTitle}_Carousel.pdf`);
  return true;
}
