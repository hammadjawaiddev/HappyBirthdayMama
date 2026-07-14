# Happy Birthday Mama — Website

A premium, single-page birthday tribute. Pure HTML/CSS/JS (no frameworks), built with GSAP, AOS, Typed.js, Canvas Confetti, Swiper.js and LightGallery (all loaded via CDN in `index.html`).

## Files
- `index.html` — page structure & content
- `style.css` — all styling (variables at the top of the file control the whole palette)
- `script.js` — all interactivity & animation
- `assets/` — put your photos, song, and video here

## What to personalize

### 1. The Letter (section `#letter`)
Open `index.html`, find `<div class="letter-paper" id="letter-paper">` and replace the paragraph text with your own words.

### 2. Memory Timeline (section `#timeline`)
Each memory is one `.timeline-item` block. Copy/paste the block to add more, and edit the year, heading, and description.

### 3. Photo Gallery (section `#gallery`)
Currently uses Unsplash placeholder photos. Replace each `href` and `src` inside `#lg-gallery` with your own image paths, e.g.:
```html
<a href="assets/photo1.jpg" class="gallery-item">
  <img src="assets/photo1-thumb.jpg" alt="Description">
  ...
</a>
```
Recommended: keep a full-size version for the lightbox (`href`) and a smaller compressed version for the grid (`src`) for fast loading.

### 4. Music Player (section `#music`)
1. Drop your song file into `assets/` (e.g. `assets/song.mp3`).
2. In `index.html` find `<audio id="audio" src="assets/song.mp3" ...>` and update the path.
3. Update the "Mama's Song" title and artist text nearby.
4. Optional: replace the `.player-art` styling in `style.css` with a `background-image` of a real album/photo.

### 5. Video Section (section `#video`)
1. Drop your video into `assets/` (e.g. `assets/family-video.mp4`).
2. Update the `<source src="assets/family-video.mp4">` path in `index.html`.
3. Update the `poster` image (the preview thumbnail before playback).
4. If hosting on YouTube/Vimeo instead, swap the `<video>` block for an `<iframe>` embed.

### 6. Wishes (section `#wishes`)
Each wish is one `.swiper-slide > .wish-card`. Edit the text and the `.wish-author` name, or duplicate the block to add more family members.

### 7. Colors & Fonts
All colors live as CSS variables at the top of `style.css` under `:root`. Change `--gold`, `--pink`, `--black`, etc. to retheme the whole site instantly.

## Running locally
Just open `index.html` in a browser — no build step needed. For best results (so the audio/video paths and lightbox load correctly), serve the folder with a simple local server rather than opening the file directly, e.g.:
```
npx serve .
```
or Python:
```
python3 -m http.server
```
then visit `http://localhost:8000`.
