


const editor = document.querySelector('.textArea');

const wordOutput = document.getElementById('wordCounter');

const charOutput = document.getElementById('charCounter');

editor.addEventListener('input', () => {
  const text = editor.innerText.trim();
  wordOutput.value = text === "" ? 0 : text.split(/\s+/).length;
  charOutput.value = text.length;
});


function downloadAsHTML() { //this function is made by chatGPT
  const content = document.querySelector(".textArea").innerHTML;
  const fullHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Downloaded Content</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
      </style>
    </head>
    <body>${content}</body>
    </html>
  `;

  const blob = new Blob([fullHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "new.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



function clearEverything() {
  if (confirm("Clear all text? This cannot be undone.")) {
    const editor = document.querySelector(".textArea");

    // Clear all text and reset styles
    editor.innerHTML = "";
    editor.style.fontFamily = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`;
    editor.style.color = "black";
    editor.style.fontSize = "large";
    editor.style.textAlign = "left";

    // Clear word/char counters
    document.getElementById('wordCounter').value = '';
    document.getElementById('charCounter').value = '';

    // Reset UI controls
    document.getElementById("fontSizeSelector").value = 16;
    document.getElementById("colorPicker").value = "#000000";
    document.getElementById("fontFamily").value = "inherit";
  }
}

document.getElementById("colorPicker").addEventListener("input", function () {
  const clr = this.value;
  const ed = document.querySelector(".textArea");
  const sel = window.getSelection();
  ed.focus();

  if (sel.rangeCount > 0 && !sel.isCollapsed) {
    const rng = sel.getRangeAt(0);
    const frag = rng.extractContents();

    const sp = document.createElement("span");
    sp.style.color = clr;
    sp.appendChild(frag);

    rng.insertNode(sp);
    sel.removeAllRanges();
  } else {
     ed.querySelectorAll('[style]').forEach(el => {
    el.style.removeProperty("color");
    if (el.getAttribute("style")?.trim() === "") el.removeAttribute("style");
  });

  // Wrap entire content in a new span with selected color
  const span = document.createElement("span");
  span.style.color = clr;
  span.innerHTML = ed.innerHTML;
  ed.innerHTML = "";
  ed.appendChild(span);
  ed.focus();
  }
});

document.getElementById("fontSizeSelector").addEventListener("input", function () {
  const clr = this.value + "px";
  const ed = document.querySelector(".textArea");
  const sel = window.getSelection();
  ed.focus();

  if (sel.rangeCount > 0 && !sel.isCollapsed) {
    const rng = sel.getRangeAt(0);
    const frag = rng.extractContents();

    const sp = document.createElement("span");
    sp.style.fontSize = clr;
    sp.appendChild(frag);

    rng.insertNode(sp);
    sel.removeAllRanges();
  } else {
    ed.querySelectorAll('[style]').forEach(el => {
    el.style.removeProperty("font-size");
    if (el.getAttribute("style")?.trim() === "") el.removeAttribute("style");
  });

  const span = document.createElement("span");
  span.style.fontSize = clr;
  span.innerHTML = ed.innerHTML;
  ed.innerHTML = "";
  ed.appendChild(span);
  ed.focus();
  }
});

document.getElementById("fontFamily").addEventListener("change", function () {
  const fam = this.value;
  const ed = document.querySelector(".textArea");
  const sel = window.getSelection();
  ed.focus();

  if (sel.rangeCount > 0 && !sel.isCollapsed) {
    const rng = sel.getRangeAt(0);
    const frag = rng.extractContents();

    const sp = document.createElement("span");
    sp.style.fontFamily = fam;
    sp.appendChild(frag);

    rng.insertNode(sp);
    sel.removeAllRanges();
  } else {
    ed.querySelectorAll('[style]').forEach(el => {
    el.style.removeProperty("font-family");
    if (el.getAttribute("style")?.trim() === "") el.removeAttribute("style");
  });

  // Wrap entire content in a new span with selected font family
  const span = document.createElement("span");
  span.style.fontFamily = fam;
  span.innerHTML = ed.innerHTML;
  ed.innerHTML = "";
  ed.appendChild(span);
  ed.focus();
  }
});


function clearFormatting() {
  const editor = document.querySelector('.textArea');

  // Reset editor's own font family
  editor.style.fontFamily = `-apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`;

  // Remove formatting tags
  editor.innerHTML = editor.innerHTML
    .replace(/<(\/)?(b|i|u|s|code|mark|sup|sub|span)>/gi, '');

  // Remove inline styles from all child elements
  editor.style.color = "black" ;
  editor.style.fontSize = "large" ;
   editor.style.textAlign = "left" ;
  editor.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
  document.getElementById("fontSizeSelector").value = 16;
  document.getElementById("colorPicker").value = "#000000";
  document.getElementById("fontFamily").value = "inherit";



}

function lb() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  // Only insert if selection is inside the editor
  if (!editor.contains(range.commonAncestorContainer)) return;

  range.deleteContents();
  const br = document.createElement("br");
  range.insertNode(br);

  // Move cursor after the br
  range.setStartAfter(br);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function formatTextGeneric(tagName) {
  const editor = document.querySelector(".textArea");
  const selection = window.getSelection();
  editor.focus();

  if (selection.rangeCount > 0 && !selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();

    // Remove existing formatting if any
    const cleanedText = document.createElement("span");
    cleanedText.innerHTML = selectedText.textContent;

    const el = document.createElement(tagName);
    el.textContent = cleanedText.textContent;

    range.insertNode(el);
    selection.removeAllRanges();
  } else {
  const tag = document.createElement(tagName);
  tag.innerHTML = editor.innerHTML;
  editor.innerHTML = "";
  editor.appendChild(tag);
}

  }
function backSpaceFun() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const editorArea = document.querySelector('.editor-area');

  // Ensure the selection is inside the editor
  let node = range.startContainer;
  while (node && node !== editorArea) node = node.parentNode;
  if (node !== editorArea) return; // not in editor

  if (!range.collapsed) {
    // If some text is selected, delete it
    range.deleteContents();
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    // No selection, delete character before cursor
    const pos = range.startOffset;
    const container = range.startContainer;

    if (container.nodeType === Node.TEXT_NODE) {
      if (pos > 0) {
        // Delete character in text node
        container.deleteData(pos - 1, 1);
        range.setStart(container, pos - 1);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // Cursor at start of text node, try merge with previous node
        const prev = container.previousSibling;
        if (prev && prev.nodeType === Node.TEXT_NODE) {
          const len = prev.length;
          prev.deleteData(len - 1, 1);
          range.setStart(prev, len - 1);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    } else if (container.nodeType === Node.ELEMENT_NODE && pos > 0) {
      // If inside an element, remove previous child
      const prevNode = container.childNodes[pos - 1];
      if (prevNode) container.removeChild(prevNode);
    }
  }
}


function aFunction() {
  document.querySelector(".textArea").style.textAlign = "right"; // ➡️
}

function bFunction() {
  document.querySelector(".textArea").style.textAlign = "left"; // ⬅️
}

function cFunction() {
  document.querySelector(".textArea").style.textAlign = "center"; // ⬆️
}

function dFunction() {
  document.querySelector(".textArea").style.textAlign = "justify"; // ⬇️
}


