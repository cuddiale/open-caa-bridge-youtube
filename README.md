# Open CAA Bridge for YouTube 🟢🔴🚽

Un'estensione browser (manifest v3) leggera e open-source progettata per facilitare l'accessibilità di YouTube a bambini e persone che comunicano tramite **CAA (Comunicazione Aumentativa Alternativa)**.

L'estensione affianca una colonna fissa di pulsanti CAA interattivi e parlanti (sintesi vocale nativa in italiano) direttamente sul lato destro del vero sito originale di YouTube (`youtube.com`), consentendo un'esperienza multimediale autonoma e accessibile senza perdere l'interfaccia a cui l'utente è abituato.

## ✨ Caratteristiche
- **Layout Affiancato:** Ridimensiona automaticamente la pagina di YouTube per fare spazio a una barra laterale fissa (250px) che non scompare mai, nemmeno durante lo scorrimento.
- **Sintesi Vocale (TTS) Integrata:** Cliccando sui pulsanti, il browser pronuncerà ad alta voce il comando in italiano.
- **Pulsanti di Base Preconfigurati:** *SÌ* (Verde), *NO* (Rosso), *BAGNO* (Blu), *AIUTO* (Giallo).
- **Personalizzazione con Foto Reali:** Include due pulsanti dedicati per *MAMMA* e *PAPÀ* in cui i genitori possono caricare le proprie foto reali direttamente dal dispositivo. Le immagini vengono salvate localmente nella memoria del browser (`chrome.storage.local`).
- **Nessun Server Esterno:** Funziona completamente offline e rispetta al 100% la privacy dell'utente.

---

## 💻 Come installarla (Android & PC)

### Su Android (Tablet e Smartphone)
Per usare le estensioni su Android è necessario un browser che supporti le estensioni di Chrome. Consigliamo **Kiwi Browser** (disponibile gratuitamente sul Play Store).

1. **Scarica questo progetto** sul tablet (puoi scaricare il file `.zip` da questa pagina GitHub ed estrarlo nella memoria del dispositivo).
2. Apri **Kiwi Browser**.
3. Nella barra degli indirizzi digita: `chrome://extensions/` e premi Invio.
4. Attiva la **"Modalità sviluppatore"** (l'interruttore in alto a destra).
5. Clicca sul pulsante **"Load unpacked"** (Carica estensione non pacchettizzata) in alto a sinistra.
6. Seleziona la cartella dell'estensione estratta (quella che contiene il file `manifest.json`).
7. Apri [youtube.com](https://www.youtube.com) e goditi l'interfaccia CAA integrata!

### Su PC (Chrome, Edge, Opera, Brave)
1. Scarica e scompatta la cartella del progetto sul tuo computer.
2. Apri il browser e vai alla gestione delle estensioni (es. `chrome://extensions/` su Chrome).
3. Attiva la **"Modalità sviluppatore"** in alto a destra.
4. Clicca su **"Carica estensione non pacchettizzata"** e seleziona la cartella del progetto.

---

## 🛠️ Tecnologie Utilizzate
- **JavaScript (Vanilla):** Per la logica di iniezione nel DOM di YouTube, sintesi vocale (`SpeechSynthesis`) e caricamento file.
- **CSS3:** Per il layout responsive e l'isolamento degli stili tramite regole `!important` (per evitare che i fogli di stile di YouTube rompano la barra CAA).
- **Chrome Storage API:** Per memorizzare i file delle foto in formato Base64 a livello locale.

## 🤝 Contribuire
Se hai idee per migliorare l'estensione, aggiungere simboli standard (es. PCS o ARASAAC) o implementare nuove funzionalità di accessibilità, sentiti libero di aprire una **Issue** o inviare una **Pull Request**!

---
*Sviluppato con il cuore per abbattere le barriere digitali.*