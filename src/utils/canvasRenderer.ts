import { Shot } from '../types/film';

export interface RenderShotOptions {
  canvas: HTMLCanvasElement;
  shot: Shot;
  progress: number; // 0.0 to 1.0
  aspectRatio: '16:9' | '2.39:1' | '9:16';
  showOverlays?: boolean;
  showGrid?: boolean;
  timecodeStr?: string;
  loadedImage?: HTMLImageElement | null;
  loadedVideo?: HTMLVideoElement | null;
}

/**
 * Draws a single cinematic frame on canvas with camera movement, lens flare, film grain, and director overlays.
 */
export function renderCinematicFrame({
  canvas,
  shot,
  progress,
  aspectRatio,
  showOverlays = true,
  showGrid = false,
  timecodeStr = '00:00:00:00',
  loadedImage = null,
  loadedVideo = null,
}: RenderShotOptions) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // Clear background
  ctx.fillStyle = '#050608';
  ctx.fillRect(0, 0, w, h);

  // Compute camera transformation based on cameraMovement and progress (0 -> 1)
  ctx.save();

  let scale = 1.0;
  let offsetX = 0;
  let offsetY = 0;
  let rotation = 0;

  const move = (shot.cameraMovement || 'Static').toLowerCase();

  if (move.includes('dolly in')) {
    scale = 1.0 + progress * 0.25;
  } else if (move.includes('dolly out')) {
    scale = 1.25 - progress * 0.25;
  } else if (move.includes('pan left')) {
    scale = 1.15;
    offsetX = (progress - 0.5) * -w * 0.15;
  } else if (move.includes('pan right')) {
    scale = 1.15;
    offsetX = (progress - 0.5) * w * 0.15;
  } else if (move.includes('tilt up')) {
    scale = 1.15;
    offsetY = (progress - 0.5) * -h * 0.15;
  } else if (move.includes('tilt down')) {
    scale = 1.15;
    offsetY = (progress - 0.5) * h * 0.15;
  } else if (move.includes('tracking')) {
    scale = 1.18;
    offsetX = Math.sin(progress * Math.PI) * w * 0.08;
    offsetY = Math.cos(progress * Math.PI * 2) * 6;
  } else if (move.includes('orbit')) {
    scale = 1.2;
    rotation = (progress - 0.5) * 0.03;
    offsetX = (progress - 0.5) * w * 0.1;
  } else if (move.includes('handheld')) {
    scale = 1.08;
    offsetX = Math.sin(progress * 15) * 8 + Math.cos(progress * 7) * 4;
    offsetY = Math.cos(progress * 12) * 6 + Math.sin(progress * 5) * 3;
    rotation = Math.sin(progress * 8) * 0.008;
  } else {
    // Static subtle breathing
    scale = 1.0 + progress * 0.03;
  }

  // Apply camera matrix
  ctx.translate(w / 2, h / 2);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  ctx.translate(-w / 2 + offsetX, -h / 2 + offsetY);

  // If a real video exists, draw video frame
  if (loadedVideo && loadedVideo.videoWidth > 0) {
    const vidRatio = loadedVideo.videoWidth / loadedVideo.videoHeight;
    const canvasRatio = w / h;
    let dw = w;
    let dh = h;
    let dx = 0;
    let dy = 0;

    if (canvasRatio > vidRatio) {
      dw = w;
      dh = w / vidRatio;
      dy = (h - dh) / 2;
    } else {
      dh = h;
      dw = h * vidRatio;
      dx = (w - dw) / 2;
    }

    ctx.drawImage(loadedVideo, dx, dy, dw, dh);
  } else if (loadedImage && loadedImage.complete && loadedImage.naturalWidth > 0) {
    // If a real storyboard image or user sketch exists, render it
    const imgRatio = loadedImage.naturalWidth / loadedImage.naturalHeight;
    const canvasRatio = w / h;
    let dw = w;
    let dh = h;
    let dx = 0;
    let dy = 0;

    if (canvasRatio > imgRatio) {
      dw = w;
      dh = w / imgRatio;
      dy = (h - dh) / 2;
    } else {
      dh = h;
      dw = h * imgRatio;
      dx = (w - dw) / 2;
    }

    ctx.drawImage(loadedImage, dx, dy, dw, dh);
  } else {
    // Render Procedural Cinematic Director Canvas
    drawProceduralCinematicScene(ctx, w, h, shot, progress);
  }

  // Subtle volumetric lighting & vignette
  drawCinematicAtmosphere(ctx, w, h, shot, progress);

  ctx.restore();

  // Draw Aspect Ratio Letterbox Masking (e.g. 2.39:1 Anamorphic Bars)
  drawLetterboxBars(ctx, w, h, aspectRatio);

  // Draw Director HUD Overlays
  if (showOverlays) {
    drawDirectorHud(ctx, w, h, shot, timecodeStr, showGrid);
  }

  // Draw Dialogue Subtitle if present
  if (shot.dialogue && shot.dialogue.text) {
    drawSubtitle(ctx, w, h, shot.dialogue.speaker, shot.dialogue.text);
  }
}

/**
 * Procedural Mise-en-Scène illustration for when an image has not been generated yet
 */
function drawProceduralCinematicScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  shot: Shot,
  progress: number
) {
  const lighting = (shot.lighting || '').toLowerCase();
  const desc = (shot.actionDescription || '').toLowerCase();

  // 1. Sky/Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  if (lighting.includes('neon') || lighting.includes('cyan') || desc.includes('cyber')) {
    grad.addColorStop(0, '#0a0d1a');
    grad.addColorStop(0.6, '#18112c');
    grad.addColorStop(1, '#05070e');
  } else if (lighting.includes('golden') || lighting.includes('vàng') || desc.includes('chiều')) {
    grad.addColorStop(0, '#2b1408');
    grad.addColorStop(0.5, '#45220c');
    grad.addColorStop(1, '#110a05');
  } else if (lighting.includes('noir') || lighting.includes('dark') || desc.includes('đêm')) {
    grad.addColorStop(0, '#04070c');
    grad.addColorStop(0.5, '#0c131d');
    grad.addColorStop(1, '#020306');
  } else {
    grad.addColorStop(0, '#101520');
    grad.addColorStop(0.6, '#192333');
    grad.addColorStop(1, '#080c14');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 2. Distant Horizon Architecture or Mountains
  ctx.fillStyle = 'rgba(10, 14, 22, 0.7)';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.75);
  for (let x = 0; x <= w; x += 40) {
    const hillHeight = Math.sin((x / w) * 8 + progress * 0.2) * 30 + (h * 0.65);
    ctx.lineTo(x, hillHeight);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fill();

  // 3. City lights / Rim glow
  const glowX = w * 0.5 + Math.sin(progress * 2) * 20;
  const glowY = h * 0.45;
  const radialGlow = ctx.createRadialGradient(glowX, glowY, 10, glowX, glowY, w * 0.4);
  
  if (lighting.includes('neon') || desc.includes('cyber')) {
    radialGlow.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
    radialGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)');
    radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else if (lighting.includes('golden') || desc.includes('chiều')) {
    radialGlow.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
    radialGlow.addColorStop(0.6, 'rgba(220, 38, 38, 0.15)');
    radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    radialGlow.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
    radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, w, h);

  // 4. Character / Subject Silhouette according to Shot Type
  const shotType = (shot.shotType || 'MS').toUpperCase();
  ctx.fillStyle = '#06080d';

  if (shotType === 'CU' || shotType === 'ECU') {
    // Close up profile / face silhouette
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.48, h * 0.28, 0, Math.PI * 2);
    ctx.fill();

    // Eyes highlight / reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(w * 0.44, h * 0.45, 4, 0, Math.PI * 2);
    ctx.arc(w * 0.56, h * 0.45, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (shotType === 'MS' || shotType === 'MCU') {
    // Medium Shot: Torso and head
    ctx.beginPath();
    // Head
    ctx.arc(w * 0.5, h * 0.38, h * 0.12, 0, Math.PI * 2);
    ctx.fill();
    // Shoulders
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.65, w * 0.22, h * 0.2, 0, 0, Math.PI);
    ctx.fill();
  } else {
    // Wide Shot / EWS: Lone figure in vast environment
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.62, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.72, 14, 25, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Title & Action text summary watermark on procedural canvas
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(
    `[CẢNH ${shot.sceneNumber} • CÚ MÁY ${shot.shotNumber}] - ${shot.title}`,
    w * 0.5,
    h * 0.86
  );
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.font = '400 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    shot.actionDescription.length > 70
      ? shot.actionDescription.slice(0, 70) + '...'
      : shot.actionDescription,
    w * 0.5,
    h * 0.90
  );
}

/**
 * Cinematic vignette, lens flares, and dust
 */
function drawCinematicAtmosphere(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  shot: Shot,
  progress: number
) {
  // Vignette
  const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7);
  vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vig.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  // Subtle horizontal anamorphic streak flare
  const flareY = h * 0.42;
  const flareGrad = ctx.createLinearGradient(0, flareY, w, flareY);
  flareGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
  flareGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.08)');
  flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
  flareGrad.addColorStop(0.6, 'rgba(168, 85, 247, 0.08)');
  flareGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

  ctx.fillStyle = flareGrad;
  ctx.fillRect(0, flareY - 2, w, 4);

  // Volumetric floating dust particles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  for (let i = 0; i < 15; i++) {
    const px = (Math.sin(i * 123 + progress * 0.5) * 0.5 + 0.5) * w;
    const py = (Math.cos(i * 456 + progress * 0.3) * 0.5 + 0.5) * h;
    const pr = (i % 3) + 1;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Draws Letterbox Aspect Ratio (2.39:1 Anamorphic, etc.)
 */
function drawLetterboxBars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  aspectRatio: '16:9' | '2.39:1' | '9:16'
) {
  if (aspectRatio === '2.39:1') {
    const targetHeight = w / 2.39;
    const barHeight = Math.max(0, (h - targetHeight) / 2);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, barHeight);
    ctx.fillRect(0, h - barHeight, w, barHeight);
  } else if (aspectRatio === '9:16') {
    const targetWidth = h * (9 / 16);
    const barWidth = Math.max(0, (w - targetWidth) / 2);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, barWidth, h);
    ctx.fillRect(w - barWidth, 0, barWidth, h);
  }
}

/**
 * Draws Director HUD (Crosshairs, rule of thirds, timecode, lens metadata)
 */
function drawDirectorHud(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  shot: Shot,
  timecodeStr: string,
  showGrid: boolean
) {
  // Grid of thirds
  if (showGrid) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;

    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(w / 3, 0);
    ctx.lineTo(w / 3, h);
    ctx.moveTo((2 * w) / 3, 0);
    ctx.lineTo((2 * w) / 3, h);

    // Horizontal lines
    ctx.moveTo(0, h / 3);
    ctx.lineTo(w, h / 3);
    ctx.moveTo(0, (2 * h) / 3);
    ctx.lineTo(w, (2 * h) / 3);
    ctx.stroke();
  }

  // Center crosshair
  const cx = w / 2;
  const cy = h / 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy);
  ctx.lineTo(cx + 14, cy);
  ctx.moveTo(cx, cy - 14);
  ctx.lineTo(cx, cy + 14);
  ctx.stroke();

  // Top Left: REC badge
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(32, 28, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('REC 24FPS', 44, 32);

  // Top Right: Timecode
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(timecodeStr, w - 24, 32);

  // Bottom Left: Lens & Camera Info
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '600 11px "JetBrains Mono", monospace';
  ctx.fillText(`CAM: ${shot.cameraMovement.toUpperCase()}`, 24, h - 30);
  ctx.fillStyle = '#f59e0b';
  ctx.fillText(`LENS: ${shot.lens.toUpperCase()}`, 24, h - 14);

  // Bottom Right: Shot size and resolution
  ctx.textAlign = 'right';
  ctx.fillStyle = '#10b981';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillText(`[${shot.shotType}] 4K RAW`, w - 24, h - 30);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '500 10px "JetBrains Mono", monospace';
  ctx.fillText(`${shot.duration}s • PRORES 4444`, w - 24, h - 14);
}

/**
 * Draws cinematic dialogue subtitle with clean shadow
 */
function drawSubtitle(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  speaker: string,
  text: string
) {
  const subY = h - 60;
  ctx.textAlign = 'center';

  // Subtitle background pill
  ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
  const speakerStr = speaker ? `${speaker.toUpperCase()}: ` : '';
  const fullText = `${speakerStr}"${text}"`;
  const metrics = ctx.measureText(fullText);
  const pillWidth = Math.min(w - 60, metrics.width + 36);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.roundRect(w / 2 - pillWidth / 2, subY - 18, pillWidth, 32, 6);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text
  ctx.fillStyle = '#fef08a'; // subtle cinema yellow
  ctx.fillText(fullText, w / 2, subY + 3);
}

/**
 * Master Film Stitcher: Concatenates all shots sequentially and records a video Blob.
 */
export async function renderMasterFilmVideo(
  shots: Shot[],
  aspectRatio: '16:9' | '2.39:1' | '9:16',
  onProgress: (percent: number, currentShotIndex: number) => void
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get 2d context');

  // Pre-load all storyboard images
  const loadedImages: { [shotId: string]: HTMLImageElement } = {};
  await Promise.all(
    shots.map(async shot => {
      if (shot.storyboardUrl) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = shot.storyboardUrl;
          await new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
          loadedImages[shot.id] = img;
        } catch (e) {
          // ignore
        }
      }
    })
  );

  const fps = 30;
  const stream = canvas.captureStream(fps);

  // Setup MediaRecorder
  let mimeType = 'video/webm;codecs=vp9';
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    mimeType = 'video/webm';
  }

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 4000000,
  });

  const chunks: Blob[] = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  const recordingPromise = new Promise<Blob>((resolve) => {
    mediaRecorder.onstop = () => {
      resolve(new Blob(chunks, { type: mimeType }));
    };
  });

  mediaRecorder.start();

  const totalShots = shots.length;
  let totalRenderedFrames = 0;
  const totalFramesAllShots = shots.reduce((acc, s) => acc + Math.round((s.duration || 4) * fps), 0);

  let accumulatedSeconds = 0;

  for (let sIdx = 0; sIdx < totalShots; sIdx++) {
    const shot = shots[sIdx];
    const duration = shot.duration || 4;
    const shotFrames = Math.round(duration * fps);
    const loadedImg = loadedImages[shot.id] || null;

    for (let f = 0; f < shotFrames; f++) {
      const progress = f / shotFrames;
      const currentSec = accumulatedSeconds + (f / fps);
      const hours = Math.floor(currentSec / 3600);
      const mins = Math.floor((currentSec % 3600) / 60);
      const secs = Math.floor(currentSec % 60);
      const frames = Math.floor((currentSec % 1) * fps);
      const timecode = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;

      renderCinematicFrame({
        canvas,
        shot,
        progress,
        aspectRatio,
        showOverlays: true,
        showGrid: false,
        timecodeStr: timecode,
        loadedImage: loadedImg,
      });

      totalRenderedFrames++;
      if (totalRenderedFrames % 10 === 0) {
        onProgress(Math.round((totalRenderedFrames / totalFramesAllShots) * 100), sIdx);
        // Yield to event loop
        await new Promise((r) => setTimeout(r, 8));
      }
    }
    accumulatedSeconds += duration;
  }

  onProgress(100, totalShots - 1);
  mediaRecorder.stop();

  return recordingPromise;
}
