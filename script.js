// ================= Calculator =================
function calculate() {
    let expression = document.getElementById("calcInput").value;
    try {
        document.getElementById("calcResult").innerText = "Result: " + eval(expression);
    } catch {
        document.getElementById("calcResult").innerText = "Invalid Expression";
    }
}

// ================= To-Do List =================
let tasks = [];
function addTask() {
    let task = document.getElementById("todoInput").value;
    if (task.trim() !== "") {
        tasks.push(task);
        updateTasks();
        document.getElementById("todoInput").value = "";
    }
}
function updateTasks() {
    let taskList = document.getElementById("todoList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        taskList.innerHTML += `<li>${task} <button onclick="removeTask(${index})">❌</button></li>`;
    });
}
function removeTask(index) {
    tasks.splice(index, 1);
    updateTasks();
}

// ================= Coin Toss =================
function coinToss() {
    let result = Math.random() < 0.5 ? "Heads" : "Tails";
    document.getElementById("coinResult").innerText = "Result: " + result;
}

// ================= Number Guessing Game =================
function numberGuess() {
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let userGuess = parseInt(prompt("Guess a number between 1 and 10:"));
    if (userGuess === randomNumber) {
        alert("🎉 Correct! You guessed the number!");
    } else {
        alert("❌ Wrong! The number was " + randomNumber);
    }
}

// ================= QR Code Generator =================
function generateQR() {
    let qrText = document.getElementById("qrInput").value;
    if (qrText.trim() !== "") {
        let qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`;
        document.getElementById("qrImage").src = qrCode;
    }
}

// ================= Fetch Python Backend - YouTube MP3 =================
async function downloadAudio() {
    let url = document.getElementById("videoUrl").value;
    let response = await fetch("https://your-backend-url.com/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url })
    });
    let data = await response.json();
    document.getElementById("downloadStatus").innerText = data.message || data.error;
}

// ================= Fetch Python Backend - Weather =================
async function checkWeather() {
    let city = document.getElementById("weatherInput").value;
    let response = await fetch("https://your-backend-url.com/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: city })
    });
    let data = await response.json();
    document.getElementById("weatherResult").innerText = 
        `🌡️ Temperature: ${data.temp}°C, ☁️ Condition: ${data.condition}`;
}
