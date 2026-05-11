<template>
  <Transition name="preloader-exit">
    <div v-if="visible" class="preloader" @click.prevent>
      
      <!-- Hex Matrix Background -->
      <canvas ref="matrixCanvas" class="matrix-canvas"></canvas>
      
      <!-- Scan Lines Overlay -->
      <div class="scanlines"></div>

      <!-- Floating Particles -->
      <div class="preloader-particles" aria-hidden="true">
        <span v-for="n in 20" :key="n" class="p-dot" :style="{ '--i': n }"></span>
      </div>

      <!-- Main Content Wrapper -->
      <div class="preloader-content">

        <!-- Top: System Header -->
        <div class="sys-header">
          <div class="sys-header__left">
            <span class="sys-dot"></span>
            <span class="sys-label">SYS.BOOT_v2.6</span>
          </div>
          <span class="sys-label sys-label--dim">{{ currentTime }}</span>
        </div>

        <!-- Center Block -->
        <div class="center-block">
          
          <!-- Glitch Logo -->
          <div class="logo-wrapper">
            <h1 class="glitch-logo" data-text="NATTHAWIT">NATTHAWIT</h1>
            <p class="logo-subtitle">
              <span class="bracket">[</span> PORTFOLIO SYSTEM <span class="bracket">]</span>
            </p>
          </div>

          <!-- Hex Ring Spinner -->
          <div class="hex-spinner" aria-hidden="true">
            <div class="hex-ring hex-ring--1"></div>
            <div class="hex-ring hex-ring--2"></div>
            <div class="hex-ring hex-ring--3"></div>
            <div class="hex-core"></div>
          </div>

          <!-- Progress Bar -->
          <div class="progress-wrapper">
            <div class="progress-track">
              <div class="progress-fill" ref="progressFillEl"></div>
              <div class="progress-glow" ref="progressGlowEl"></div>
            </div>
            <div class="progress-info">
              <span class="progress-label" ref="statusLabelEl">INITIALIZING CORE...</span>
              <span class="progress-pct" ref="statusPctEl">0%</span>
            </div>
          </div>

          <!-- Boot Log -->
          <div class="boot-log" ref="bootLogEl">
            <div
              v-for="(line, i) in visibleBootLines"
              :key="i"
              class="boot-line"
              :class="{ 'boot-line--latest': i === visibleBootLines.length - 1 }"
            >
              <span class="ok-tag">
                <span class="ok-bracket">[</span><span class="ok-text"> OK </span><span class="ok-bracket">]</span>
              </span>
              <span class="boot-text">{{ line }}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Status Bar -->
        <div class="bottom-bar">
          <div class="bottom-bar__left">
            <span class="indicator-dot"></span>
            <span class="bottom-label">ENGINEER // IoT · WEB · AI</span>
          </div>
          <span class="bottom-label bottom-label--accent">KMITL STUDENT</span>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['complete'])

const visible = ref(true)
const currentTime = ref('')
const progressFillEl = ref(null)
const progressGlowEl = ref(null)
const statusPctEl = ref(null)
const statusLabelEl = ref(null)
const bootLogEl = ref(null)
const matrixCanvas = ref(null)

const bootMessages = [
  'Loading kernel modules...',
  'Mounting /dev/portfolio...',
  'Initializing GPU pipeline...',
  'Connecting IoT mesh network...',
  'Compiling GSAP animation engine...',
  'Resolving Vue 3 reactive graph...',
  'Establishing WebSocket bridge...',
  'Loading asset manifests...',
  'Calibrating responsive breakpoints...',
  'Injecting design tokens...',
  'Spawning particle system...',
  'Verifying SSL certificates...',
  'Building component tree...',
  'System ready. Launching interface...',
]

const statusMessages = [
  'INITIALIZING CORE...',
  'LOADING MODULES...',
  'COMPILING ASSETS...',
  'ESTABLISHING LINKS...',
  'RENDERING ENGINE...',
  'FINALIZING BOOT...',
  'SYSTEM READY',
]

const visibleBootLines = ref([])
let timeInterval = null
let animFrame = null

// Matrix rain
const setupMatrix = () => {
  const canvas = matrixCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const chars = '01アイウエオカキクケコサシスセソ<>{}[]=/\\|'
  const fontSize = 14
  const columns = Math.floor(canvas.width / fontSize)
  const drops = new Array(columns).fill(1)

  const draw = () => {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgba(255, 101, 101, 0.15)'
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
    animFrame = requestAnimationFrame(draw)
  }
  draw()
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0')
}

onMounted(async () => {
  updateTime()
  timeInterval = setInterval(updateTime, 50)
  
  await nextTick()
  setupMatrix()

  // Main loading animation timeline
  const tl = gsap.timeline({
    onComplete: () => {
      // Finish sequence
      setTimeout(() => {
        visible.value = false
        emit('complete')
      }, 100)
    }
  })

  const totalDuration = 1.0 // seconds for entire boot sequence

  // Animate progress bar
  tl.to({}, {
    duration: totalDuration,
    onUpdate: function() {
      const progress = Math.round(this.progress() * 100)
      
      // Update progress bar fill
      if (progressFillEl.value) {
        progressFillEl.value.style.width = `${progress}%`
      }
      if (progressGlowEl.value) {
        progressGlowEl.value.style.left = `${progress}%`
      }

      // Update percentage text
      if (statusPctEl.value) {
        statusPctEl.value.textContent = `${progress}%`
      }

      // Update status label
      if (statusLabelEl.value) {
        const statusIdx = Math.min(
          Math.floor((progress / 100) * statusMessages.length),
          statusMessages.length - 1
        )
        statusLabelEl.value.textContent = statusMessages[statusIdx]
      }

      // Add boot lines progressively
      const lineIdx = Math.floor((progress / 100) * bootMessages.length)
      if (lineIdx > visibleBootLines.value.length && lineIdx <= bootMessages.length) {
        visibleBootLines.value.push(bootMessages[lineIdx - 1])
        // Auto-scroll boot log
        nextTick(() => {
          if (bootLogEl.value) {
            bootLogEl.value.scrollTop = bootLogEl.value.scrollHeight
          }
        })
      }
    },
    ease: 'power1.inOut'
  })
})

onBeforeUnmount(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (animFrame) cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
/* ===================================
   PRELOADER — FULLSCREEN OVERLAY
   =================================== */
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}

/* --- Matrix Canvas --- */
.matrix-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  pointer-events: none;
}

/* --- Scanlines Overlay --- */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  z-index: 2;
}

/* --- Floating Particles --- */
.preloader-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.p-dot {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #ff6565;
  border-radius: 50%;
  opacity: 0;
  animation: pFloat 6s infinite ease-in-out;
  animation-delay: calc(var(--i) * -0.3s);
  left: calc(var(--i) * 5%);
  top: calc(50% + (var(--i) * 3% - 30%));
  box-shadow: 0 0 6px rgba(255, 101, 101, 0.6);
}

@keyframes pFloat {
  0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
  20% { opacity: 0.8; }
  50% { opacity: 0.4; transform: translateY(-80px) scale(1.5); }
  80% { opacity: 0.6; }
}

/* ===================================
   CONTENT WRAPPER
   =================================== */
.preloader-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 560px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100vh;
  justify-content: space-between;
}

/* --- System Header --- */
.sys-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
}

.sys-header__left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sys-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff6565;
  box-shadow: 0 0 10px rgba(255, 101, 101, 0.8);
  animation: dotPulse 1.5s infinite ease-in-out;
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(255, 101, 101, 0.8); }
  50% { opacity: 0.4; box-shadow: 0 0 4px rgba(255, 101, 101, 0.3); }
}

.sys-label {
  font-size: 10px;
  color: #ff6565;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
}

.sys-label--dim {
  color: #555;
  font-variant-numeric: tabular-nums;
}

/* ===================================
   CENTER BLOCK
   =================================== */
.center-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* --- Glitch Logo --- */
.logo-wrapper {
  text-align: center;
}

.glitch-logo {
  font-family: 'Georgia', serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #fff;
  position: relative;
  animation: glitchText 3s infinite linear alternate;
}

.glitch-logo::before,
.glitch-logo::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.glitch-logo::before {
  color: #ff6565;
  animation: glitchBefore 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch-logo::after {
  color: #65c8ff;
  animation: glitchAfter 2.5s infinite linear alternate;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitchText {
  0%, 93%, 100% { transform: translateX(0); }
  94% { transform: translateX(-3px); }
  95% { transform: translateX(2px); }
  96% { transform: translateX(-1px); }
}

@keyframes glitchBefore {
  0%, 90%, 100% { transform: translateX(0); }
  91% { transform: translateX(4px); }
  93% { transform: translateX(-2px); }
  95% { transform: translateX(1px); }
}

@keyframes glitchAfter {
  0%, 88%, 100% { transform: translateX(0); }
  89% { transform: translateX(-3px); }
  92% { transform: translateX(3px); }
  94% { transform: translateX(-1px); }
}

.logo-subtitle {
  font-size: 11px;
  color: #666;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  margin-top: 0.75rem;
  animation: fadeInUp 0.8s 0.3s both ease-out;
}

.bracket {
  color: #ff6565;
  font-weight: 700;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- Hex Ring Spinner --- */
.hex-spinner {
  position: relative;
  width: 80px;
  height: 80px;
}

.hex-ring {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 50%;
}

.hex-ring--1 {
  border-top-color: #ff6565;
  border-bottom-color: #ff6565;
  animation: spinRing 1.8s linear infinite;
}

.hex-ring--2 {
  inset: 8px;
  border-left-color: rgba(255, 101, 101, 0.4);
  border-right-color: rgba(255, 101, 101, 0.4);
  animation: spinRing 2.5s linear infinite reverse;
}

.hex-ring--3 {
  inset: 16px;
  border-top-color: rgba(255, 101, 101, 0.2);
  animation: spinRing 3s linear infinite;
}

.hex-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  transform: translate(-50%, -50%);
  background: #ff6565;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 101, 101, 0.8), 0 0 40px rgba(255, 101, 101, 0.4);
  animation: corePulse 1.2s infinite ease-in-out;
}

@keyframes spinRing {
  to { transform: rotate(360deg); }
}

@keyframes corePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.6; }
}

/* --- Progress Bar --- */
.progress-wrapper {
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 3px;
  background: #1a1a1a;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  border: 1px solid #222;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ff6565, #ff8585);
  border-radius: 4px;
  transition: width 0.1s linear;
  position: relative;
}

.progress-glow {
  position: absolute;
  top: -4px;
  left: 0%;
  width: 20px;
  height: 11px;
  background: radial-gradient(circle, rgba(255, 101, 101, 0.8) 0%, transparent 70%);
  transform: translateX(-50%);
  pointer-events: none;
  transition: left 0.1s linear;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
}

.progress-label {
  font-size: 9px;
  color: #666;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.progress-pct {
  font-size: 11px;
  color: #ff6565;
  font-weight: 700;
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
}

/* --- Boot Log --- */
.boot-log {
  width: 100%;
  max-height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem;
  background: rgba(15, 15, 15, 0.7);
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  backdrop-filter: blur(8px);

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}

.boot-log::-webkit-scrollbar {
  width: 4px;
}

.boot-log::-webkit-scrollbar-track {
  background: transparent;
}

.boot-log::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

.boot-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 10px;
  color: #555;
  animation: lineAppear 0.3s ease-out both;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.boot-line--latest {
  color: #999;
}

@keyframes lineAppear {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

.ok-tag {
  flex-shrink: 0;
}

.ok-bracket {
  color: #333;
}

.ok-text {
  color: #ff6565;
  font-weight: 700;
}

.boot-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===================================
   BOTTOM BAR
   =================================== */
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
}

.bottom-bar__left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.indicator-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
  animation: dotPulse 2s infinite ease-in-out;
}

.bottom-label {
  font-size: 9px;
  color: #444;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.bottom-label--accent {
  color: #ff6565;
  font-weight: 700;
}

/* ===================================
   EXIT TRANSITION
   =================================== */
.preloader-exit-leave-active {
  transition: all 0.8s cubic-bezier(0.76, 0, 0.24, 1);
}

.preloader-exit-leave-to {
  opacity: 0;
  transform: scale(1.05);
  filter: blur(10px);
}

/* ===================================
   RESPONSIVE
   =================================== */
@media (max-width: 640px) {
  .preloader-content {
    padding: 1.5rem;
    max-width: 100%;
  }

  .glitch-logo {
    font-size: clamp(2rem, 10vw, 3rem);
    letter-spacing: 0.12em;
  }

  .logo-subtitle {
    font-size: 9px;
    letter-spacing: 0.2em;
  }

  .boot-log {
    max-height: 120px;
    padding: 0.75rem;
  }

  .hex-spinner {
    width: 60px;
    height: 60px;
  }
}
</style>
