# Compact Text Editor – v1.0

Version 1.0 is the first stable implementation of the Compact Text Editor.  
It provides a fully functional rich-text editor using only native browser capabilities.

This version is distributed in two formats: a **single-file build** and a **modular build**.

---

## Available Builds

### 1. Single-file Version(`single-file/`)

**Text_Editor.html**


- Contains HTML, CSS, and JavaScript in one file
- Fully portable
- Works offline
- Ideal for quick use, sharing, or archival

---

### 2. Modular Version(`modular/`)

**index.html + style.css + script.js**

- Same functionality as the single-file version
- Code separated for better readability and maintenance
- Intended for development, learning, or future extension

---

## Core Functionality


- Editable rich-text area using `contenteditable`
- Text formatting:
  - Bold, Italic, Underline
  - Strikethrough, Mark (highlight)
  - Superscript and Subscript
  - Inline code formatting
- Font controls:
  - Font family selection
  - Font size adjustment
  - Text color picker
- Text alignment:
  - Left, Right, Center, Justify
- Live word and character counter
- Clear formatting or clear entire content
- Export editor content as a clean standalone HTML file

---

## Browser Compatibility

Tested on modern Chromium-based and Firefox browsers.  
Requires JavaScript to be enabled.

---

## Design Notes

- No external libraries or frameworks
- No backend or server dependency
- Emphasis on direct DOM manipulation
- Intentionally minimal UI for clarity and focus

---

## Limitations

- Not intended for collaborative editing
- Formatting is HTML-based, not document-model-based
- No undo/redo stack beyond browser defaults

---

## Version Status

✔ Stable  
✔ Feature-complete for initial release  
✔ Suitable for educational and personal use


Note: This can be for learners. This can be incomplete. This can be yours too. There may be bugs and logic gaps, feel free to report.