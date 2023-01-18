import http from 'http'
import fs from 'fs'
import url from 'url'
import jwt from 'jsonwebtoken'

http .createServer((req,res) => {
   let req_name =url.parse(req.url).pathname('/')[1] 
   let req_id =url.parse(req.url).pathname('/')[1] 
}).listen(5555, ()=>{
    console.log("server is running on 5555");
})  