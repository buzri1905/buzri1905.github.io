// dropout-journey.js
// Interactive visualization of the six-dropout journey

(function () {
  const STEPS = [
    {
      id: 1,
      label: "고등학교",
      year: null,
      icon: "🏫",
      color: "#6c8ebf",
      note: "첫 번째 자퇴. 틀에 맞지 않는다는 걸 일찍 알았다.",
    },
    {
      id: 2,
      label: "강원대",
      year: null,
      icon: "🎓",
      color: "#82b366",
      note: "스스로 선택한 공부가 뭔지 처음 알게 된 곳.",
    },
    {
      id: 3,
      label: "서강대",
      year: null,
      icon: "🎓",
      color: "#d79b00",
      note: "내가 어떤 환경에서 살고 싶은지 감이 생겼다.",
    },
    {
      id: 4,
      label: "서울대 대학원",
      year: null,
      icon: "🏛️",
      color: "#a0522d",
      note: "학문의 깊이와 함께 질식하는 느낌도 배웠다.",
    },
    {
      id: 5,
      label: "런던 정경대 대학원",
      year: null,
      icon: "🌍",
      color: "#9673a6",
      note: "세상이 얼마나 넓은지 — 그리고 내가 얼마나 작은지.",
    },
    {
      id: 6,
      label: "고려대 대학원",
      year: null,
      icon: "🎓",
      color: "#e07070",
      note: "마지막으로 스스로에게 물었다. "진짜 하고 싶은 게 뭐야?"",
    },
    {
      id: 7,
      label: "지금",
      year: "2026",
      icon: "🚀",
      color: "#2dbe60",
      note: "1인 게임 개발 + 스마트팜. 두렵지만, 시작한다.",
      isFinal: true,
    },
  ];

  function buildViz(container) {
    container.innerHTML = "";
    container.style.cssText =
      "font-family:sans-serif;padding:1.5rem;background:#f9f9fb;border-radius:12px;";

    const title = document.createElement("p");
    title.style.cssText =
      "text-align:center;color:#555;margin:0 0 1.2rem;font-size:0.85rem;letter-spacing:.05em;";
    title.textContent = "각 단계를 클릭해보세요";
    container.appendChild(title);

    const track = document.createElement("div");
    track.style.cssText =
      "display:flex;flex-direction:column;gap:0;position:relative;";

    STEPS.forEach((step, idx) => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:stretch;position:relative;";

      // Left: connector line + dot
      const spine = document.createElement("div");
      spine.style.cssText =
        "display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0;";

      const topLine = document.createElement("div");
      topLine.style.cssText = `flex:1;width:2px;background:${idx === 0 ? "transparent" : "#ddd"};min-height:12px;`;

      const dot = document.createElement("div");
      dot.style.cssText = `
        width:${step.isFinal ? "22px" : "16px"};
        height:${step.isFinal ? "22px" : "16px"};
        border-radius:50%;
        background:${step.color};
        border:3px solid white;
        box-shadow:0 0 0 2px ${step.color};
        flex-shrink:0;
        transition:transform .2s;
        cursor:pointer;
        z-index:1;
      `;

      const bottomLine = document.createElement("div");
      bottomLine.style.cssText = `flex:1;width:2px;background:${idx === STEPS.length - 1 ? "transparent" : "#ddd"};min-height:12px;`;

      spine.appendChild(topLine);
      spine.appendChild(dot);
      spine.appendChild(bottomLine);

      // Right: card
      const card = document.createElement("div");
      card.style.cssText = `
        flex:1;
        margin:6px 0 6px 12px;
        padding:10px 14px;
        border-radius:8px;
        background:white;
        border:1.5px solid ${step.isFinal ? step.color : "#eee"};
        cursor:pointer;
        transition:box-shadow .2s, border-color .2s;
        ${step.isFinal ? `box-shadow:0 2px 10px ${step.color}44;` : ""}
      `;

      const header = document.createElement("div");
      header.style.cssText = "display:flex;align-items:center;gap:8px;";

      const icon = document.createElement("span");
      icon.style.cssText = "font-size:1.1rem;";
      icon.textContent = step.icon;

      const labelEl = document.createElement("span");
      labelEl.style.cssText = `font-weight:600;color:${step.isFinal ? step.color : "#333"};font-size:0.95rem;`;
      labelEl.textContent = step.label;

      const badge = document.createElement("span");
      if (!step.isFinal) {
        badge.style.cssText = `
          margin-left:auto;
          font-size:0.7rem;
          background:${step.color}22;
          color:${step.color};
          padding:2px 8px;
          border-radius:20px;
          font-weight:600;
        `;
        badge.textContent = "자퇴";
      } else {
        badge.style.cssText = `
          margin-left:auto;
          font-size:0.7rem;
          background:${step.color}22;
          color:${step.color};
          padding:2px 8px;
          border-radius:20px;
          font-weight:700;
        `;
        badge.textContent = "▶ 시작";
      }

      header.appendChild(icon);
      header.appendChild(labelEl);
      header.appendChild(badge);

      const noteEl = document.createElement("div");
      noteEl.style.cssText =
        "font-size:0.82rem;color:#777;margin-top:6px;max-height:0;overflow:hidden;transition:max-height .35s ease, opacity .35s;opacity:0;";
      noteEl.textContent = step.note;

      card.appendChild(header);
      card.appendChild(noteEl);

      // Toggle expand
      let open = step.isFinal;
      if (open) {
        noteEl.style.maxHeight = "80px";
        noteEl.style.opacity = "1";
      }

      function toggle() {
        open = !open;
        noteEl.style.maxHeight = open ? "80px" : "0";
        noteEl.style.opacity = open ? "1" : "0";
        card.style.boxShadow = open
          ? `0 2px 12px ${step.color}44`
          : "";
        card.style.borderColor = open ? step.color : (step.isFinal ? step.color : "#eee");
        dot.style.transform = open ? "scale(1.3)" : "scale(1)";
      }

      card.addEventListener("click", toggle);
      dot.addEventListener("click", toggle);

      card.addEventListener("mouseenter", () => {
        if (!open) card.style.boxShadow = "0 2px 8px #0001";
      });
      card.addEventListener("mouseleave", () => {
        if (!open) card.style.boxShadow = "";
      });

      row.appendChild(spine);
      row.appendChild(card);
      track.appendChild(row);
    });

    container.appendChild(track);

    // Counter
    const counter = document.createElement("div");
    counter.style.cssText =
      "text-align:center;margin-top:1rem;font-size:0.8rem;color:#aaa;";
    counter.innerHTML = `총 <strong style="color:#e07070">6번</strong>의 자퇴 → <strong style="color:#2dbe60">새로운 시작</strong>`;
    container.appendChild(counter);
  }

  // Mount when DOM ready
  function mount() {
    const el = document.getElementById("dropout-journey-viz");
    if (el) buildViz(el);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
