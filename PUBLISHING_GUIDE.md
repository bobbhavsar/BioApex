# USABOguide • Independent Running & Cloud Publishing Guide

You can run **USABOguide** 100% independently from Google Antigravity, both locally on your computer and hosted live on the web for free.

---

## Option 1: Run Locally on Your Computer (Offline & Independent)

### Method A: One-Click Mac Launcher (Easiest)
1. Open Finder and go to:
   `/Users/tejasbhavsar/.gemini/antigravity/scratch/usabo-mastery-app`
2. Double-click the file named **`start.command`**.
3. It will automatically start the background server and open the app in your default web browser at `http://localhost:3456`.
4. *Tip*: You can drag `start.command` to your macOS Dock or Desktop as an app shortcut!

### Method B: Terminal Command
In any terminal window (Terminal, iTerm, etc.):
```bash
cd /Users/tejasbhavsar/.gemini/antigravity/scratch/usabo-mastery-app
./run.sh
```
Then visit `http://localhost:3456`.

---

## Option 2: Install as a Native Standalone Desktop / iPad / Mobile App (PWA)

USABOguide is built with a **Progressive Web App (PWA)** manifest and offline service worker:
1. Open `http://localhost:3456` in **Google Chrome** or **Brave** or **Safari** (macOS Sonoma+).
2. Look at the right side of the address bar:
   - In Chrome/Brave: Click the **Install** icon (a screen with a down arrow) or go to `Menu (⋮) → Save and Share → Install USABOguide`.
   - In Safari (macOS Sonoma+): Click `File → Add to Dock`.
   - On iPad/iPhone: Tap the Share button $\to$ `Add to Home Screen`.
3. USABOguide will now open in its own dedicated, borderless app window and work completely offline without needing any browser tabs or terminal commands.

---

## Option 3: Publish Live to the Web (Free Cloud Hosting)

### Path A: Publish to Vercel (Fastest — 30 seconds)
1. In your terminal, navigate to the folder:
   ```bash
   cd /Users/tejasbhavsar/.gemini/antigravity/scratch/usabo-mastery-app
   ```
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the 3 prompts (log in with GitHub or email).
4. Vercel will instantly give you a free public URL (e.g. `https://bioapex-olympiad.vercel.app`) that you can access from your phone, laptop, or share with study partners!

### Path B: Publish to GitHub Pages (100% Free Forever)
1. Create a new repository on [GitHub](https://github.com/new) named `bioapex-olympiad`.
2. In your terminal:
   ```bash
   cd /Users/tejasbhavsar/.gemini/antigravity/scratch/usabo-mastery-app
   git init
   git add .
   git commit -m "Initial commit of USABOguide Olympiad platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/bioapex-olympiad.git
   git push -u origin main
   ```
3. On GitHub, go to your repository's **Settings** $\to$ **Pages**.
4. Under **Branch**, select `main` and root `/`, then click **Save**.
5. Within 60 seconds, your site will be live at:
   `https://<your-username>.github.io/bioapex-olympiad/`
