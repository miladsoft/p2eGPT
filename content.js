chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text) {
      const textarea = document.querySelector('textarea');  // اینجا به المان درست در سایت ChatGPT اشاره کنید
      if (textarea) {
        textarea.value = request.text;
        const inputEvent = new Event('input', { bubbles: true });
        textarea.dispatchEvent(inputEvent);
      }
    }
  });
  