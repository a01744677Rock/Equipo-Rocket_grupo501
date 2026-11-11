/* ==========================================================
   Equipo Rocket · Landing page
   >>> EDITA AQUÍ los datos de tu misión <<<
   ========================================================== */
const MISION = {
  // Fecha y hora del lanzamiento (formato ISO, con zona horaria de Sinaloa -07:00)
  fechaLanzamiento: "2026-12-12T09:00:00-07:00",

  // Fases: estado = "done" (completada) | "live" (en proceso) | "next" (próximamente)
  fases: [
    { nombre: "Diseño",            texto: "Definición de la misión, simulaciones y planos del cohete.", estado: "done" },
    { nombre: "Construcción",      texto: "Fabricación de fuselaje, aletas, cono y bahía de electrónica.", estado: "live" },
    { nombre: "Pruebas en tierra", texto: "Pruebas estáticas, de recuperación y de telemetría.",          estado: "next" },
    { nombre: "Lanzamiento",       texto: "Integración final, cuenta regresiva y despegue.",               estado: "next" }
  ],

  // Tripulación: cambia los nombres y roles por los de tu equipo
  tripulacion: [
    { nombre: "[Nombre del integrante]", rol: "Comandante de misión" },
    { nombre: "[Nombre del integrante]", rol: "Ingeniería de propulsión" },
    { nombre: "[Nombre del integrante]", rol: "Ingeniería de estructuras" },
    { nombre: "[Nombre del integrante]", rol: "Aviónica y electrónica" },
    { nombre: "[Nombre del integrante]", rol: "Control de misión y telemetría" }
  ]
};

/* ---------------- Fases (hero + timeline) ---------------- */
const BADGE = { done: ["Completada", "badge-done"], live: ["En proceso", "badge-live"], next: ["Próximamente", "badge-next"] };
(function renderFases() {
  const tracker = document.getElementById("tracker");
  const timeline = document.getElementById("timeline");
  const actual = MISION.fases.findIndex(f => f.estado === "live");
  const idx = actual >= 0 ? actual : MISION.fases.length - 1;

  document.getElementById("phaseName").textContent =
    String(idx + 1).padStart(2, "0") + " " + MISION.fases[idx].nombre.toUpperCase();
  const pb = document.getElementById("phaseBadge");
  pb.textContent = BADGE[MISION.fases[idx].estado][0];
  pb.className = "badge " + BADGE[MISION.fases[idx].estado][1];

  MISION.fases.forEach((f, i) => {
    const li = document.createElement("li");
    li.textContent = f.nombre;
    li.className = f.estado;
    tracker.appendChild(li);

    const step = document.createElement("li");
    step.className = "step reveal " + f.estado;
    step.innerHTML =
      `<span class="step-num">${String(i + 1).padStart(2, "0")}</span>
       <div class="step-body"><h3>${f.nombre}</h3><p>${f.texto}</p></div>
       <span class="badge ${BADGE[f.estado][1]}">${BADGE[f.estado][0]}</span>`;
    timeline.appendChild(step);
  });
})();

/* ---------------- Tripulación ---------------- */
(function renderCrew() {
  const crew = document.getElementById("crew");
  MISION.tripulacion.forEach((m, i) => {
    const iniciales = m.nombre.replace(/[\[\]]/g, "").split(/\s+/).filter(Boolean)
      .slice(0, 2).map(p => p[0].toUpperCase()).join("") || "ER";
    const card = document.createElement("article");
    card.className = "member reveal";
    card.innerHTML =
      `<span class="member-id">ER-${String(i + 1).padStart(2, "0")}</span>
       <div class="avatar" aria-hidden="true">${m.nombre.startsWith("[") ? "ER" : iniciales}</div>
       <h3>${m.nombre}</h3>
       <p class="role">${m.rol}</p>
       <span class="badge badge-done">Listo para despegue</span>`;
    crew.appendChild(card);
  });
})();

/* ---------------- Cuenta regresiva ---------------- */
(function countdown() {
  const target = new Date(MISION.fechaLanzamiento).getTime();
  const el = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, "0");
  function tick() {
    let diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000);  diff -= h * 3600000;
    const m = Math.floor(diff / 60000);    diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    el("cd-d").textContent = pad(d);
    el("cd-h").textContent = pad(h);
    el("cd-m").textContent = pad(m);
    el("cd-s").textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

/* ---------------- Estrellas ---------------- */
(function stars() {
  const c = document.getElementById("stars");
  const ctx = c.getContext("2d");
  let list = [];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = innerWidth * dpr;
    c.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((innerWidth * innerHeight) / 5000);
    list = Array.from({ length: n }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.4 + .2,
      a: Math.random(),
      s: Math.random() * .02 + .004,
      v: Math.random() * .25 + .05
    }));
  }
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const st of list) {
      st.a += st.s;
      if (!still) { st.y += st.v; if (st.y > innerHeight) { st.y = 0; st.x = Math.random() * innerWidth; } }
      ctx.globalAlpha = .35 + Math.abs(Math.sin(st.a)) * .65;
      ctx.fillStyle = st.r > 1.2 ? "#bfe9ff" : "#ffffff";
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!still) requestAnimationFrame(draw);
  }
  resize();
  addEventListener("resize", resize);
  draw();
})();

/* ---------------- Cohete: despegue + scroll ---------------- */
(function launch() {
  const rocket = document.getElementById("rocket");
  const trail = document.getElementById("trail");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const t0 = performance.now();
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  function frame(now) {
    // despegue automático: 1.4 s de encendido, luego sube ~22% de la pantalla
    const t = Math.min(1, Math.max(0, (now - t0 - 1400) / 4000));
    const auto = ease(t) * innerHeight * .22;
    // el scroll lo sigue elevando hasta salir de la pantalla
    const max = document.documentElement.scrollHeight - innerHeight || 1;
    const p = Math.min(1, scrollY / max);
    const y = auto + p * innerHeight * 1.25;
    const sway = Math.sin(now / 900) * 4 * t;
    rocket.style.transform = `translate(calc(-50% + ${sway}px), ${-y}px)`;
    trail.style.height = Math.min(y * .9, innerHeight) + "px";
    requestAnimationFrame(frame);
  }
  if (still) {
    rocket.style.transform = `translate(-50%, ${-innerHeight * .22}px)`;
  } else {
    requestAnimationFrame(frame);
  }
})();

/* ---------------- Navbar ---------------- */
(function nav() {
  const navEl = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  addEventListener("scroll", () => navEl.classList.toggle("scrolled", scrollY > 30), { passive: true });
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
  const anchors = [...links.querySelectorAll("a")];
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        anchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["inicio", "objetivos", "fases", "identidad", "tripulacion"].forEach(id => io.observe(document.getElementById(id)));
})();

/* ---------------- Revelado ---------------- */
(function reveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();

/* ---------------- Señal secreta ---------------- */
(function secret() {
  const btn = document.getElementById("secret");
  const toast = document.getElementById("toast");
  btn.addEventListener("click", () => {
    toast.textContent = "SEÑAL SECRETA DETECTADA · MISIÓN R DESBLOQUEADA";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  });
})();
