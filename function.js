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
            option.value = voice.name; // Use voice name instead of index
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
        speech.voice = voices[0]; // Set default voice
    }
}

// Trigger loading voices
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Event listener for voice selection change
voiceSelect.addEventListener("change", () => {
    const selectedVoiceName = voiceSelect.value;
    speech.voice = voices.find(voice => voice.name === selectedVoiceName);
});

// Event listener for Listen button
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    if (speech.text.trim() !== "") {
        window.speechSynthesis.speak(speech);
    }
});
