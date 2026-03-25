---
title: "여섯 번 자퇴하고 다시 시작하는 이야기"
date: 2026-03-25 13:00:00 +0900
categories: [일상, 에세이]
tags: [자퇴, 도전, 게임개발, 스마트팜, 인생]
description: "고등학교부터 런던 정경대까지 여섯 번 자퇴했다. 그리고 이제 1인 게임 개발과 스마트팜을 시작한다."
---

고등학교, 강원대, 서강대, 서울대 대학원, 런던 정경대 대학원, 고려대 대학원.

숫자로 세면 여섯 번이다.

매번 그만둘 때마다 이유가 있었다. 맞지 않는다는 느낌, 다른 걸 해보고 싶다는 생각. 그 감각을 무시하지 않았다. 잘한 선택이었다고 지금도 생각한다.

그렇다고 그냥 흘러다닌 건 아니다. 각자의 자리에서 배운 것들이 있고, 만난 사람들이 있고, 남은 것들이 있다. 자퇴가 낭비였다는 생각은 한 번도 해본 적 없다.

<div id="mindmap-wrap" style="margin:2rem 0;text-align:center;">
  <p style="font-size:0.8rem;color:#999;margin-bottom:6px;">노드를 클릭해보세요 👆</p>
  <canvas id="mindmap-canvas" style="width:100%;max-width:620px;border-radius:14px;display:block;margin:0 auto;"></canvas>
</div>

<script>
(function () {
  function init() {
    var wrap = document.getElementById('mindmap-wrap');
    var canvas = document.getElementById('mindmap-canvas');
    if (!canvas) return;

    var W = Math.min(wrap.offsetWidth || 600, 620);
    var H = Math.round(W * 0.72);
    canvas.width = W;
    canvas.height = H;

    var ctx = canvas.getContext('2d');
    var cx = W / 2, cy = H / 2;

    var NODES = [
      { id:0, lines:['나'], color:'#2c3e50', textColor:'#fff', r:30, isCenter:true, sub:'' },
      { id:1, lines:['고등학교'],         color:'#6c8ebf', r:26, sub:'틀에 맞지 않는다는 걸\n일찍 알았다.' },
      { id:2, lines:['강원대'],           color:'#82b366', r:26, sub:'스스로 선택한 공부가\n뭔지 처음 알게 된 곳.' },
      { id:3, lines:['서강대'],           color:'#d79b00', r:26, sub:'어떤 환경에서 살고 싶은지\n감이 생겼다.' },
      { id:4, lines:['서울대','대학원'],   color:'#a0522d', r:26, sub:'학문의 깊이와 함께\n질식하는 느낌도 배웠다.' },
      { id:5, lines:['런던 정경대','대학원'], color:'#9673a6', r:26, sub:'세상이 얼마나 넓은지\n내가 얼마나 작은지.' },
      { id:6, lines:['고려대','대학원'],   color:'#e07070', r:26, sub:'진짜 하고 싶은 게\n뭔지 물었다.' },
      { id:7, lines:['지금 🚀'],          color:'#2dbe60', r:30, sub:'1인 게임 개발\n+ 스마트팜', isFinal:true },
    ];

    // Position outer nodes
    var outerR = Math.min(W, H) * 0.34;
    var outers = NODES.slice(1);
    outers.forEach(function (n, i) {
      var angle = -Math.PI / 2 + (i / outers.length) * Math.PI * 2;
      n.x = cx + outerR * Math.cos(angle);
      n.y = cy + outerR * Math.sin(angle);
      n.angle = angle;
    });
    NODES[0].x = cx;
    NODES[0].y = cy;

    var selected = null;
    var hovered = null;

    /* ── helpers ── */
    function rrect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    /* ── draw ── */
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // bg
      var bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.65);
      bg.addColorStop(0, '#f5f6ff');
      bg.addColorStop(1, '#ecedf5');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // web ring (connecting adjacent outer nodes)
      ctx.beginPath();
      outers.forEach(function (n, i) {
        var nxt = outers[(i + 1) % outers.length];
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nxt.x, nxt.y);
      });
      ctx.strokeStyle = 'rgba(0,0,0,0.07)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // spokes
      outers.forEach(function (n) {
        var isSel = selected && selected.id === n.id;
        var isHov = hovered && hovered.id === n.id;
        ctx.beginPath();
        ctx.moveTo(NODES[0].x, NODES[0].y);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = isSel ? n.color : isHov ? n.color + '88' : 'rgba(0,0,0,0.13)';
        ctx.lineWidth = isSel ? 2.5 : isHov ? 1.8 : 1.5;
        ctx.setLineDash(isSel ? [] : [5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // nodes (outer first, center on top)
      outers.forEach(function (n) { drawNode(n); });
      drawNode(NODES[0]);

      // tooltip
      if (selected && !selected.isCenter && selected.sub) drawTooltip(selected);
    }

    function drawNode(n) {
      var isSel = selected && selected.id === n.id;
      var isHov = hovered && hovered.id === n.id;
      var r = n.r + (isSel ? 5 : isHov ? 2 : 0);

      // glow
      if (isSel) {
        var g = ctx.createRadialGradient(n.x, n.y, r * 0.5, n.x, n.y, r + 14);
        g.addColorStop(0, n.color + '55');
        g.addColorStop(1, n.color + '00');
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 14, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = (isSel || n.isCenter) ? n.color : '#fff';
      ctx.shadowColor = isSel ? n.color : 'rgba(0,0,0,0.12)';
      ctx.shadowBlur = isSel ? 12 : 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (!n.isCenter) {
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // label
      var lines = n.lines;
      ctx.fillStyle = (isSel || n.isCenter) ? '#fff' : n.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var fontSize = n.isCenter ? 13 : 10;
      ctx.font = 'bold ' + fontSize + 'px sans-serif';
      lines.forEach(function (line, i) {
        var lineH = fontSize + 3;
        var offsetY = (i - (lines.length - 1) / 2) * lineH;
        ctx.fillText(line, n.x, n.y + offsetY);
      });

      // final star badge
      if (n.isFinal) {
        ctx.font = 'bold 9px sans-serif';
        ctx.fillStyle = '#fff';
      }
    }

    function drawTooltip(n) {
      var lines = n.sub.split('\n');
      var PX = 14, PY = 10, LH = 17;
      var tw = 170;
      var th = lines.length * LH + PY * 2;

      // prefer below node, else above
      var tx = n.x - tw / 2;
      var ty = n.y + n.r + 12;
      if (ty + th > H - 8) ty = n.y - n.r - th - 12;
      if (tx < 6) tx = 6;
      if (tx + tw > W - 6) tx = W - tw - 6;

      // shadow box
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 12;
      rrect(tx, ty, tw, th, 8);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.shadowBlur = 0;

      // border
      rrect(tx, ty, tw, th, 8);
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // top accent bar
      rrect(tx, ty, tw, 5, 4);
      ctx.fillStyle = n.color;
      ctx.fill();

      // text
      ctx.fillStyle = '#444';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      lines.forEach(function (line, i) {
        ctx.fillText(line, tx + tw / 2, ty + PY + 5 + i * LH + LH / 2);
      });
    }

    /* ── hit test ── */
    function hitNode(mx, my) {
      for (var i = NODES.length - 1; i >= 0; i--) {
        var n = NODES[i];
        if (n.x === undefined) continue;
        var hit = n.r + 8;
        if ((mx - n.x) * (mx - n.x) + (my - n.y) * (my - n.y) <= hit * hit) return n;
      }
      return null;
    }

    function getPos(e) {
      var rect = canvas.getBoundingClientRect();
      var sx = canvas.width / rect.width;
      var sy = canvas.height / rect.height;
      var src = e.touches ? e.touches[0] : e;
      return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy };
    }

    canvas.addEventListener('click', function (e) {
      var p = getPos(e);
      var hit = hitNode(p.x, p.y);
      selected = (hit && selected && hit.id === selected.id) ? null : hit;
      draw();
    });

    canvas.addEventListener('mousemove', function (e) {
      var p = getPos(e);
      var hit = hitNode(p.x, p.y);
      hovered = hit;
      canvas.style.cursor = hit ? 'pointer' : 'default';
      draw();
    });

    canvas.addEventListener('mouseleave', function () {
      hovered = null;
      draw();
    });

    draw();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // small delay so layout is settled
    setTimeout(init, 50);
  }
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
