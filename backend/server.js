const express = require('express')
app = express()

app.get('/', (req, res) => {
    res.end("5555")
})

app.get('/6', (req, res) => {
    res.end("666")
})

app.listen(8081, () => {
    console.log('server is listening at port 4000')
});