import {paragraph,authorName} from './methods.js';

//I've Got the Text in another file
export const speech = window.speechSynthesis;
const voiceSelect = document.querySelector('#voiceSelect');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rateValue');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitchValue');

// declaring a variable with an Empty array to get voices from api and Save it
let voices = [];

const getVoices = () => {
    voices = speech.getVoices();

    // Loop Through voices and crate an option for each language
    voices.forEach(voice => {
        const option = document.createElement('option');

        // Fill option with voices and laguages
        option.textContent = voice.name + `(${voice.lang})`;
        // set option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    })
}
getVoices();
if(speech.onvoiceschanged !== undefined){
    speech.onvoiceschanged = getVoices;
}
export const speechFn = () => {
    if(speech.speaking){
        alert(`It's already speaking!!`)
        return;
    }
    const sp = new SpeechSynthesisUtterance(`${paragraph.innerText} by ${authorName.innerText}`);
    sp.onend = e =>{
        console.log('Done speacking...');
        voiceSelect.disabled =  false;
    }
    sp.onerror = e=> {
        console.log('something went wrong...');
        voiceSelect.disabled =  false;
    }

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    
    // Loop through voices to get the chosen voice
    voices.forEach(voice => {
        if(voice.name === selectedVoice){
            sp.voice = voice;
        }
    })
    sp.rate = rate.value;
    sp.pitch = pitch.value;

    speech.speak(sp);
    voiceSelect.disabled =  true;

}

// Event listners

rate.addEventListener('change' , e=> rateValue.textContent = rate.value);
pitch.addEventListener('change' , e=> pitchValue.textContent = pitch.value);