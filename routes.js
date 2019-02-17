const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">kirim</button></form></body>');
        res.write('</html>');

        // res.write('<html>');
        // res.write('<head><title>Hello, World!</title></head>');
        // res.write('<body><h1>greetings, my friend</h1></body>');
        // res.write('<body><label>Username : </label><form action="/create-user" method="post"><input type="text" name="username"><button type="submit">Login</button></form></body>');
        // res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const pesan = parsedBody.split('=')[1];
            res.write('<body><h1>your username is '+pesan+'</h1></body>');
            console.log(pesan);
            return res.end();
        });
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const pesan = parsedBody.split('=')[1];
            console.log(pesan);
            fs.writeFile('message.txt', pesan, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    if (url === '/users' ) {
        res.write('<html>');
        res.write('<body><h1>User 1</h1>');
        res.write('<h1>User 2</h1>');
        res.write('<h1>User 3</h1></body>');
        res.write('</html>');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Halaman pertama</title></head>');
    res.write('<body><h1>Hello bos, ini halaman pertama</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = {
    handler: requestHandler,
    tulisan: 'sembarang, boy!'
};
    