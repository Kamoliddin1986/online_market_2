import http from 'http'
import { 
    file_read,
    get_token,
    get_markets,
    get_branches,
    get_products,
    get_workers,
    post_file,
    update_files,
    delete_files
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

    if(req_name == 'branches'){
        get_branches(res,req_id)
    }
    
    if(req_name == 'products'){
        get_products(res,req_id)
    }
    
    if(req_name == 'workers'){
        get_workers(res,req_id)
    }

}


if(req.method == 'POST'){  

        req.on('data', chunk => {
            let newMarket = JSON.parse(chunk)
            post_file(res,newMarket,req_name)    
        })    
}

if (req.method == 'PUT'){
        req.on('data', chunk => {
            let update_info = JSON.parse(chunk)
            update_files(res,update_info,req_name,req_id)
        })
}

if (req.method == 'DELETE'){
    delete_files(res, req_name, req_id)
}

}).listen(5555, ()=>{
    console.log("server is running on 5555");
})   