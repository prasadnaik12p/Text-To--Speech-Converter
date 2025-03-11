let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");


//Function of select element
window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices(); //loades the list of voices from system
    speech.voice = voices[0]; //speeks in defalut index value
    voices.forEach((voice,i) => {
        voiceSelect.options[i] = new Option(voice.name,i) //Addes multiple voices into select pannel
    })
};

voiceSelect.addEventListener("change",() =>{
    speech.voice = voices[voiceSelect.value]
});


//Function of Listen button
document.querySelector("button").addEventListener("click", ()=>{
    speech.text = document.querySelector("textarea").value; //accesing the text from textarea
    window.speechSynthesis.speak(speech);
});