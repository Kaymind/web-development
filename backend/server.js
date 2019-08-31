const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(express.static((__dirname + "/uploaded")))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use("/api/v2", require("./api.js"))
// app.get('/', (req, res) => {
//     res.end("5555")
// })

// app.get('/login', (req, res) => {
//     // res.end("666")
//     // res.json({user: req.query.username, password:req.query.password})
//     const {username, password} = req.query
//     res.json({username, password})

// })

// app.get('/register/username/:u/password/:p', (req, res) => {
//     const {u, p} = req.params
//     res.json({u, p})
// })

// app.get('/register2/:username-:password', (req, res) => {
//     const {username, password} = req.params
//     // res.json({username, password})
//     res.json(req.params)
// })

app.listen(8081, () => {
    console.log('server is listening at port 8081')
});