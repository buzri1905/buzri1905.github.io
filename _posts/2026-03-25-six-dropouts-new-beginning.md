---
title: "여섯 번 자퇴하고 다시 시작하는 이야기"
date: 2026-03-25 13:00:00 +0900
categories: [일상, 에세이]
tags: [자퇴, 도전, 게임개발, 스마트팜, 인생]
description: "고등학교부터 런던 정경대까지 여섯 번 자퇴했다. 그리고 이제 1인 게임 개발과 스마트팜을 시작한다."
render_with_liquid: false
---

고등학교, 강원대, 서강대, 서울대 대학원, 런던 정경대 대학원, 고려대 대학원.

숫자로 세면 여섯 번이다.

매번 그만둘 때마다 이유가 있었다. 맞지 않는다는 느낌, 다른 걸 해보고 싶다는 생각. 그 감각을 무시하지 않았다. 잘한 선택이었다고 지금도 생각한다.

그렇다고 그냥 흘러다닌 건 아니다. 각자의 자리에서 배운 것들이 있고, 만난 사람들이 있고, 남은 것들이 있다. 자퇴가 낭비였다는 생각은 한 번도 해본 적 없다.

<style>
#mindmap-outer { margin: 2rem 0; text-align: center; }
#mindmap-outer p { font-size: 0.8rem; color: #999; margin-bottom: 6px; }
#mindmap-canvas { border-radius: 14px; max-width: 100%; background: #f4f5fb; display: block; margin: 0 auto; cursor: default; }
</style>

<div id="mindmap-outer">
  <p>노드를 클릭해보세요 👆</p>
  <canvas id="mindmap-canvas" width="600" height="440"></canvas>
</div>

<script>
(function () {
  var canvas = document.getElementById('mindmap-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W = 600, H = 440;
  var cx = W / 2, cy = H / 2 + 10;

  var NODES = [
    { label: ['나'],                   color: '#2c3e50', r: 32, isCenter: true, sub: '' },
    { label: ['고등학교'],             color: '#6c8ebf', r: 24, sub: '틀에 맞지 않는다는 걸\n일찍 알았다.' },
    { label: ['강원대'],               color: '#82b366', r: 24, sub: '스스로 선택한 공부가\n뭔지 처음 알게 된 곳.' },
    { label: ['서강대'],               color: '#d79b00', r: 24, sub: '어떤 환경에서 살고 싶은지\n감이 생겼다.' },
    { label: ['서울대', '대학원'],     color: '#c0785a', r: 24, sub: '학문의 깊이와 함께\n질식하는 느낌도 배웠다.' },
    { label: ['런던 정경대', '대학원'],color: '#9673a6', r: 24, sub: '세상이 얼마나 넓은지\n내가 얼마나 작은지.' },
    { label: ['고려대', '대학원'],     color: '#e07070', r: 24, sub: '진짜 하고 싶은 게\n뭔지 물었다.' },
    { label: ['지금 🚀'],             color: '#2dbe60', r: 30, sub: '1인 게임 개발\n+ 스마트팜', isFinal: true },
  ];

  // lay out outer nodes in a circle
  var outers = NODES.slice(1);
  var outerR = 155;
  outers.forEach(function (n, i) {
    var angle = -Math.PI / 2 + (i / outers.length) * Math.PI * 2;
    n.x = cx + outerR * Math.cos(angle);
    n.y = cy + outerR * Math.sin(angle);
  });
  NODES[0].x = cx;
  NODES[0].y = cy;

  var selected = null;
  var hovered  = null;

  /* ── rounded rect path ── */
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  /* ── main draw ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // background
    ctx.fillStyle = '#f4f5fb';
    ctx.fillRect(0, 0, W, H);

    // web ring between outer nodes
    ctx.save();
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(0,0,0,0.09)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    outers.forEach(function (n, i) {
      var nxt = outers[(i + 1) % outers.length];
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(nxt.x, nxt.y);
    });
    ctx.stroke();
    ctx.restore();

    // spokes (center → outer)
    outers.forEach(function (n) {
      var isSel = selected && selected === n;
      var isHov = hovered  && hovered  === n;
      ctx.save();
      if (!isSel) ctx.setLineDash([5, 5]);
      ctx.strokeStyle = isSel ? n.color : isHov ? n.color + 'aa' : '#bbb';
      ctx.lineWidth   = isSel ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(NODES[0].x, NODES[0].y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
      ctx.restore();
    });

    // outer nodes
    outers.forEach(function (n) { drawNode(n); });
    // center on top
    drawNode(NODES[0]);

    // tooltip for selected
    if (selected && !selected.isCenter && selected.sub) {
      drawTooltip(selected);
    }
  }

  function drawNode(n) {
    var isSel = selected === n;
    var isHov = hovered  === n;
    var r = n.r + (isSel ? 5 : isHov ? 2 : 0);

    ctx.save();

    // glow ring for selected
    if (isSel) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 10, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '33';
      ctx.fill();
    }

    // circle fill
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = (isSel || n.isCenter) ? n.color : '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.18)';
    ctx.shadowBlur  = isSel ? 14 : 7;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    ctx.fill();

    // reset shadow before stroke
    ctx.shadowColor   = 'transparent';
    ctx.shadowBlur    = 0;
    ctx.shadowOffsetY = 0;

    // circle stroke (outer only)
    if (!n.isCenter) {
      ctx.strokeStyle = n.color;
      ctx.lineWidth   = 2.2;
      ctx.stroke();
    }

    // label text
    ctx.fillStyle     = (isSel || n.isCenter) ? '#ffffff' : n.color;
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';
    var fs = n.isCenter ? 14 : 10;
    ctx.font = 'bold ' + fs + 'px sans-serif';
    n.label.forEach(function (line, i) {
      var lh = fs + 3;
      var oy = (i - (n.label.length - 1) / 2) * lh;
      ctx.fillText(line, n.x, n.y + oy);
    });

    ctx.restore();
  }

  function drawTooltip(n) {
    var lines   = n.sub.split('\n');
    var padX    = 14, padY = 10, lh = 18;
    var boxW    = 180;
    var boxH    = lines.length * lh + padY * 2;

    // position: prefer below, else above
    var bx = n.x - boxW / 2;
    var by = n.y + n.r + 16;
    if (by + boxH > H - 8) by = n.y - n.r - boxH - 14;
    if (bx < 6)            bx = 6;
    if (bx + boxW > W - 6) bx = W - boxW - 6;

    ctx.save();

    // drop shadow on box
    ctx.shadowColor   = 'rgba(0,0,0,0.13)';
    ctx.shadowBlur    = 12;
    ctx.shadowOffsetY = 3;
    roundRect(bx, by, boxW, boxH, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.shadowColor   = 'transparent';
    ctx.shadowBlur    = 0;
    ctx.shadowOffsetY = 0;

    // border
    roundRect(bx, by, boxW, boxH, 9);
    ctx.strokeStyle = n.color;
    ctx.lineWidth   = 1.8;
    ctx.stroke();

    // top accent strip
    ctx.beginPath();
    ctx.rect(bx + 2, by, boxW - 4, 5);
    ctx.fillStyle = n.color;
    ctx.fill();

    // text
    ctx.fillStyle    = '#444444';
    ctx.font         = '11px sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    lines.forEach(function (line, i) {
      ctx.fillText(line, bx + boxW / 2, by + padY + 5 + i * lh + lh / 2);
    });

    ctx.restore();
  }

  /* ── events ── */
  function hitTest(mx, my) {
    for (var i = NODES.length - 1; i >= 0; i--) {
      var n = NODES[i];
      var dx = mx - n.x, dy = my - n.y;
      if (dx * dx + dy * dy <= (n.r + 8) * (n.r + 8)) return n;
    }
    return null;
  }

  function coords(e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = W / rect.width;
    var scaleY = H / rect.height;
    var src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY };
  }

  canvas.addEventListener('click', function (e) {
    var p   = coords(e);
    var hit = hitTest(p.x, p.y);
    selected = (hit && selected === hit) ? null : hit;
    draw();
  });

  canvas.addEventListener('mousemove', function (e) {
    var p = coords(e);
    hovered = hitTest(p.x, p.y);
    canvas.style.cursor = hovered ? 'pointer' : 'default';
    draw();
  });

  canvas.addEventListener('mouseleave', function () {
    hovered = null;
    draw();
  });

  canvas.addEventListener('touchend', function (e) {
    e.preventDefault();
    var p   = coords(e.changedTouches ? { touches: e.changedTouches } : e);
    var hit = hitTest(p.x, p.y);
    selected = (hit && selected === hit) ? null : hit;
    draw();
  });

  draw();
})();
</script>

---

이번엔 두 가지를 시작하려 한다.

하나는 **1인 게임 개발**이다. 혼자서 기획하고, 만들고, 출시하는 것. 오래 마음에 품고 있던 일이다.

다른 하나는 **스마트팜**이다. 센서와 데이터로 식물을 키우는 일. 기술과 농업이 만나는 지점이 흥미롭다.

두 가지 모두 수입이 언제 생길지 모른다. 오래 걸릴 수도 있다. 그래도 해보려 한다.

---

두렵냐고 하면 솔직히 두렵다.

그런데 돌이켜보면 뭔가를 그만두거나 새로 시작할 때마다 늘 두려웠다. 그 두려움이 틀렸던 적은 없었다. 중요한 일 앞에서 당연히 드는 감정이었다.

지금 이 두려움도 그런 것이라 믿는다.

화이팅.
