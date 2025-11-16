// Sample texts for typing test
const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This is a test to measure your typing speed and accuracy.",
    "Typing is a skill that improves with practice. Focus on accuracy before speed to achieve better results.",
    "In the modern world, efficient typing is essential for productivity and communication."
];

// Leaderboard data (placeholder)
let leaderboard = [
    { username: "SpeedyTypist", wpm: 120, accuracy: 98 },
    { username: "FastFingers", wpm: 105, accuracy: 95 },
    { username: "QuickKeys", wpm: 90, accuracy: 97 }
];

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.getElementById('theme-toggle').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Typing Test Logic
let startTime, endTime;
let testRunning = false;

const sampleTextElement = document.getElementById('sample-text');
const userInputElement = document.getElementById('user-input');
const startButton = document.getElementById('start-test');
const resultsElement = document.getElementById('results');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const timeElement = document.getElementById('time');

function startTest() {
    if (testRunning) return;
    testRunning = true;
    userInputElement.disabled = false;
    userInputElement.value = '';
    userInputElement.focus();
    resultsElement.classList.add('hidden');
    startButton.textContent = 'Stop Test';
    
    // Set random sample text
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    sampleTextElement.textContent = randomText;
    
    startTime = new Date();
}

function stopTest() {
    if (!testRunning) return;
    testRunning = false;
    userInputElement.disabled = true;
    startButton.textContent = 'Start Test';
    
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    
    // Calculate WPM
    const typedText = userInputElement.value;
    const wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;
    const wpm = Math.round((wordsTyped / timeTaken) * 60);
    
    // Calculate Accuracy
    const sampleText = sampleTextElement.textContent;
    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, sampleText.length); i++) {
        if (typedText[i] === sampleText[i]) correctChars++;
    }
    const accuracy = Math.round((correctChars / sampleText.length) * 100);
    
    // Display Results
    wpmElement.textContent = wpm;
    accuracyElement.textContent = `${accuracy}%`;
    timeElement.textContent = `${timeTaken.toFixed(2)}s`;
    resultsElement.classList.remove('hidden');
    
    // Update Leaderboard (simulated)
    const username = localStorage.getItem('username') || 'Guest';
    leaderboard.push({ username, wpm, accuracy });
    leaderboard.sort((a, b) => b.wpm - a.wpm);
    leaderboard = leaderboard.slice(0, 10); // Top 10
    updateLeaderboard();
}

startButton.addEventListener('click', () => {
    if (testRunning) {
        stopTest();
    } else {
        startTest();
    }
});

// Leaderboard Update
function updateLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.username}</td>
            <td>${entry.wpm}</td>
            <td>${entry.accuracy}%</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

// Authentication (Placeholder)
function handleAuth(isRegister = false) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        if (isRegister) {
            alert(`Registered as ${username}! (Note: This is a frontend-only demo.)`);
        } else {
            alert(`Logged in as ${username}! (Note: This is a frontend-only demo.)`);
        }
        localStorage.setItem('username', username);
    } else {
        alert('Please enter username and password.');
    }
}

// Initialize Leaderboard
updateLeaderboard();