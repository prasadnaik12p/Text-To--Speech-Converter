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
    loadVoices(); // Load voices if the event doesn't fire
}

// Event listener for Listen button
document.querySelector("button").addEventListener("click", () => {
    const selectedVoice = voices[voiceSelect.value];
    
    if (selectedVoice) {
        speech.voice = selectedVoice; // Set the voice before speaking
    }

    speech.text = document.querySelector("textarea").value;

    if (speech.text.trim() !== "") {
        window.speechSynthesis.cancel(); // Stop any previous speech
        setTimeout(() => { // Adding a slight delay for Android compatibility
            window.speechSynthesis.speak(speech); // Start speaking
        }, 100);
    }
});

// Load voices immediately if available
loadVoices();
