const http = require('http')
const users = [
    {
        userName: "Mahmoud",
        email: "mahmoud@gmail.com",
        age: 21
    },
    {
        userName: "Ahmed",
        email: "Ahmed@gmail.com",
        age: 25
    },
    {
        userName: "Yousef",
        email: "Yousef@gmail.com",
        age: 38
    }
]
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const posts = [
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    },
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    },
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    },
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    }
]
const server = http.createServer((req, res) => {
    if (req.url == "/users" && req.method == "POST") {
        req.on('data', (chunk) => {
            let bufferData = JSON.parse(chunk)
            users.push(bufferData)
            res.end(JSON.stringify(users));
        })
    } else if (req.url == "/posts" && req.method == "POST"){
        req.on('data', (chunk) => {
            let bufferData = JSON.parse(chunk)
            posts.push(bufferData)
            res.end(JSON.stringify(posts));
        })
    }
    else {
        res.end("Error 404 Page Not Found")
    }
})

server.listen(5000)
