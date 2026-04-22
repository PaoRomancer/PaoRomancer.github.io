<template>
  <!-- เพิ่ม opacity ขึ้นจาก 30% เป็น 80% เพื่อให้เห็นชัด -->
  <canvas ref="canvasEl" class="w-full h-full opacity-40 md:opacity-80"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasEl = ref(null);
let animationFrameId;
let chipAngle = 0;

onMounted(() => {
  const canvas = canvasEl.value;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  const particles = [];
  // Detect if mobile to reduce intensity
  const isMobile = width < 768;

  // Number of dots
  const particleCount = isMobile ? 40 : 80; 
  // Max distance to draw a line between dots
  const connectionDistance = isMobile ? 100 : 150;
  // Use the red accent color you have
  const color = '#ff6565';

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2), // Speed X
      vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2), // Speed Y
      radius: Math.random() * 1.5 + 1
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    // Draw Particles & Connections
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const opacity = 1 - (distance / connectionDistance);
          // Tone down opacity on mobile
          ctx.strokeStyle = `rgba(255, 101, 101, ${opacity * (isMobile ? 0.4 : 0.8)})`;
          ctx.lineWidth = isMobile ? 0.8 : 1.2;
          ctx.stroke();
        }
      }
    }

    // --- Draw ESP32 Chip in the center-bottom ---
    chipAngle += 0.0015; 

    const cx = width / 2;
    const cy = height - 160;
    const chipW = isMobile ? 80 : 120;
    const chipH = isMobile ? 120 : 180;
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(chipAngle);

    // Draw Pins
    ctx.fillStyle = '#888';
    const pinCount = 19; 
    const pinSpacing = chipH / (pinCount + 1);
    for (let i = 1; i <= pinCount; i++) {
        const pinY = (-chipH/2) + i * pinSpacing;
        ctx.fillRect(-chipW/2 - (isMobile ? 6 : 10), pinY - 1, (isMobile ? 8 : 12), 2);
        ctx.fillRect(chipW/2 - (isMobile ? 2 : 2), pinY - 1, (isMobile ? 8 : 12), 2);
    }

    // Glowing shadow for chip
    ctx.shadowColor = `rgba(255, 101, 101, ${isMobile ? 0.2 : 0.4})`;
    ctx.shadowBlur = isMobile ? 15 : 30;

    // Chip Base Body
    ctx.fillStyle = '#111';
    ctx.fillRect(-chipW/2, -chipH/2, chipW, chipH);
    ctx.shadowBlur = 0; 

    // Inner Metallic Cap (Shield)
    ctx.fillStyle = '#1a1a1a';
    ctx.strokeStyle = '#333';
    ctx.lineWidth = isMobile ? 1 : 2;
    ctx.fillRect(-chipW/2 + (isMobile ? 6 : 10), -chipH/2 + (isMobile ? 6 : 10), chipW - (isMobile ? 12 : 20), isMobile ? 40 : 60);
    ctx.strokeRect(-chipW/2 + (isMobile ? 6 : 10), -chipH/2 + (isMobile ? 6 : 10), chipW - (isMobile ? 12 : 20), isMobile ? 40 : 60);

    // Antenna meander trace
    ctx.beginPath();
    const antSize = isMobile ? 20 : 30;
    ctx.moveTo(-antSize, -chipH/2 + (isMobile ? 15 : 20));
    ctx.lineTo(-antSize, -chipH/2 + (isMobile ? 22 : 30));
    ctx.lineTo(-antSize/1.5, -chipH/2 + (isMobile ? 22 : 30));
    ctx.lineTo(-antSize/1.5, -chipH/2 + (isMobile ? 15 : 20));
    // Simplified antenna for mobile if needed, but keeping logic consistent
    ctx.lineTo(0, -chipH/2 + (isMobile ? 15 : 20));
    ctx.lineTo(antSize, -chipH/2 + (isMobile ? 15 : 20));
    ctx.strokeStyle = '#888';
    ctx.lineWidth = isMobile ? 1 : 1.5;
    ctx.stroke();

    // Text PAO in the middle of the chip
    ctx.filter = `drop-shadow(0px 0px ${isMobile ? 4 : 8}px rgba(255, 101, 101, ${isMobile ? 0.5 : 0.8}))`;
    ctx.fillStyle = '#ff6565';
    ctx.font = `bold ${isMobile ? 24 : 36}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAO', 0, isMobile ? 10 : 20);
    
    // Subtext Details
    ctx.filter = 'none';
    ctx.fillStyle = '#666';
    ctx.font = '10px "Outfit", sans-serif';
    ctx.fillText('ESP32-WROOM', 0, 55);
    ctx.fillText('Wi-Fi + BT + BLE', 0, 70);

    // กู้คืน state กลับมาเป็นปกติเพื่อไม่ให้แกนหมุนส่งผลกับของอื่นๆ (ถ้ามี)
    ctx.restore();

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };
  
  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
  });
});
</script>
