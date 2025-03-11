let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to populate the voices
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        voiceSelect.innerHTML = ''; // Clear previous options
        voices.forEach((voice, index) => {
            let option = document.createElement("option");
            option.value = index; 
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
        speech.voice = voices[0]; // Set default voice
    }
}

// Load voices immediately if available
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}
loadVoices(); // Try loading voices even if onvoiceschanged event doesn't fire

// Event listener for voice selection change
voiceSelect.addEventListener("change", () => {
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) speech.voice = selectedVoice;
});

// Event listener for Listen button
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    if (speech.text.trim() !== "") {
        window.speechSynthesis.cancel(); // Clear any ongoing speech before starting
        window.speechSynthesis.speak(speech);
    }
});
