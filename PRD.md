

## 📝 **Product Requirements Document (PRD)**

**Project Name:** Demon Evolution – Portfolio of Lineekela Shinavene
**Type:** 3D Japanese Demon Slayer-Inspired Immersive Portfolio Website
**Prepared by:** Lineekela Shinavene
**Version:** 1.0
**Date:** July 2025

---

### 🧭 **1. Overview**

**Goal:**
To create a visually stunning, highly interactive portfolio website inspired by the world and aesthetics of Demon Slayer. The site will guide visitors through a scroll-based 3D journey across Japanese landscapes, breathing techniques, and demon-slaying missions, using traditional motifs, 3D models, and anime-inspired effects to showcase the skills, projects, and creativity of Lineekela Shinavene.

**Target Users:**

* Employers and recruiters in tech
* Freelance clients
* Tech and design peers
* Hackathon/judging panels

**Success Metrics:**

* Visually impressive, fast-loading experience
* Visitors navigate through at least 80% of scroll journey
* Increase in client/employer engagement via contact section
* Portfolio projects clearly communicated and interacted with

---


### 🧩 **2. Key Features & Functionality**

#### �️ **Immersive Demon Slayer Scroll Journey**

| Stage                           | Description                                 | Key Features                                                      |
| ------------------------------- | ------------------------------------------- | ----------------------------------------------------------------- |
| Awakening (Landing)             | Misty Japanese forest, sword unsheathing     | Katana animation, breathing effect, intro text                    |
| Training Grounds                | Skills showcase in a 3D dojo                | Floating skill scrolls, sparring dummies, interactive haori       |
| Demon Encounters                | Project showcase as "missions"              | 3D demon masks, animated cards, elemental effects                 |
| Hashira Network                 | Backend tools as Hashira pillars             | 3D network, pillar icons, animated data flow                      |
| The Estate                      | About Me, Skills in a Japanese room          | 3D workspace, sliding panels, interactive drawers                 |
| Artisan’s Workshop              | Design work in a traditional gallery         | Scrollable art frames, origami, Japanese art motifs               |
| Final Selection                 | Contact + CTA at a shrine                    | Sakura/wisteria animation, katana send button, roadmap display    |


#### 🧠 **Interactivity**

* Scroll-triggered breathing techniques, sword slashes, elemental effects (GSAP / Framer Motion)
* 3D katana, demon masks, Japanese environments (Three.js / React Three Fiber)
* Hover/click events: unsheath sword, reveal skills, flip mission cards
* Resume and achievements as interactive scrolls or hidden drawers


#### ⚙️ **Tech Stack**

* **Frontend:** Next.js, React, TailwindCSS
* **3D & Animations:** Three.js, React Three Fiber, GSAP, Framer Motion
* **Assets & Media:** .glb katana/mask models, SVG patterns, Lottie, Cloudinary
* **Backgrounds:** Animated sakura petals, wisteria, Japanese textures
* **Backend (optional):** Form handling via Netlify Forms / EmailJS
* **DevOps/Hosting:** GitHub Pages, Netlify or Vercel

---


### 🎨 **3. Design & UI**

**Theme:** Japanese Demon Slayer / Taisho Era / Anime-inspired
**Color Scheme:**

* Primary: Deep green, flame red, indigo, sakura pink, gold, black
* Secondary: Washi paper, wood, muted metallics, wisteria purple

**Typography:**

* Headings: Japanese brushstroke or anime-style fonts (e.g., Kaushan Script)
* Body: Clean sans-serif or readable Japanese-inspired font

**UI Style:**

* Washi paper panels, sliding doors, lanterns, origami, ink borders
* 3D katana, demon masks, breathing/elemental effects
* Animated sakura/wisteria backgrounds, smooth scroll transitions

---


### 📦 **4. Content Structure**

| Section    | Content                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| Header     | Animated katana logo, scroll indicators (wisteria/sakura petals)        |
| About Me   | Biography, skills, breathing techniques, soft skills (as scrolls)       |
| Projects   | Missions: Van Rhyn Platform, Arc Planners, Hackathon (demon cards)      |
| Experience | Training: Tayari internship, Freelancing, IT support (dojo/mission log) |
| Contact    | Shrine form, LinkedIn, GitHub, CV download (as scroll or talisman)      |
| Footer     | Powered by... / Copyright, Japanese motif                               |

---


### 🧪 **5. Technical Requirements**

| Requirement   | Detail                                                  |
| ------------- | ------------------------------------------------------- |
| Performance   | Load time < 3s, optimized 3D models, compressed assets  |
| Compatibility | Mobile + Desktop (responsive 3D, touch-friendly)        |
| SEO           | Meta tags, social sharing previews                      |
| Accessibility | Keyboard nav, contrast compliance, alt text on visuals  |
| Analytics     | Optional: basic visit tracking via Netlify or Plausible |

---

---


### 🧰 **6. Optional Enhancements**

* Animated breathing technique selector (water, flame, mist, etc.)
* Interactive katana forging mini-game
* Demon mask avatar generator
* Shrine wish wall (visitor messages)
* Command-line style intro quiz/game (as a "Final Selection" test)

---

Would you like me to generate a **starter file structure** for this in Next.js, or even a **Figma prompt** to give to a designer for layout?
