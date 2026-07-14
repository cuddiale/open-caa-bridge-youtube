// Elenco iniziale dei bottoni fissi
let defaultButtons = [
  { id: 'si', text: 'SÌ', image: '🟢', color: '#22c55e', core: true },
  { id: 'no', text: 'NO', image: '🔴', color: '#ef4444', core: true },
  { id: 'bagno', text: 'BAGNO', image: '🚽', color: '#3b82f6', core: true },
  { id: 'aiuto', text: 'AIUTO', image: '🆘', color: '#eab308', core: true },
  { id: 'mamma', text: 'MAMMA', image: '', color: '#c084fc', core: true },
  { id: 'papa', text: 'PAPÀ', image: '', color: '#818cf8', core: true }
];

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

function injectSidebar() {
  if (document.getElementById('caa-sidebar')) return;

  const sidebar = document.createElement('div');
  sidebar.id = 'caa-sidebar';
  
  const grid = document.createElement('div');
  grid.className = 'caa-grid';
  sidebar.appendChild(grid);

  // Pannello di gestione esistente
  const panel = document.createElement('div');
  panel.className = 'caa-parent-panel';
  
  // Foto Mamma
  const labelMamma = document.createElement('label');
  labelMamma.className = 'caa-label-btn';
  labelMamma.innerText = '📸 FOTO MAMMA';
  const inputMamma = document.createElement('input');
  inputMamma.type = 'file';
  inputMamma.accept = 'image/*';
  inputMamma.className = 'caa-input-file';
  inputMamma.addEventListener('change', (e) => uploadPhoto('mamma', e));
  labelMamma.appendChild(inputMamma);
  
  // Foto Papà
  const labelPapa = document.createElement('label');
  labelPapa.className = 'caa-label-btn';
  labelPapa.style.backgroundColor = '#6366f1';
  labelPapa.innerText = '📸 FOTO PAPÀ';
  const inputPapa = document.createElement('input');
  inputPapa.type = 'file';
  inputPapa.accept = 'image/*';
  inputPapa.className = 'caa-input-file';
  inputPapa.addEventListener('change', (e) => uploadPhoto('papa', e));
  labelPapa.appendChild(inputPapa);

  panel.appendChild(labelMamma);
  panel.appendChild(labelPapa);

  // === NUOVA SEZIONE: CREAZIONE BOTTONE PERSONALIZZATO ===
  const addSection = document.createElement('div');
  addSection.className = 'caa-add-section';
  addSection.style.marginTop = '15px';
  addSection.style.paddingTop = '15px';
  addSection.style.borderTop = '1px solid #e2e8f0';

  // Input di testo
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'NOME BOTTONE (es. BISCOTTO)';
  inputText.className = 'caa-input-text';
  inputText.style.width = '100%';
  inputText.style.marginBottom = '8px';
  inputText.style.padding = '6px';
  inputText.style.borderRadius = '4px';
  inputText.style.border = '1px solid #cbd5e1';
  addSection.appendChild(inputText);

  // Caricamento foto per il nuovo bottone
  let tempImageBase64 = '';
  const labelNewImg = document.createElement('label');
  labelNewImg.className = 'caa-label-btn';
  labelNewImg.style.backgroundColor = '#475569';
  labelNewImg.style.marginBottom = '8px';
  labelNewImg.innerText = '🖼️ SELEZIONA FOTO';
  
  const inputNewImg = document.createElement('input');
  inputNewImg.type = 'file';
  inputNewImg.accept = 'image/*';
  inputNewImg.className = 'caa-input-file';
  inputNewImg.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        tempImageBase64 = reader.result;
        labelNewImg.innerText = '✅ FOTO PRONTA';
        labelNewImg.style.backgroundColor = '#16a34a';
      };
      reader.readAsDataURL(file);
    }
  });
  labelNewImg.appendChild(inputNewImg);
  addSection.appendChild(labelNewImg);

  // Pulsante di conferma invio
  const submitBtn = document.createElement('button');
  submitBtn.className = 'caa-label-btn';
  submitBtn.style.backgroundColor = '#ec4899';
  submitBtn.style.width = '100%';
  submitBtn.style.cursor = 'pointer';
  submitBtn.innerText = '➕ AGGIUNGI BOTTONE';
  submitBtn.addEventListener('click', () => {
    const textVal = inputText.value.trim().toUpperCase();
    if (!textVal) return;

    chrome.storage.local.get(['caa_buttons'], (result) => {
      let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
      
      const newBtn = {
        id: 'custom_' + Date.now(),
        text: textVal,
        image: tempImageBase64 || '✨', // Usa un'emoji di default se non carichi una foto
        color: '#f43f5e',
        core: false // Permette di identificarlo come eliminabile
      };

      buttons.push(newBtn);
      chrome.storage.local.set({ caa_buttons: JSON.stringify(buttons) }, () => {
        renderButtons(buttons);
        // Reset dei campi
        inputText.value = '';
        tempImageBase64 = '';
        labelNewImg.innerText = '🖼️ SELEZIONA FOTO';
        labelNewImg.style.backgroundColor = '#475569';
      });
    });
  });
  addSection.appendChild(submitBtn);
  
  panel.appendChild(addSection);
  // =======================================================

  sidebar.appendChild(panel);
  document.body.appendChild(sidebar);

  chrome.storage.local.get(['caa_buttons'], (result) => {
    let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
    renderButtons(buttons);
  });
}

function renderButtons(buttons) {
  const grid = document.querySelector('.caa-grid');
  if (!grid) return;
  grid.innerHTML = '';

  buttons.forEach(btn => {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '100%';

    const buttonEl = document.createElement('div');
    buttonEl.className = 'caa-btn';
    buttonEl.style.backgroundColor = btn.color;
    buttonEl.addEventListener('click', () => speak(btn.text));

    if (btn.image && btn.image.startsWith('data:image')) {
      const img = document.createElement('img');
      img.className = 'caa-btn-img';
      img.src = btn.image;
      buttonEl.appendChild(img);
    } else {
      const emoji = document.createElement('span');
      emoji.className = 'caa-btn-emoji';
      emoji.innerText = btn.image || '👤';
      buttonEl.appendChild(emoji);
    }

    const text = document.createElement('span');
    text.className = 'caa-btn-text';
    text.innerText = btn.text;
    buttonEl.appendChild(text);

    container.appendChild(buttonEl);

    // Se il bottone è personalizzato (core non è true), aggiungiamo un piccolo tasto per eliminarlo
    if (!btn.core) {
      const delBtn = document.createElement('button');
      delBtn.innerText = '✕';
      delBtn.style.position = 'absolute';
      delBtn.style.top = '2px';
      delBtn.style.right = '2px';
      delBtn.style.background = 'rgba(0,0,0,0.6)';
      delBtn.style.color = '#fff';
      delBtn.style.border = 'none';
      delBtn.style.borderRadius = '50%';
      delBtn.style.width = '18px';
      delBtn.style.height = '18px';
      delBtn.style.cursor = 'pointer';
      delBtn.style.fontSize = '10px';
      delBtn.style.display = 'flex';
      delBtn.style.alignItems = 'center';
      delBtn.style.justifyContent = 'center';
      
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita di attivare la voce del bottone mentre lo cancelli
        if (confirm(`Vuoi eliminare il bottone "${btn.text}"?`)) {
          deleteButton(btn.id);
        }
      });
      container.appendChild(delBtn);
    }

    grid.appendChild(container);
  });
}

function deleteButton(id) {
  chrome.storage.local.get(['caa_buttons'], (result) => {
    let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
    buttons = buttons.filter(btn => btn.id !== id);
    chrome.storage.local.set({ caa_buttons: JSON.stringify(buttons) }, () => {
      renderButtons(buttons);
    });
  });
}

function uploadPhoto(id, event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      chrome.storage.local.get(['caa_buttons'], (result) => {
        let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
        buttons = buttons.map(btn => btn.id === id ? { ...btn, image: reader.result } : btn);
        chrome.storage.local.set({ caa_buttons: JSON.stringify(buttons) }, () => {
          renderButtons(buttons);
        });
      });
    };
    reader.readAsDataURL(file);
  }
}

// Manteniamo esattamente il tuo meccanismo di osservazione originale
const observer = new MutationObserver(() => {
  if (document.body) {
    injectSidebar();
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });