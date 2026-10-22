const blowBtn = document.getElementById("blowBtn");
const candle = document.querySelector(".candle");
const hint = document.getElementById("hint");
const confettiContainer = document.getElementById("confetti");

const emojis = ["🎉", "🎈", "🎂", "🎁", "✨", "🥳"];

function spawnConfetti() {
  for (let i = 0; i < 60; i++) {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 2 + Math.random() * 2 + "s";
    span.style.fontSize = 1 + Math.random() * 1.2 + "rem";
    confettiContainer.appendChild(span);
    setTimeout(() => span.remove(), 4000);
  }
}

blowBtn.addEventListener("click", () => {
  candle.dataset.lit = "false";
  blowBtn.disabled = true;
  blowBtn.textContent = "🎊 Wish made!";
  hint.textContent = "Happy Birthday, Stepan! May all your wishes come true! 🥳";
  spawnConfetti();
});
