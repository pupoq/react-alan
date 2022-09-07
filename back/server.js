const express = require('express')
const formidable = require('express-formidable')
const fs = require('fs')

const app = express()

app.use(express.json())
app.use(formidable())

const data = fs.readFileSync('usersDB.json', 'utf-8')

const database = JSON.parse(data)



// console.log(data)

const obj = {
    message: 'Success'
}

app.post('/login', (request, response) => {
    for (let item of database.users) {
        if (request.fields.username == item.username) {
            console.log(request.fields)
            response.json(obj)
        } else {
            console.log('лох вонючий')
        }
    }
})

let error = {
    message: 'Лох вонючий'
}

app.post('/register', (request, response) => {
    for (let item of database.users) {
        console.log(item.username);
        if (request.fields.username !== item.username) {
            console.log(request.fields)
            database.users.push(request.fields)
            fs.writeFileSync('usersDB.json', JSON.stringify(database, null, 2))
            break
        } 
    }
})

app.listen(8080, () => {
    console.log('Сервер запущен!')
})