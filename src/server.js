import {createServer} from 'node:http'

const text = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hero Section</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
        }

        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydGZvbGlvJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D') no-repeat center center/cover;
            text-align: center;
            color: white;
            position: relative;
        }

        .hero::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }

        .content {
            position: relative;
            z-index: 2;
        }

        h1 {
            font-size: 3rem;
            margin-bottom: 10px;
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1rem;
        }

        .btn:hover {
            background: #0056b3;
        }

    </style>
</head>
<body>
    <section class="hero">
        <div class="content">
            <h1>Welcome to Our Website</h1>
            <p>Your journey to excellence starts here.</p>
            <a href="#" class="btn">Get Started</a>
        </div>
    </section>
</body>
</html>`

const server  = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(text);
})

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})