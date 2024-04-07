import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://remember-note-2237b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp( appSettings )
const database = getDatabase( app )
const notes = ref( database, "notes" )

const inputEl = document.getElementById( "input-el" )
const addBtn = document.getElementById( "add-btn" )
const notelistEl = document.getElementById( "notelist" )

addBtn.addEventListener("click", function() {
    let note = inputEl.value

    push(notes, note)

    clearInputField()
})

onValue(notes, function(snapshot) {
    if(snapshot.exists()){
        let noteArray = Object.entries(snapshot.val())

        clearNoteList()

        for(let i = 0; i < noteArray.length; i++){
            let currentNote = noteArray[i]
            let currentNoteID = currentNote[0]
            let currentNoteValue = currentNote[1]

            appendNotesToNoteList(currentNote)
        }

    }else{
        notelistEl.innerHTML = "No notes yet..."
    }
})

function clearInputField() {
    inputEl.value = ""
}

function clearNoteList() {
    notelistEl.innerHTML = ""
}

function appendNotesToNoteList(note) {
    let noteID = note[0]
    let  noteValue = note[1]

    let newEl = document.createElement('li')

    newEl.textContent = noteValue

    newEl.addEventListener("click", function() {
        let locationOfNote = ref(database, `notes/${noteID}`)

        remove(locationOfNote)
    })

    notelistEl.append(newEl)
}