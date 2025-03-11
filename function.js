let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to load voices
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

// Ensure voices are loaded properly
if (typeof speechSynthesis.onvoiceschanged !== "undefined") {
    speechSynthesis.onvoiceschanged = loadVoices;
} else {
    loadVoices();
}

// Event listener for Listen button
document.querySelector("button").addEventListener("click", () => {
    const selectedVoice = voices[voiceSelect.value];
    
    if (selectedVoice) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech

        // Recreate the speech object to avoid Android issues
        speech = new SpeechSynthesisUtterance();
        speech.text = document.querySelector("textarea").value;
        speech.voice = selectedVoice; // Set the selected voice
        speech.lang = selectedVoice.lang; // Important: Set the language of the speech to match the voice's language

        if (speech.text.trim() !== "") {
            setTimeout(() => { 
                window.speechSynthesis.speak(speech);
            }, 200); // Slight delay to ensure voice switching works properly
        }
    }
});

// Load voices immediately if available
loadVoices();
