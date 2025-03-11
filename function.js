let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to load voices and populate the select element
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speech.voice = voices[0]; // Default to the first voice
        voiceSelect.innerHTML = ''; // Clear previous options
        voices.forEach((voice, i) => {
            let option = new Option(voice.name, i);
            voiceSelect.add(option);
        });
    }
}

// Load voices when available
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
} else {
    loadVoices();
}

// Change voice when a new option is selected
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Function of Listen button
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
