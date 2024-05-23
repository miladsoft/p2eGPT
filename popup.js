document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const persianText = document.getElementById('persianText');
    const insertButton = document.getElementById('insertButton');
  
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'fa-IR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    let isRecording = false;
  
    startButton.addEventListener('click', () => {
      if (!isRecording) {
        recognition.start();
        isRecording = true;
        startButton.textContent = 'Stop Recording';
      } else {
        recognition.stop();
        isRecording = false;
        startButton.textContent = 'Start Recording';
      }
    });
  
    recognition.onresult = async (event) => {
      const persianSpeech = event.results[0][0].transcript;
      persianText.value = persianSpeech;
    };
  
    recognition.onspeechend = () => {
      recognition.stop();
      isRecording = false;
      startButton.textContent = 'Start Recording';
    };
  
    recognition.onerror = (event) => {
      console.error('Error occurred in recognition: ' + event.error);
      isRecording = false;
      startButton.textContent = 'Start Recording';
    };
  
    insertButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { text: persianText.value });
      });
    });
  });
  