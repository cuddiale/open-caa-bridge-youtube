// Struttura iniziale dei bottoni
let defaultButtons = [
  { id: 'si', text: 'SÌ', image: '🟢', color: '#22c55e' },
  { id: 'no', text: 'NO', image: '🔴', color: '#ef4444' },
  { id: 'bagno', text: 'BAGNO', image: '🚽', color: '#3b82f6' },
  { id: 'aiuto', text: 'AIUTO', image: '🆘', color: '#eab308' },
  { id: 'mamma', text: 'MAMMA', image: '', color: '#c084fc' },
  { id: 'papa', text: 'PAPÀ', image: '', color: '#818cf8' }
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

  // Pannello di gestione per la mamma/papà in fondo
  const panel = document.createElement('div');
  panel.className = 'caa-parent-panel';
  
  const labelMamma = document.createElement('label');
  labelMamma.className = 'caa-label-btn';
  labelMamma.innerText = '📸 FOTO MAMMA';
  const inputMamma = document.createElement('input');
  inputMamma.type = 'file';
  inputMamma.accept = 'image/*';
  inputMamma.className = 'caa-input-file';
  inputMamma.addEventListener('change', (e) => uploadPhoto('mamma', e));
  labelMamma.appendChild(inputMamma);
  
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
  sidebar.appendChild(panel);

  document.body.appendChild(sidebar);

  // Carica i bottoni memorizzati
  chrome.storage.local.get(['caa_buttons'], (result) => {
    let buttons = result.caa_buttons ? JSON.parse(result.caa_buttons) : defaultButtons;
    renderButtons(buttons);
  });
}

// Disegna fisicamente i bottoni a schermo
function renderButtons(buttons) {
  const grid = document.querySelector('.caa-grid');
  if (!grid) return;
  grid.innerHTML = '';

  buttons.forEach(btn => {
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

    grid.appendChild(buttonEl);
  });
}

// Gestione del caricamento foto
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

// Avvia l'iniezione non appena la pagina di YouTube è pronta
const observer = new MutationObserver(() => {
  if (document.body) {
    observer.disconnect();
    injectSidebar();
  }
});
observer.observe(document.documentElement, { childList: true });