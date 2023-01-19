import http from 'http'
import { 
    file_read, 
    write_to_file,
    get_token 
} from './fs/fs_api.js'
import url from 'url'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

let user = file_read('users.json')

http .createServer((req,res) => {
   let req_name = url.parse(req.url).pathname.split('/')[1] 
   let req_id = url.parse(req.url).pathname.split('/')[2]


   if(req.method == "POST"){
    if(req_name == 'login'){
        req.on('data', chunk => {
            let user_data =JSON.parse(chunk)
            get_token(user_data.name, user_data.password,res)
        })
    }
   }



}).listen(5555, ()=>{
    console.log("server is running on 5555");
})   