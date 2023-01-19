import fs from 'fs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function file_read(fileName){
    return JSON.parse(fs.readFileSync(`./model/${fileName}`))
}

function write_to_file(fileName,data){
    fs.writeFile(`./model/${fileName}`,JSON.stringify(data, null, 4), (err)=>{
        if(err) throw err
        console.log(`data was written to ${fileName}`);
    })
}

function get_token(login, pass, res){
    let user = file_read('users.json')

    if(user[0].name == login && user[0].password == pass){
        let token = jwt.sign({name: `${login}`}, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })
        res.writeHead(200,{"Content-Type": "application/json"})
        return res.end(JSON.stringify(token))
    }
}

export {
    file_read,
    write_to_file,
    get_token
}