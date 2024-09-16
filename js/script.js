// I've used chatGPT for this file

window.onload = function() {
    if (document.getElementById('noteSection')) {
        // Writer page specific code
        document.getElementById('writerTitle').textContent = messages.titles.writer; // Set title
        document.getElementById('addNoteBtn').textContent = messages.labels.addNote; // Set Add Note button label
        document.getElementById('backToHome').textContent = messages.links.backToHome; // Set Back to Home label
        loadNotes();
        setInterval(saveNotes, 2000); // Save notes every 2 seconds
    } else if (document.getElementById('noteDisplay')) {
        // Reader page specific code
        document.getElementById('readerTitle').textContent = messages.titles.reader; // Set title
        document.getElementById('backToHome').textContent = messages.links.backToHome; // Set Back to Home label
        updateDisplay();
        setInterval(updateDisplay, 2000); // Update display every 2 seconds
    }
};

// Functions for writer.html
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteElement(note);
    });
}

function addNote() {
    addNoteElement('');
}

function addNoteElement(text) {
    const noteSection = document.getElementById('noteSection');
    const container = document.createElement('div');
    const textarea = document.createElement('textarea');
    const removeButton = document.createElement('button');
    
    textarea.value = text;
    removeButton.textContent = messages.labels.removeNote; // Set Remove button label
    removeButton.onclick = function() {
        noteSection.removeChild(container);
        saveNotes(); // Update localStorage after removing a note
    };

    container.appendChild(textarea);
    container.appendChild(removeButton);
    noteSection.appendChild(container);
}

function saveNotes() {
    const textareas = document.querySelectorAll('#noteSection textarea');
    const notes = Array.from(textareas).map(ta => ta.value);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    document.getElementById('lastSavedTime').textContent = new Date().toLocaleTimeString(); // Display time when notes are saved
}

// Functions for reader.html
function updateDisplay() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const display = document.getElementById('noteDisplay');
    display.innerHTML = ''; // Clear previous contents

    notes.forEach(note => {
        const para = document.createElement('p');
        para.textContent = note;
        display.appendChild(para);
    });

    document.getElementById('lastUpdatedTime').textContent = new Date().toLocaleTimeString(); // Display time when notes are updated
}
