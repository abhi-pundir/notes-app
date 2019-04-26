// const fs= require('fs')
// //fs.writeFileSync('notes.txt','Hello this is Abhishek')
// fs.appendFileSync('notes.txt','\nThis is a notes app')
//const validator= require('validator')
//console.log(validator.isEmail('abhi.pundir07@gmailcom'))
// const chalk= require('chalk')
// const getNotes= require('./notes.js')
// console.log(chalk.bold.green.inverse('Success!'))
// msg= getNotes()
// console.log(msg)
yargs= require('yargs')
const notes= require('./notes.js')

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
                describe: 'Note body',
                demandOption: true,
                type: 'string'
        }
    },
    handler(argv){
        addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List out all notes',
    handler(){
        listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: { 
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        readNote(argv.title)
    }
})

yargs.parse()