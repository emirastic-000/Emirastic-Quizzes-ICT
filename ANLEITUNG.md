# Emirastic ICT Quiz - Installationsanleitung

## 📖 Willkommen!

Diese Anleitung hilft Ihnen dabei, die Quiz-Anwendung auf Ihrem Computer einzurichten und zu starten. Sie brauchen keine IT-Vorkenntnisse - folgen Sie einfach Schritt für Schritt dieser Anleitung.

**Geschätzte Zeit:** 2 Minuten (automatische Installation) oder 15-20 Minuten (manuelle Installation)

---

## 🎯 Was Sie am Ende haben werden

- Eine funktionierende Quiz-Anwendung auf Ihrem Computer
- Zugriff über Ihren Webbrowser (Chrome, Firefox, Edge, etc.)
- Die Möglichkeit, ICT-Modul-Quizzes zu absolvieren

---

## ⚡ Option A: Automatische Installation (Empfohlen für Windows)

**Neu in Version 0.3:** Wir haben die Installation stark vereinfacht!

### Voraussetzungen prüfen
Sie benötigen **nur 2 Programme** bereits installiert:
1. **Node.js** (Version 16 oder höher)
2. **MongoDB** (Version 5.0 oder höher)

Wenn Sie diese Programme noch nicht haben, folgen Sie den Anweisungen unter "Option B: Manuelle Installation" → Schritt 1.

### Automatische Einrichtung starten

1. Öffnen Sie den Projektordner (z.B. `C:\Users\Public\Helpdesk Quiz`)
2. **Doppelklicken** Sie auf die Datei: **`setup-windows.bat`**
3. Das Setup-Skript wird automatisch:
   - ✅ Node.js und MongoDB erkennen
   - ✅ Alle benötigten Pakete installieren
   - ✅ Die Datenbank mit Quiz-Fragen befüllen
   - ✅ Optional: Die Anwendung starten

**Das war's!** Nach 1-2 Minuten sollte die Anwendung bereit sein.

> 💡 **Tipp:** Wenn Sie in Zukunft die Anwendung starten möchten, doppelklicken Sie einfach auf **`start-all.bat`**

### Fehlerbehebung bei automatischer Installation
- **"Node.js nicht gefunden"**: Installieren Sie Node.js (siehe Option B → Schritt 1.1)
- **"MongoDB nicht gefunden"**: Installieren Sie MongoDB (siehe Option B → Schritt 1.2)
- Falls Probleme auftreten: Verwenden Sie die manuelle Installation (Option B)

---

## 📋 Option B: Manuelle Installation

### Schritt 1: Benötigte Programme installieren

Bevor Sie starten können, müssen drei Programme auf Ihrem Computer installiert sein:

### 1.1 Node.js installieren

**Was ist Node.js?** Ein Programm, das die Anwendung ausführt.

1. Öffnen Sie Ihren Webbrowser
2. Gehen Sie zu: **https://nodejs.org/de**
3. Klicken Sie auf den grünen Button **"LTS herunterladen"** (empfohlene Version)
4. Warten Sie, bis der Download abgeschlossen ist
5. Öffnen Sie die heruntergeladene Datei (z.B. `node-v18.x.x-x64.msi`)
6. Klicken Sie mehrmals auf **"Weiter"** / **"Next"**
7. Akzeptieren Sie die Lizenzvereinbarung
8. Klicken Sie auf **"Installieren"** / **"Install"**
9. Warten Sie, bis die Installation fertig ist
10. Klicken Sie auf **"Fertigstellen"** / **"Finish"**

**Überprüfung:**
1. Drücken Sie `Windows-Taste + R`
2. Geben Sie `cmd` ein und drücken Sie Enter
3. Geben Sie ein: `node --version`
4. Sie sollten eine Versionsnummer sehen (z.B. `v18.19.0`) ✅

### 1.2 MongoDB installieren

**Was ist MongoDB?** Eine Datenbank, die alle Quiz-Fragen und Ergebnisse speichert.

1. Öffnen Sie: **https://www.mongodb.com/try/download/community**
2. Wählen Sie:
   - **Version:** 7.0.x (oder neueste Version)
   - **Platform:** Windows
   - **Package:** msi
3. Klicken Sie auf **"Download"**
4. Öffnen Sie die heruntergeladene Datei (z.B. `mongodb-windows-x86_64-7.0.x.msi`)
5. Klicken Sie auf **"Next"** (Weiter)
6. Akzeptieren Sie die Lizenz mit **"I accept"**
7. Wählen Sie **"Complete"** (Vollständig)
8. Bei "Service Configuration":
   - ✅ Häkchen bei **"Install MongoDB as a Service"** (als Dienst installieren)
   - ✅ Häkchen bei **"Run service as Network Service user"**
9. Klicken Sie auf **"Next"** und dann **"Install"**
10. Warten Sie (kann einige Minuten dauern)
11. Klicken Sie auf **"Finish"**

**Überprüfung:**
1. Drücken Sie `Windows-Taste + R`
2. Geben Sie `services.msc` ein und drücken Sie Enter
3. Suchen Sie in der Liste nach **"MongoDB Server"**
4. Der Status sollte **"Wird ausgeführt"** / **"Running"** sein ✅

### 1.3 Git installieren (optional, aber empfohlen)

**Was ist Git?** Ein Programm zum Herunterladen von Code-Projekten.

1. Öffnen Sie: **https://git-scm.com/download/win**
2. Der Download startet automatisch
3. Öffnen Sie die heruntergeladene Datei
4. Klicken Sie mehrmals auf **"Next"** (Sie können alle Standard-Einstellungen beibehalten)
5. Klicken Sie auf **"Install"**
6. Klicken Sie auf **"Finish"**

---

## 📥 Schritt 2: Quiz-Anwendung herunterladen

### Option A: Mit Git (empfohlen)

1. Erstellen Sie einen Ordner auf Ihrem Desktop mit dem Namen `ICT-Quiz`
2. Öffnen Sie den Ordner
3. Klicken Sie mit der **rechten Maustaste** in den leeren Ordner
4. Wählen Sie **"Git Bash Here"** oder **"Git CMD Here"**
5. Geben Sie folgenden Befehl ein:
   ```
   git clone https://github.com/yourusername/emirastic-ict-quiz.git
   ```
6. Drücken Sie **Enter**
7. Warten Sie, bis der Download abgeschlossen ist

### Option B: Als ZIP herunterladen (einfacher)

1. Gehen Sie zur GitHub-Seite des Projekts
2. Klicken Sie auf den grünen Button **"Code"**
3. Klicken Sie auf **"Download ZIP"**
4. Speichern Sie die Datei auf Ihrem Desktop
5. Klicken Sie mit der **rechten Maustaste** auf die ZIP-Datei
6. Wählen Sie **"Alle extrahieren..."** / **"Extract All..."**
7. Klicken Sie auf **"Extrahieren"** / **"Extract"**

**Sie haben jetzt einen Ordner mit allen Dateien der Anwendung!**

---

## ⚙️ Schritt 3: Anwendung vorbereiten

### 3.1 PowerShell öffnen

1. Öffnen Sie den Ordner mit der Quiz-Anwendung
2. Klicken Sie in die **Adressleiste** oben (dort wo der Pfad steht)
3. Geben Sie `powershell` ein
4. Drücken Sie **Enter**
5. Ein blaues Fenster öffnet sich - das ist die PowerShell ✅

### 3.2 Backend vorbereiten

**Im PowerShell-Fenster:**

1. Geben Sie ein:
   ```
   cd backend
   ```
   Drücken Sie **Enter**

2. Geben Sie ein:
   ```
   npm install
   ```
   Drücken Sie **Enter**
   
   ⏳ **Dies dauert 2-5 Minuten** - warten Sie, bis es fertig ist!
   
   Sie sehen viel Text durchlaufen - das ist normal ✅

3. Geben Sie ein:
   ```
   copy .env.example .env
   ```
   Drücken Sie **Enter**

### 3.3 Frontend vorbereiten

**Im gleichen PowerShell-Fenster:**

1. Geben Sie ein:
   ```
   cd ../frontend
   ```
   Drücken Sie **Enter**

2. Geben Sie ein:
   ```
   npm install
   ```
   Drücken Sie **Enter**
   
   ⏳ **Dies dauert wieder 2-5 Minuten** - Geduld!

3. Geben Sie ein:
   ```
   copy .env.example .env
   ```
   Drücken Sie **Enter**

### 3.4 Datenbank mit Fragen füllen

**Im gleichen PowerShell-Fenster:**

1. Geben Sie ein:
   ```
   cd ../backend
   ```
   Drücken Sie **Enter**

2. Geben Sie ein:
   ```
   npm run seed
   ```
   Drücken Sie **Enter**

**Sie sollten grüne Häkchen sehen:** ✅ ✅ ✅

Das bedeutet, die Datenbank wurde erfolgreich eingerichtet!

---

## 🚀 Schritt 4: Anwendung starten

### Einfache Methode (empfohlen)

1. Öffnen Sie den Hauptordner der Quiz-Anwendung
2. **Doppelklicken** Sie auf die Datei:
   ```
   start-all.bat
   ```
   oder
   ```
   start-all.ps1
   ```

3. Es öffnen sich drei Fenster:
   - Ein Fenster für MongoDB (schwarzer Hintergrund)
   - Ein Fenster für das Backend (Text läuft durch)
   - Ein Fenster für das Frontend (Text läuft durch)

4. Nach etwa 30 Sekunden öffnet sich automatisch Ihr Browser

5. Sie sehen die Quiz-Startseite! 🎉

**⚠️ Wichtig:** Lassen Sie alle drei Fenster offen, solange Sie die Anwendung nutzen möchten!

### Alternative: Manuelle Methode

Falls die einfache Methode nicht funktioniert:

**Fenster 1 - Backend:**
1. Öffnen Sie PowerShell im Hauptordner (siehe Schritt 3.1)
2. Geben Sie ein: `cd backend`
3. Geben Sie ein: `npm start`
4. Warten Sie auf: "MongoDB connected" ✅

**Fenster 2 - Frontend:**
1. Öffnen Sie ein **neues** PowerShell-Fenster
2. Navigieren Sie zum Hauptordner
3. Geben Sie ein: `cd frontend`
4. Geben Sie ein: `npm start`
5. Ihr Browser öffnet sich automatisch!

---

## 🎓 Schritt 5: Erste Schritte in der Anwendung

### 5.1 Konto erstellen

1. In Ihrem Browser sollte die Startseite geöffnet sein
2. Klicken Sie oben rechts auf **"Register"** (Registrieren)
3. Füllen Sie das Formular aus:
   - **Vorname:** Ihr Vorname
   - **Nachname:** Ihr Nachname
   - **E-Mail:** Ihre E-Mail-Adresse
   - **Passwort:** Ein sicheres Passwort
   - **Passwort wiederholen:** Das gleiche Passwort nochmal
4. Klicken Sie auf **"Register"**
5. Sie werden automatisch eingeloggt ✅

### 5.2 Ein Quiz starten

1. Auf der Startseite sehen Sie verschiedene Module
2. Klicken Sie auf **"Module 437"** (oder ein anderes Modul)
3. Wählen Sie ein Quiz aus der Liste
4. Klicken Sie auf **"Start Quiz"**
5. Beantworten Sie die Fragen
6. Klicken Sie auf **"Submit Quiz"** wenn Sie fertig sind
7. Sie sehen Ihr Ergebnis! 📊

### 5.3 Admin-Zugang (optional)

Falls Sie die Admin-Funktionen nutzen möchten:

- **E-Mail:** `admin@module437.test`
- **Passwort:** `admin123456`

**⚠️ Sicherheitshinweis:** Ändern Sie dieses Passwort nach dem ersten Login!

---

## ❓ Häufige Probleme und Lösungen

### Problem 1: "MongoDB verbindet nicht"

**Lösung:**
1. Drücken Sie `Windows-Taste + R`
2. Geben Sie `services.msc` ein
3. Suchen Sie "MongoDB Server"
4. Rechtsklick → **"Starten"**

### Problem 2: "Port 3000 ist bereits in Verwendung"

**Lösung:**
1. Öffnen Sie PowerShell als Administrator
2. Geben Sie ein:
   ```
   netstat -ano | findstr :3000
   ```
3. Merken Sie sich die Nummer ganz rechts (PID)
4. Geben Sie ein:
   ```
   taskkill /PID [DIE_NUMMER] /F
   ```
   (Ersetzen Sie [DIE_NUMMER] mit der gemerkten Zahl)

### Problem 3: "npm install" funktioniert nicht

**Lösung:**
1. Stellen Sie sicher, dass Node.js installiert ist
2. Öffnen Sie PowerShell als **Administrator**
3. Geben Sie ein:
   ```
   npm cache clean --force
   ```
4. Versuchen Sie `npm install` erneut

### Problem 4: Browser öffnet nicht automatisch

**Lösung:**
1. Öffnen Sie Ihren Browser manuell
2. Geben Sie in die Adressleiste ein:
   ```
   http://localhost:3000
   ```
3. Drücken Sie Enter

### Problem 5: Keine Quiz-Fragen sichtbar

**Lösung:**
1. Öffnen Sie PowerShell im Hauptordner
2. Geben Sie ein:
   ```
   cd backend
   npm run seed
   ```
3. Warten Sie auf die grünen Häkchen ✅
4. Laden Sie die Browser-Seite neu (F5)

---

## 🔄 Anwendung später erneut starten

Wenn Sie Ihren Computer neu gestartet haben oder die Anwendung geschlossen haben:

1. Gehen Sie zum Hauptordner der Quiz-Anwendung
2. Doppelklicken Sie auf **"start-all.bat"**
3. Warten Sie 30 Sekunden
4. Der Browser öffnet sich automatisch
5. Fertig! ✅

---

## 🛑 Anwendung beenden

So beenden Sie die Anwendung richtig:

1. Schließen Sie Ihren Browser
2. Schließen Sie alle PowerShell-Fenster (klicken Sie auf das X)
3. Fertig! Die Anwendung ist beendet.

---

## 📱 Von anderen Geräten zugreifen (optional)

Möchten Sie vom Handy oder einem anderen Computer auf die Quiz-Anwendung zugreifen?

### Schritt 1: Firewall konfigurieren

1. Öffnen Sie PowerShell **als Administrator** im Hauptordner
2. Geben Sie ein:
   ```
   .\configure-firewall.ps1
   ```
3. Drücken Sie Enter
4. Bestätigen Sie mit "Ja" falls gefragt

### Schritt 2: IP-Adresse herausfinden

1. Öffnen Sie PowerShell
2. Geben Sie ein:
   ```
   ipconfig
   ```
3. Suchen Sie nach "IPv4-Adresse"
4. Merken Sie sich die Nummer (z.B. `192.168.1.100`)

### Schritt 3: Von anderen Geräten zugreifen

1. Stellen Sie sicher, dass Ihr Gerät im **gleichen WLAN** ist
2. Öffnen Sie den Browser auf dem anderen Gerät
3. Geben Sie ein:
   ```
   http://[IHRE_IP_ADRESSE]:3000
   ```
   Zum Beispiel: `http://192.168.1.100:3000`
4. Drücken Sie Enter
5. Sie sehen die Quiz-Anwendung! 📱

---

## 📞 Hilfe benötigt?

Falls Sie nicht weiterkommen:

1. **Schauen Sie in die ausführliche Dokumentation:**
   - [Vollständige Anleitung](docs/SETUP.md)
   - [Fehlerbehebung](docs/DOCUMENTATION.md)

2. **Kontaktieren Sie den Support:**
   - E-Mail: support@emirastic.com

3. **Häufige Fragen:**
   - Stellen Sie sicher, dass alle drei Programme installiert sind (Node.js, MongoDB, Git)
   - Überprüfen Sie, ob MongoDB läuft
   - Schließen Sie alle Fenster und starten Sie neu

---

## ✅ Checkliste

Haken Sie ab, wenn Sie fertig sind:

- [ ] Node.js installiert und getestet
- [ ] MongoDB installiert und läuft
- [ ] Git installiert (optional)
- [ ] Quiz-Anwendung heruntergeladen
- [ ] Backend vorbereitet (`npm install` ausgeführt)
- [ ] Frontend vorbereitet (`npm install` ausgeführt)
- [ ] Datenbank gefüllt (`npm run seed` ausgeführt)
- [ ] Anwendung gestartet (start-all.bat)
- [ ] Browser öffnet Quiz-Seite
- [ ] Konto erstellt und eingeloggt
- [ ] Erstes Quiz absolviert

**🎉 Herzlichen Glückwunsch! Sie haben die Anwendung erfolgreich eingerichtet!**

---

## 🔒 Wichtige Sicherheitshinweise

- **Ändern Sie das Admin-Passwort** nach dem ersten Login
- **Teilen Sie keine Passwörter** über unsichere Kanäle
- **Machen Sie regelmäßig Backups** Ihrer Quiz-Ergebnisse
- **Verwenden Sie starke Passwörter** bei der Registrierung

---

**Version:** 1.0.0  
**Datum:** Januar 2026  
**Sprache:** Deutsch

Bei Fragen oder Problemen: support@emirastic.com
