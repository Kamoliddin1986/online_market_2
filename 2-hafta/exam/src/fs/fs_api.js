import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function file_read(fileName) {
  return JSON.parse(fs.readFileSync(`./model/${fileName}`));
}

function write_to_file(fileName, data) {
  fs.writeFile(`./model/${fileName}`, JSON.stringify(data, null, 4), (err) => {
    if (err) throw err;
    console.log(`data was written to ${fileName}`);
  });
}

function get_token(login, pass, res) {
  let user = file_read("users.json");

  if (user[0].name == login && user[0].password == pass) {
    let token = jwt.sign({ name: `${login}` }, process.env.SECRET_KEY, {
      expiresIn: "10s",
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(token));
  }
}

function get_markets(res, id) {
  let markets = file_read("markets.json");
  let branches = file_read("branches.json");
  markets.forEach((market) => {
    branches.forEach((branch) => {
      if (market.marketId == branch.marketId) {
        delete branch.marketId;
        market["branches"] = [];
        market.branches.push(branch);
      }
    });
  });

  if (id) {
    markets.forEach((market) => {
      if (market.marketId == id) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(market, null, 2));
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(markets, null, 2));
  }
}

function get_branches(res, id) {

  let branches = file_read("branches.json");
  let workers = file_read("workers.json");
  let products = file_read("products.json");
  branches.forEach((branch) => {
      branch["workers"] = [];
    workers.forEach((worker) => {
      if (worker.branchId == branch.branchId) {
        delete worker.branchId;
        branch.workers.push(worker);
      }
    });
    
    console.log(JSON.stringify(branches,null,2));
    branch["products"] = [];
    products.forEach((product) => {
      if (product.branchId == branch.branchId) {
        delete product.branchId;
        branch.products.push(product);
      }
    });    
  });

  if (id) {
    branches.forEach((branch) => {
      if (branch.branchId == id) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(branch, null, 2));
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(branches, null, 2));
  }
}

function get_products(res, id) {

  let products = file_read("products.json");

  if (id) {
    products.forEach((product) => {
      if (product.id == id) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(product, null, 2));
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(products, null, 2));
  }
}

function get_workers(res, id) {

  let workers = file_read("workers.json");

  if (id) {
    workers.forEach((worker) => {
      if (worker.id == id) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(worker, null, 2));
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(workers, null, 2));
  }
}

function check_keys(obj){
  let ret_obj = {
    bool: true
  }
  for(let k in obj){
    if(typeof(obj[k])=== 'string'){
      obj[k] = obj[k].trim()
    }
    if(obj[k].length == 0){
      ret_obj.bool = false
      ret_obj['key'] = `${k}`
    } 
   }
   return ret_obj  
}

function post_markets(res, market){
  let markets = file_read("markets.json");
  let chekByValue= check_keys(market)  
  markets.forEach(mark => {
    if(mark.name == market.name){
      bool = false
    }
  })
  if(chekByValue.bool){
    markets.push({id: markets.length+1, ...market})
    write_to_file("markets.json", markets)
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end("market was added!")
  }else{
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end(`${chekByValue.key} is not correct!`)
  }

}

function post_branches(res, branch){
  let branches = file_read("branches.json");
  let chekByValue= check_keys(branch) 
  branches.forEach(br => {
    if(br.name == branch.name){
      bool = false
    }    
  })
  if(chekByValue.bool){
    branches.push({id: branches.length+1, ...branch})
    write_to_file("branches.json", branches)
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end("Branch was added!")
  }else{
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end(`${chekByValue.key} is not correct!`)
  }

}

function post_products(res, product){
  let products = file_read("products.json");
  let chekByValue= check_keys(product) 
  products.forEach(pr => {
    if(pr.title == product.title){
      bool = false
    }    
  })
  if(chekByValue.bool){
    products.push({id: products.length+1, ...product})
    write_to_file("products.json", products)
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end("product was added!")
  }else{
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end(`${chekByValue.key} is not correct!`)
  }

}

function post_workers(res, worker){
  let workers = file_read("workers.json");
  let chekByValue= check_keys(worker) 
  workers.forEach(wk => {
    if(wk.name == worker.name){
      bool = false
    }    
  })
  if(chekByValue.bool){
    workers.push({id: workers.length+1, ...worker})
    write_to_file("workers.json", workers)
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end("worker was added!")
  }else{
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end(`${chekByValue.key} is not correct!`)
  }

}
export { file_read, post_branches, post_workers, post_products, post_markets, write_to_file, get_token, get_markets, get_branches, get_products, get_workers };
