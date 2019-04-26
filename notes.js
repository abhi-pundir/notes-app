
// module.exports= getNotes

const fs= require('fs')
const chalk= require('chalk')

listNotes= () => {
    console.log(chalk.yellow.bold.inverse('Your notes...'))
    notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

addNotes= (title, body) => {
    const notes= loadNotes()
    //const duplicateNotes= notes.filter((note)=> note.title=== title) // filter checks all the notes
    const duplicateNotes= notes.find((note) => note.title===title)     //find will stop as soon as it finds the first note
    if (!duplicateNotes){ //duplicateNotes.length===0  //duplicateNotes===undefined
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added'))
    }
    else{
        console.log(chalk.red('Note title taken'))
    }
}

removeNote= (title) => {
    notes= loadNotes()
    const deleteCount=0
    remainingNotes= notes.filter((note) => note.title !== title);
    if (notes.length>=remainingNotes.length){
        console.log(chalk.red.inverse('No note removed'))
    }
    else{
        console.log(chalk.green.inverse('Note removed'))
        saveNotes(remainingNotes)
    }
    
}

readNote= (title) => {
    notes= loadNotes()
    const searchNote= notes.find((note) => {
        return note.title==title
    })

    if(searchNote){
        console.log(chalk.bold(searchNote.title))
        console.log(searchNote.body)
    }
    else{
        console.log(chalk.red('No note found'))
    }
}


/* Internal functions for notes.js */
saveNotes= (notes) => {
    const notesJSON= JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesJSON)
}


loadNotes= () => {
    try{
    const dataBuffer= fs.readFileSync('notes.json')
    const dataJSON= dataBuffer.toString()
    const dataString= JSON.parse(dataJSON)    
    return dataString
    }
    catch(e){
        return []
    }
}



module.exports={
    listNotes: listNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    readNote: readNote
}