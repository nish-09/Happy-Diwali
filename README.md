# 🪔 Happy Diwali — Luxury Cinematic Greeting Experience

A visually spectacular, cinematic, and interactive Happy Diwali greeting website created for **Kiran Parikh & Family**. Designed to be shared effortlessly with friends, relatives, and loved ones through a single URL.

---

## ✨ Experience Highlights

### 1. Opening Screen — "A Little Light, A Lot of Happiness..."
- **Atmospheric Palette**: Deep Midnight Navy (`#080B1A`), Royal Imperial Purple (`#160B2D`), and Shimmering Liquid Gold (`#FFD700`).
- **Visual Elements**:
  - Twin golden brass diyas with realistic, multi-layered flickering teardrop flames and ambient halos.
  - Floating golden dust particles and softly falling marigold flower petals with natural 3D drift.
  - Sacred golden mandala rangoli rotating gracefully near the bottom.
  - Traditional Indian hanging brass lanterns (*kandils*) with delicate chains and glowing amber cores.
  - Distant fireworks illuminating the night sky.
- **Personalized Flow**:
  - Heading: *"A Little Light, A Lot of Happiness..."*
  - Subtitle: *"This Diwali, we have a special wish for you!"*
  - Luxury gold-bordered input field: *"Enter your name"*.
  - Call-to-action button: **"✨ Celebrate Diwali"**.
  - Smooth cinematic transition without page reload: a warm golden light wash illuminates the screen, celebration rockets ascend, and the personalized greeting is revealed.

### 2. Main Celebration Screen — The Grand Reveal
- **Main Greeting**:
  - Oversized, glowing golden typography:
    ```text
    🪔 Happy Diwali, [USER NAME]! 🪔
    ```
- **Festive Blessing**:
  > *"May your life shine brighter than a thousand diyas.*  
  > *May happiness, prosperity and love light up every moment."*
- **Prominent Family Signature**:
  > **With love and warm wishes,**  
  > **Kiran Parikh & Family**

### 3. Realistic Fireworks & Particle Physics (HTML5 Canvas)
- **High-Fidelity Pyrotechnics**:
  - Rendered with additive blending bloom (`lighter`) for realistic light emission.
  - Golden Willow / Kamuro cascades with trailing spark rain, spherical Chrysanthemum bursts, and ring bursts.
  - Multicolored rockets launching with glowing smoke trails.
  - **Click/Tap Anywhere**: Touching any spot on the screen ignites a realistic firework burst right at your fingertip!
  - **🎆 Celebrate Again**: Launches an exhilarating aerial finale across the night sky.

### 4. Ambient Festive Audio Engine (Web Audio API)
- Pure Web Audio synthesis — zero external MP3 downloads or 404 risks.
- Features:
  - Serene traditional Indian festive ambient music (Tanpura drone, soft flute harmonics, and temple chimes).
  - Realistic acoustic rocket launch whoosh and deep sub-bass explosion thuds with spark crackles.
  - Crystal singing bowl chime on interaction.
  - Grand celebratory fanfare chord upon greeting reveal.
  - Defaulted to **Muted** for privacy, with a luxury gold sound toggle button.

### 5. Seamless Sharing
- **✨ Share Wishes Button**:
  - Automatically triggers the native sharing sheet on mobile devices (WhatsApp, Messages, Instagram, Mail).
  - Falls back to copying the link to the clipboard on desktop browsers.
  - Generates personalized URLs with `?name=...` so every recipient is welcomed with their own name!

---

## 🚀 Running Locally

```bash
# Clone or navigate to the directory
cd "Happy Diwali"

# Install dependencies
npm install

# Run the development server
npm run dev

# Or run optimized production
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Personalized Link Sharing

Share customized greetings with individual friends or family members:
```text
https://your-domain.com/?name=Rohan
```
When opened, the greeting automatically pre-fills the recipient's name for a tailored celebration.

---

Created with love for **Kiran Parikh & Family**! 🪔✨
