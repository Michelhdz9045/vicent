// Mobile nav
const burger = document.querySelector("[data-burger]");
const nav = document.querySelector("[data-nav]");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
}

// Portfolio filters
const filters = document.querySelector("[data-filters]");
const grid = document.querySelector("[data-grid]");
function setFilter(tag) {
  if (!grid) return;
  const tiles = [...grid.querySelectorAll(".tile")];
  tiles.forEach(t => {
    const ok = tag === "all" || t.dataset.tag === tag;
    t.style.display = ok ? "" : "none";
  });
}
if (filters) {
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    [...filters.querySelectorAll(".chip")].forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    setFilter(btn.dataset.filter);
  });
}

// Jump-to filter from “Top Products”
document.querySelectorAll("[data-filter-jump]").forEach(a => {
  a.addEventListener("click", () => {
    const tag = a.getAttribute("data-filter-jump");
    const btn = document.querySelector(`.chip[data-filter="${tag}"]`);
    if (btn) btn.click();
  });
});

// Lightbox
const lb = document.querySelector("[data-lightbox]");
const lbImg = document.querySelector("[data-lightbox-img]");
const lbClose = document.querySelector("[data-close]");

function openLB(src, alt){
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = alt || "Image";
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
}
function closeLB(){
  if (!lb) return;
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
}

if (grid) {
  grid.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    const img = tile.querySelector("img");
    if (!img) return;
    openLB(img.src, img.alt);
  });
}
if (lbClose) lbClose.addEventListener("click", closeLB);
if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLB(); });

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
