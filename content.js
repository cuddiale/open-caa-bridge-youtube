// Struttura iniziale dei bottoni
let defaultButtons = [
  { id: 'si', text: 'SÌ', image: '🟢', color: '#22c55e', core: true },
  { id: 'no', text: 'NO', image: '🔴', color: '#ef4444', core: true },
  { id: 'bagno', text: 'BAGNO', image: '🚽', color: '#3b82f6', core: true },
  { id: 'mamma', text: 'MAMMA', image: '', color: '#c084fc', core: true },
  { id: 'papa', text: 'PAPÀ', image: '', color: '#818cf8', core: true }
];

// Funzione di sintesi vocale
function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

// Iniezione della barra laterale nel sito di YouTube
function injectSidebar() {
  if (document.getElementById('caa-sidebar')) return;

  const sidebar = document.createElement('div');
  sidebar.id = 'caa-sidebar';
  
  const grid = document.createElement('div');
  grid.className = 'caa-grid';
  sidebar.appendChild(grid);

  // Pannello di gestione in fondo alla barra
  const panel = document.createElement('div');
  panel.className = 'caa-parent-panel';
  
  // 1. Gestione Foto Mamma
  const labelMamma = document.createElement('label');
  labelMamma.className = 'caa-label-btn';
  labelMamma.innerText = '📸 FOTO MAMMA';
  const inputMamma = document.createElement('input');
  inputMamma.type = 'file';
  inputMamma.accept = 'image/*';
  inputMamma.className = 'caa-input-file';
  inputMamma.addEventListener('change', (e) => uploadPhoto('mamma', e));
  labelMamma.appendChild(inputMamma);
  
  // 2. Gestione Foto Papà
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

  // 3. SEZIONE: CREA NUOVO BOTTONE PERSONALIZZATO
  const addSection = document.createElement('div');
  addSection.className = 'caa-add-section';

  const addTitle = document.createElement('span');
  addTitle.innerText = '➕ NUOVO BOTTONE';
  addTitle.className = 'caa-section-title';
  addSection.appendChild(addTitle);

  // Input per il Testo
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'Es: BISCOTTO, GIOCO...';
  inputText.className = 'caa-input-text';
  addSection.appendChild(inputText);

  // Selezione Foto per il nuovo bottone
  let tempImageBase64 = '';
  const labelNewImg = document.createElement('label');
  labelNewImg.className = 'caa-label-btn';
  labelNewImg.style.backgroundColor = '#475569';
  labelNewImg.innerText = '📸 AGGIUNGI FOTO';
  
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

  // Bottone "Aggiungi" finale
  const submitBtn = document.createElement('button');
  submitBtn.className = 'caa-submit-btn';
  submitBtn.innerText = 'AGGIUNGI ORA';
  submitBtn.addEventListener('click', () => {
    const textVal = inputText.value.trim().toUpperCase();
    if (!textVal) return;

    chrome.storage.local.get(['caa_buttons'], (result) => {
      let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
      
      const newBtn = {
        id: 'custom_' + Date.now(),
        text: textVal,
        image: tempImageBase64 || '🖼️',
        color: '#ec4899', // Un bel fucsia/rosa per i nuovi pulsanti
        core: false // Indica che è un bottone personalizzato eliminabile
      };

      buttons.push(newBtn);
      chrome.storage.local.set({ caa_buttons: JSON.stringify(buttons) }, () => {
        renderButtons(buttons);
        // Resetta i campi del form dopo l'aggiunta
        inputText.value = '';
        tempImageBase64 = '';
        labelNewImg.innerText = '📸 AGGIUNGI FOTO';
        labelNewImg.style.backgroundColor = '#475569';
      });
    });
  });
  addSection.appendChild(submitBtn);
  
  panel.appendChild(addSection);
  sidebar.appendChild(panel);

  document.body.appendChild(sidebar);

  // Carica i bottoni all'avvio
  chrome.storage.local.get(['caa_buttons'], (result) => {
    let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
    renderButtons(buttons);
  });
}

// Disegna i bottoni nella griglia laterale
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

    // Se è un bottone personalizzato (core: false), aggiungiamo la "X" per cancellarlo
    if (btn.core === false) {
      const delBtn = document.createElement('button');
      delBtn.className = 'caa-del-btn';
      delBtn.innerText = '✕';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita di far parlare il bottone mentre lo si cancella
        if (confirm(`Vuoi eliminare il bottone "${btn.text}"?`)) {
          deleteButton(btn.id);
        }
      });
      container.appendChild(delBtn);
    }

    grid.appendChild(container);
  });
}

// Elimina un bottone personalizzato
function deleteButton(id) {
  chrome.storage.local.get(['caa_buttons'], (result) => {
    let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
    buttons = buttons.filter(btn => btn.id !== id);
    chrome.storage.local.set({ caa_buttons: JSON.stringify(buttons) }, () => {
      renderButtons(buttons);
    });
  });
}

// Gestione caricamento foto mamma e papà
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

// Gestione robusta dell'inizializzazione e dei cambi pagina di YouTube
function initExtension() {
  const oldSidebar = document.getElementById('caa-sidebar');
  if (oldSidebar) {
    oldSidebar.remove();
  }

  if (document.body) {
    injectSidebar();
  } else {
    setTimeout(initExtension, 100);
  }
}

// Avvia al primo caricamento della pagina
initExtension();

// Intercetta i cambi di navigazione interni di YouTube
window.addEventListener('yt-navigate-finish', () => {
  setTimeout(initExtension, 500);
});