const dataSets = {
  hero: [102, 108, 111, 118, 121, 130, 138, 142, 150, 158, 168],
  aurora: [100, 103, 104, 108, 111, 115, 119, 123, 128, 132, 137],
  nocturne: [100, 102, 107, 112, 116, 121, 129, 134, 140, 148, 156],
  serenity: [100, 101, 103, 106, 109, 112, 117, 122, 125, 130, 135],
  pulse: [100, 104, 110, 116, 120, 126, 133, 141, 149, 158, 170],
};

function drawChart(canvasId, values, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { accent = '#7ee0ff', accent2 = '#a0ffcb', gradientDir = 'horizontal' } = options;
  const padding = 24;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(...values) * 1.05;
  const minVal = Math.min(...values) * 0.98;
  const stepX = (w - padding * 2) / (values.length - 1);

  const gradient = ctx.createLinearGradient(0, 0, gradientDir === 'horizontal' ? w : 0, gradientDir === 'horizontal' ? 0 : h);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(1, accent2);

  ctx.lineWidth = 2.8;
  ctx.strokeStyle = gradient;
  ctx.beginPath();

  values.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = h - padding - ((val - minVal) / (maxVal - minVal)) * (h - padding * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  const fillGradient = ctx.createLinearGradient(0, padding, 0, h - padding * 0.5);
  fillGradient.addColorStop(0, `${accent}33`);
  fillGradient.addColorStop(1, '#00000000');
  ctx.fillStyle = fillGradient;
  ctx.lineTo(w - padding, h - padding);
  ctx.lineTo(padding, h - padding);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e5e7eb';
  ctx.font = '12px Inter, system-ui';
  ctx.globalAlpha = 0.8;
  values.forEach((val, i) => {
    if (i % 2 !== 0) return;
    const x = padding + i * stepX;
    const y = h - padding + 16;
    ctx.fillText(`${i + 1}月`, x - 10, y);
  });
  ctx.globalAlpha = 1;
}

document.addEventListener('DOMContentLoaded', () => {
  drawChart('heroSpark', dataSets.hero, { accent: '#7ee0ff', accent2: '#a0ffcb', gradientDir: 'horizontal' });
  drawChart('chartA', dataSets.aurora, { accent: '#7ee0ff', accent2: '#a0ffcb', gradientDir: 'vertical' });
  drawChart('chartB', dataSets.nocturne, { accent: '#82b1ff', accent2: '#6be5ff', gradientDir: 'horizontal' });
  drawChart('chartC', dataSets.serenity, { accent: '#a5f3fc', accent2: '#c4ffdd', gradientDir: 'vertical' });
  drawChart('chartD', dataSets.pulse, { accent: '#ff8ec7', accent2: '#ffc36a', gradientDir: 'horizontal' });
});
