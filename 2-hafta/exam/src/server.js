import http from 'http'
import { 
    file_read, 
    write_to_file,
    get_token,
    get_markets
} from './fs/fs_api.js'
import url from 'url'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

let user = file_read('users.json')

http .createServer(async(req,res) => {
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
// if(req_name!='login'){    
//     try {
//         await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
// } catch (error) {
//     console.log('token is not actual');        
// }
// }

if(req.method == "GET"){
    if(req_name == 'markets'){
        get_markets(res,req_id)
    }
}


}).listen(5555, ()=>{
    console.log("server is running on 5555");
})   