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

<div id="dropout-journey-viz" style="margin:2rem 0;"></div>

<script>
(function () {
  var STEPS = [
    { id:1, label:"고등학교",         icon:"🏫", color:"#6c8ebf", note:"첫 번째 자퇴. 틀에 맞지 않는다는 걸 일찍 알았다." },
    { id:2, label:"강원대",           icon:"🎓", color:"#82b366", note:"스스로 선택한 공부가 뭔지 처음 알게 된 곳." },
    { id:3, label:"서강대",           icon:"🎓", color:"#d79b00", note:"내가 어떤 환경에서 살고 싶은지 감이 생겼다." },
    { id:4, label:"서울대 대학원",    icon:"🏛️", color:"#a0522d", note:"학문의 깊이와 함께 질식하는 느낌도 배웠다." },
    { id:5, label:"런던 정경대 대학원", icon:"🌍", color:"#9673a6", note:"세상이 얼마나 넓은지 — 그리고 내가 얼마나 작은지." },
    { id:6, label:"고려대 대학원",    icon:"🎓", color:"#e07070", note:"마지막으로 스스로에게 물었다. \"진짜 하고 싶은 게 뭐야?\"" },
    { id:7, label:"지금",             icon:"🚀", color:"#2dbe60", note:"1인 게임 개발 + 스마트팜. 두렵지만, 시작한다.", isFinal:true }
  ];

  function build() {
    var container = document.getElementById("dropout-journey-viz");
    if (!container) return;
    container.innerHTML = "";
    container.style.cssText = "font-family:sans-serif;padding:1.5rem 1rem;background:#f9f9fb;border-radius:12px;";

    var hint = document.createElement("p");
    hint.style.cssText = "text-align:center;color:#999;font-size:0.82rem;margin:0 0 1rem;";
    hint.textContent = "각 단계를 클릭해보세요 👆";
    container.appendChild(hint);

    STEPS.forEach(function(step, idx) {
      var row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:stretch;";

      /* ── spine ── */
      var spine = document.createElement("div");
      spine.style.cssText = "display:flex;flex-direction:column;align-items:center;width:36px;flex-shrink:0;";

      var topLine = document.createElement("div");
      topLine.style.cssText = "flex:1;width:2px;background:" + (idx === 0 ? "transparent" : "#ddd") + ";min-height:10px;";

      var dot = document.createElement("div");
      dot.style.cssText = [
        "width:" + (step.isFinal ? "20px" : "14px"),
        "height:" + (step.isFinal ? "20px" : "14px"),
        "border-radius:50%",
        "background:" + step.color,
        "border:3px solid white",
        "box-shadow:0 0 0 2px " + step.color,
        "flex-shrink:0",
        "cursor:pointer",
        "transition:transform .2s",
        "z-index:1"
      ].join(";") + ";";

      var botLine = document.createElement("div");
      botLine.style.cssText = "flex:1;width:2px;background:" + (idx === STEPS.length - 1 ? "transparent" : "#ddd") + ";min-height:10px;";

      spine.appendChild(topLine);
      spine.appendChild(dot);
      spine.appendChild(botLine);

      /* ── card ── */
      var card = document.createElement("div");
      card.style.cssText = [
        "flex:1",
        "margin:5px 0 5px 12px",
        "padding:10px 14px",
        "border-radius:8px",
        "background:white",
        "border:1.5px solid " + (step.isFinal ? step.color : "#eee"),
        "cursor:pointer",
        "transition:box-shadow .2s, border-color .2s",
        step.isFinal ? "box-shadow:0 2px 10px " + step.color + "44" : ""
      ].join(";") + ";";

      var header = document.createElement("div");
      header.style.cssText = "display:flex;align-items:center;gap:8px;";

      var iconEl = document.createElement("span");
      iconEl.style.cssText = "font-size:1.1rem;";
      iconEl.textContent = step.icon;

      var labelEl = document.createElement("span");
      labelEl.style.cssText = "font-weight:700;color:" + (step.isFinal ? step.color : "#333") + ";font-size:0.93rem;";
      labelEl.textContent = step.label;

      var badge = document.createElement("span");
      badge.style.cssText = [
        "margin-left:auto",
        "font-size:0.68rem",
        "background:" + step.color + "22",
        "color:" + step.color,
        "padding:2px 8px",
        "border-radius:20px",
        "font-weight:700"
      ].join(";") + ";";
      badge.textContent = step.isFinal ? "▶ 시작" : "자퇴";

      header.appendChild(iconEl);
      header.appendChild(labelEl);
      header.appendChild(badge);

      var noteEl = document.createElement("div");
      noteEl.style.cssText = "font-size:0.82rem;color:#666;line-height:1.5;margin-top:0;max-height:0;overflow:hidden;transition:max-height .35s ease,opacity .35s,margin-top .35s;opacity:0;";
      noteEl.textContent = step.note;

      card.appendChild(header);
      card.appendChild(noteEl);

      var open = !!step.isFinal;
      if (open) {
        noteEl.style.maxHeight = "80px";
        noteEl.style.opacity = "1";
        noteEl.style.marginTop = "7px";
      }

      function toggle() {
        open = !open;
        noteEl.style.maxHeight   = open ? "80px" : "0";
        noteEl.style.opacity     = open ? "1"    : "0";
        noteEl.style.marginTop   = open ? "7px"  : "0";
        card.style.borderColor   = open ? step.color : (step.isFinal ? step.color : "#eee");
        card.style.boxShadow     = open ? "0 2px 12px " + step.color + "44" : (step.isFinal ? "0 2px 10px " + step.color + "44" : "");
        dot.style.transform      = open ? "scale(1.35)" : "scale(1)";
      }

      card.addEventListener("click", toggle);
      dot.addEventListener("click", toggle);

      row.appendChild(spine);
      row.appendChild(card);
      container.appendChild(row);
    });

    var footer = document.createElement("div");
    footer.style.cssText = "text-align:center;margin-top:1rem;font-size:0.8rem;color:#aaa;";
    footer.innerHTML = "총 <strong style='color:#e07070'>6번</strong>의 자퇴 → <strong style='color:#2dbe60'>새로운 시작</strong>";
    container.appendChild(footer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
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
