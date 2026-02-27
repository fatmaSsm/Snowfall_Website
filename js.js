const isMobile = window.innerWidth < 768;

const snowContainer = document.querySelector(".snow-container");

let wind = 0;
let targetWind = 0;
let lastMouseX = window.innerWidth / 2;

/* Mouse movement sets target wind */
document.addEventListener("mousemove", (e) => {
    const deltaX = e.clientX - lastMouseX;
    targetWind = deltaX * 0.6; // stronger mouse influence
    lastMouseX = e.clientX;
});

/* Smooth wind (important part) */
function updateWind() {
    wind += (targetWind - wind) * 0.05; // inertia
    targetWind *= 0.9;                 // decay
    requestAnimationFrame(updateWind);
}
updateWind();

/* Create snowflake */
function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = "❄️";

    const startX = Math.random() * window.innerWidth;
    const minSize = window.innerWidth < 768 ? 18 : 10;
    const maxSize = window.innerWidth < 768 ? 30 : 26;

    const size = Math.random() * (maxSize - minSize) + minSize;

    const duration = window.innerWidth < 768
        ? Math.random() * 4 + 7
        : Math.random() * 5 + 6;

    snowflake.style.left = startX + "px";
    snowflake.style.fontSize = size + "px";
    snowflake.style.opacity = Math.random();
    snowflake.style.animationDuration = duration + "s";

    snowContainer.appendChild(snowflake);

    let offsetX = 0;
    const personalDrift = (Math.random() - 0.5) * 0.6;

    function drift() {
        offsetX += personalDrift + wind * 0.02; // stronger & visible
        snowflake.style.transform = `translateX(${offsetX}px)`;
        requestAnimationFrame(drift);
    }

    drift();

    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

/* Generate snow */
setInterval(createSnowflake, isMobile ? 120 : 70);

