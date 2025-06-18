// script.js
const quotes = [
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "In order to be irreplaceable, one must always be different.",
  "Java is to JavaScript what car is to Carpet."
];

let quoteIndex = 0;
let currentQuote = "";
let startTime = null;
let cooldown = false;

const quoteDiv = document.getElementById("quote");
const input = document.getElementById("input");
const statsDiv = document.getElementById("stats");
const cooldownMsg = document.getElementById("cooldownMsg");

function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDiv.textContent = currentQuote;
  input.value = "";
  statsDiv.classList.add("hidden");
  input.disabled = false;
  input.focus();
  startTime = new Date().getTime();
}

function endTest() {
  const endTime = new Date().getTime();
  const elapsed = (endTime - startTime) / 1000;
  const words = input.value.trim().split(/\s+/).length;
  const wpm = Math.round((words / elapsed) * 60);
  statsDiv.innerHTML = `⏱️ Time: ${elapsed.toFixed(2)}s<br>🚀 WPM: ${wpm}`;
  statsDiv.classList.remove("hidden");
  input.disabled = true;
}

input.addEventListener("input", () => {
  if (input.value === currentQuote) {
    endTest();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!cooldown) {
      cooldown = true;
      loadQuote();
      cooldownMsg.textContent = "🔄 Test restarted...";
      setTimeout(() => {
        cooldown = false;
        cooldownMsg.textContent = "";
      }, 2000);
    } else {
      cooldownMsg.textContent = "⏳ Please wait...";
    }
  }
});

loadQuote();
