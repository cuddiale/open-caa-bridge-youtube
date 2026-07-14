# Open CAA Bridge for YouTube 🟢🔴🚽

Un'estensione browser (manifest v3) leggera e open-source progettata per facilitare l'accessibilità di YouTube a bambini e persone che comunicano tramite **CAA (Comunicazione Aumentativa Alternativa)**.

L'estensione affianca una colonna fissa di pulsanti CAA interattivi e parlanti (sintesi vocale nativa in italiano) direttamente sul lato destro del vero sito originale di YouTube (`youtube.com`), consentendo un'esperienza multimediale autonoma e accessibile senza perdere l'interfaccia a cui l'utente è abituato.

## ✨ Caratteristiche
- **Layout Affiancato:** Ridimensiona automaticamente la pagina di YouTube per fare spazio a una barra laterale fissa (250px) che non scompare mai, nemmeno durante lo scorrimento.
- **Sintesi Vocale (TTS) Integrata:** Cliccando sui pulsanti, il browser pronuncerà ad alta voce il comando in italiano.
- **Pulsanti Dinamici:** Oltre ai comandi base (Sì, No, Bagno, Aiuto), puoi caricare foto reali per *MAMMA* e *PAPÀ* e creare **nuovi pulsanti personalizzati** in autonomia, salvando tutto localmente nel dispositivo.
- **Nessun Server Esterno:** Funziona completamente offline e rispetta al 100% la privacy dell'utente.

---

## 💻 Come installarla

### Su Android (Tablet e Smartphone)
Per usare le estensioni su Android è necessario **Kiwi Browser** (disponibile sul Play Store).
1. Scarica il file `.zip` del progetto e scompattalo nella memoria del tablet.
2. Apri **Kiwi Browser** e digita `kiwi://extensions` nella barra degli indirizzi.
3. Attiva la **"Modalità sviluppatore"** in alto a destra.
4. Clicca su **"Load (+)"** (oppure "Carica estensione") e seleziona la cartella estratta.
5. Apri [youtube.com](https://www.youtube.com), attiva la vista "Sito Desktop" dal menu del browser e goditi l'interfaccia.

### Su iPad (iOS)
Su iPad è necessario utilizzare il browser **Orion Browser** (disponibile sull'App Store), l'unico che supporta le estensioni di Chrome/Firefox.
1. Salva il file `.zip` del progetto nell'app **File** dell'iPad e scompattalo.
2. Installa e apri **Orion Browser**.
3. Vai in *Impostazioni* > *Advanced* e attiva la **"Developer Mode"**.
4. Digita `orion://extensions` nella barra degli indirizzi.
5. Clicca su **"Install from disk"** e seleziona la cartella dell'estensione.
6. Apri [youtube.com](https://www.youtube.com) (assicurandoti che sia in modalità desktop) per visualizzare la barra.

### Su PC (Chrome, Edge, Brave)
1. Scarica e scompatta la cartella del progetto sul tuo computer.
2. Apri il browser e vai alla gestione estensioni (es. `chrome://extensions/`).
3. Attiva la **"Modalità sviluppatore"** in alto a destra.
4. Clicca su **"Carica estensione non pacchettizzata"** e seleziona la cartella del progetto.

---

## 🛠️ Tecnologie Utilizzate
- **JavaScript (Vanilla):** Per la logica di iniezione nel DOM, sintesi vocale (`SpeechSynthesis`) e gestione file.
- **CSS3:** Per il layout responsive e l'integrazione fluida con l'interfaccia di YouTube.
- **Chrome Storage API:** Per memorizzare le configurazioni e le foto in locale sul dispositivo.

## 🤝 Contribuire
Se hai idee per migliorare l'estensione, aggiungere simboli standard (es. PCS o ARASAAC) o implementare nuove funzionalità di accessibilità, sentiti libero di aprire una **Issue** o inviare una **Pull Request**!

---
*Sviluppato con il cuore per abbattere le barriere digitali.*