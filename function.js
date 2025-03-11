let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to load voices and populate the select element
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        voiceSelect.innerHTML = ''; // Clear previous options
        voices.forEach((voice, i) => {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = voice.name;
            voiceSelect.appendChild(option);
        });
        speech.voice = voices[0]; // Set default voice
    }
}

// Continuously check for voices until they are loaded
function checkVoices() {
    if (voices.length === 0) {
        loadVoices();
    }
}

// Call loadVoices immediately if voices are already available
if (speechSynthesis.getVoices().length > 0) {
    loadVoices();
} else {
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
}

// Check for voices every 500ms if not loaded
setInterval(checkVoices, 500);

// Event listener for voice selection change
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Event listener for Listen button
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    if (speech.text.trim() !== "") {
        window.speechSynthesis.speak(speech);
    }
});
