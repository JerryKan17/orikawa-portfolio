# orikawa laurentin — Master Specifications & Implementation Status

> **Status:** All updates implemented and validated  
> **Brand Casing Rule:** Strictly **lowercase only** for brand and artist names: `orikawa laurentin`, `orion laurentin`, `laurentin rivière`.  
> **Tagline Casing Rule:** Strictly **`Clarity in Motion.`** (Capital C and Capital M — verified: CSS `lowercase` removed from `h1`).  
> **Language Rule:** Entire public website in **English only**.

---

## 1. Summary of Latest Directives & Status

| Directive | Specification | Status |
| :--- | :--- | :---: |
| **1. Clarity in Motion & Water Shader** | Fix capital C and M (removed CSS `lowercase` transform) + Interactive lake water ripple displacement shader on click & drag | **Done ✅** |
| **2. Taller Orikavague & Varied Typography** | Taller separator band (`min-h-[180px] sm:min-h-[240px] md:min-h-[300px]`), full-height deformed words (hyper-italic, ultra-wide, condensed), vibrant palette (`#29E3BE`, `#323A72`, `#E019D7`, `#FFF951`, `#131522`) | **Done ✅** |
| **3. Remove Video Preview Box** | Deleted the "Video Preview: Hover cards..." box from the Works section header | **Done ✅** |
| **4. Fix Tab-to-Paper Gap** | Tabs now sit directly on top of the notebook sheet with `-mb-[2px]` and matching background bottom border (0px gap guaranteed) | **Done ✅** |
| **5. Backstage Notes on Hover / Touch** | Backstage notes completely hidden by default; revealed strictly on hover (desktop) or touch/tap (mobile) with pencil animation | **Done ✅** |
| **6. Section Title Casing** | Renamed masking tape from "orikawa foundation" to **`orikawa's foundation`** | **Done ✅** |
| **7. Clean About Us Content** | Removed the "entity structure" box and the bottom "orion laurentin founder" signature | **Done ✅** |

---

## 2. Numbered Section Hierarchy

* **`00 // hero`** — Centered `"Clarity in Motion."` with interactive water ripple simulation, fancy `"who are we?"` button with simplified cinema lightbox video modal, and seamless transition into the wave separator.
* **`01 // works`** — Studio notebook showcase with zero-gap binder tabs on top, client tape labels, and simulated video playback HUD.
* **`02 // process`** — The T0V Formula (Translation, 0-Friction, Value) and 4-step workflow roadmap with on-hover / on-touch pencil backstage notes.
* **`03 // about us`** — Tape label **`orikawa's foundation`**, story of the studio, and direct CTA button to `https://laurentinriviere.com`.
* **`04 // contact`** — Full browser resolution width, responsive 12-column layout, direct contact details, and sitemap modal.
* **`#legal`** — Dedicated full legal notices view with return link.

---

## 3. Design System & Interaction Details

### 3.1 Water Ripple Shader Simulation (Hero)
* **Mechanics:** Clicking and dragging anywhere in the hero section spawns concentric water ripple waves on the canvas.
* **Visual Effects:** 3-tier wave ring refraction (Mint `#29E3BE` refraction, pure white specular light ring, and soft blue shadow trough).
* **Text Displacement:** When clicking/dragging, an SVG `<feDisplacementMap>` fluid filter actively refracts and ripples the `"Clarity in Motion."` title like sunlight refracting through water on a lake.

### 3.2 Snug & Linked Orikavague Separator (Lignes épaisses & liées, sans texte en arrière-plan)
* **Geometry & Stroke Thickness:** 3 thick parallel strokes of **8.5px** width (Mint `#29E3BE`, Soft Blue `#323A72`, Midnight `#131522`), vertically spaced by only 9px, rendering them strictly **linked/touching** like a cohesive tri-color ribbon exactly matching `orikavague.png`.
* **Clean & Minimal:** The background text ribbon has been removed completely, keeping only the pure white technical blueprint grid (`.bg-white-tech-grid`).
* **100% Seamless Overlap:** Waves extend from $x = -25$ to $x = 1225$ with `overflow-visible` across 4 fixed 1200px segments with 0px horizontal gap and zero jump on loop reset.

### 3.3 Zero-Gap Binder Tabs (Works)
* In-flow tab navigation bar with `-mb-[2px]` sitting flush against the notebook binder body.
* Active tab has `border-b-2 border-[#fcfaf2]` matching the notebook paper color for a 100% seamless connection.

### 3.4 Interactive Production Backstage Notes (Process)
* Notes stay completely hidden when not active.
* Hovering (desktop) or tapping (mobile) expands the note container with `animate-pencil-reveal`.
* Re-tapping on mobile or moving mouse away collapses the note cleanly.

---

## 4. Verification & Build
* `npm run build`: **Passing with 0 errors** (Vite v8 + React 19 + TypeScript).
* Local dev server: Active on `http://127.0.0.1:5173/`.
