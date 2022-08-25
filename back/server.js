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
    message: 'hello from server'
}

app.post('/login', (request, response) => {
    console.log(request.fields)
    response.json(obj)
})

app.post('/register', (request, response) => {
    console.log(request.fields)
    database.users.push(request.fields)

    fs.writeFileSync('usersDB.json', JSON.stringify(database, null, 2))
})

app.listen(8080, () => {
    console.log('Сервер запущен!')
})