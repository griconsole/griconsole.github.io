/* ===== BOOT SEQUENCE ===== */
setTimeout(() => {
  const boot = document.getElementById("bootScreen");
  boot.style.display = "none";
}, 3500);

/* ===== WINDOW SYSTEM ===== */
let topZ = 20;

document.querySelectorAll(".icon").forEach(icon => {
  icon.addEventListener("dblclick", () => {
    openWindow(icon.dataset.app);
  });
});

function openWindow(app) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.zIndex = ++topZ;

  win.innerHTML = `
    <div class="title-bar">
      <span>${app}</span>
      <button class="close">X</button>
    </div>
    <iframe src="/desktop/apps/${app}.html"></iframe>
  `;

  win.querySelector(".close").onclick = () => win.remove();
  win.onclick = () => win.style.zIndex = ++topZ;

  makeDraggable(win);

  document.body.appendChild(win);
}

/* ===== DRAGGING ===== */
function makeDraggable(win) {
  const bar = win.querySelector(".title-bar");
  let offsetX = 0, offsetY = 0, dragging = false;

  bar.addEventListener("mousedown", e => {
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = ++topZ;
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => dragging = false);
}
