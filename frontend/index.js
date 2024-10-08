import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const targetLanguage = document.getElementById('targetLanguage');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');
const speakBtn = document.getElementById('speakBtn');
const historyList = document.getElementById('historyList');

translateBtn.addEventListener('click', translateText);
speakBtn.addEventListener('click', speakTranslation);

async function translateText() {
    const text = inputText.value;
    const lang = targetLanguage.value;
    
    if (!text) return;

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            const translatedText = data.responseData.translatedText;
            outputText.textContent = translatedText;
            
            // Add translation to history
            await backend.addTranslation(text, translatedText, lang);
            updateTranslationHistory();
        } else {
            outputText.textContent = 'Translation failed. Please try again.';
        }
    } catch (error) {
        console.error('Translation error:', error);
        outputText.textContent = 'An error occurred. Please try again.';
    }
}

function speakTranslation() {
    const text = outputText.textContent;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage.value;
    speechSynthesis.speak(utterance);
}

async function updateTranslationHistory() {
    const history = await backend.getTranslationHistory();
    historyList.innerHTML = '';
    history.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.original} -> ${record.translated} (${record.targetLanguage})`;
        historyList.appendChild(li);
    });
}

// Initial load of translation history
updateTranslationHistory();
