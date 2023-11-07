const http = require('http')
const { readFileSync } = require('fs')

const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeImage = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req,res) => {
   const url = req.url;
//    Home
   if(url === '/'){
       res.writeHead(200,{'content-type': 'text/html'})
       res.write(homePage)
       res.end()
   }
//    about  
   else if(url === '/about'){
    res.writeHead(200,{'content-type': 'text/html'})
       res.write('<h1>About Page</h1>')
       res.end()
   }
//    styles 
   else if(url === '/styles.css'){
    res.writeHead(200,{'content-type': 'text/css'})
       res.write(homeStyles)
       res.end()
   }
//    image 
   else if(url === '/logo.svg'){
    res.writeHead(200,{'content-type': 'image/svg+xml'})
       res.write(homeImage)
       res.end()
   }
//    logic 
   else if(url === '/browser-app.js'){
    res.writeHead(200,{'content-type': 'text/javascipt'})
       res.write(homeLogic)
       res.end()
   }else {
    res.writeHead(404,{'content-type': 'text/html'})
       res.write('<h1>Page not found</h1>')
       res.end()
   }
})
server.listen(5000)
