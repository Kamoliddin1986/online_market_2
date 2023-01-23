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
      expiresIn: "2h",
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
    let idBool = false;
    let rez;

    markets.forEach((market) => {
      if (market.marketId == id) {
        idBool = true;
        rez = market;
      }
    });

    if (idBool) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(rez, null, 2));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(`marketId ${id} is not founded!!!`);
    }
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

    branch["products"] = [];
    products.forEach((product) => {
      if (product.branchId == branch.branchId) {
        delete product.branchId;
        branch.products.push(product);
      }
    });
  });

  if (id) {
    let idBool = false;
    let rez;

    branches.forEach((branch) => {
      if (branch.branchId == id) {
        idBool = true;
        rez = branch;
      }
    });

    if (idBool) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(rez, null, 2));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(`BranchId ${id} is not founded!!!`);
    }
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(branches, null, 2));
  }
}

function get_products(res, id) {
  let products = file_read("products.json");

  if (id) {
    let idBool = false;
    let rez;

    products.forEach((product) => {
      if (product.productId == id) {
        idBool = true;
        rez = product;
      }
    });
    if (idBool) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(rez, null, 2));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(`ProductId ${id} is not founded!!!`);
    }
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(products, null, 2));
  }
}

function get_workers(res, id) {
  let workers = file_read("workers.json");

  if (id) {
    let idB = false;
    let rez;

    workers.forEach((worker) => {
      if (worker.workerId == id) {
        idB = true;
        rez = worker; 
      }

    });
      if (idB) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(rez, null, 2));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(`WorkerId ${id} is not founded!!!`); 
      }
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(workers, null, 2));
  } 
}

function check_keys(obj) {
  let ret_obj = {
    bool: true,
  };
  for (let k in obj) {
    if (typeof obj[k] === "string") {
      obj[k] = obj[k].trim();
    }
    if (obj[k].length == 0) {
      ret_obj.bool = false;
      ret_obj["key"] = `${k}`;
    }
  }
  return ret_obj;
}

function post_file(res, nwData, fileName) {
  let chekByValue = check_keys(nwData);
  let idName =
    fileName == "branches"
      ? fileName.slice(0, -2) + "Id"
      : fileName.slice(0, -1) + "Id";
  fileName = `${fileName}.json`;
  if (chekByValue.bool) {
    let allData = file_read(fileName);
    let bool = true;
    allData.forEach((data) => {
      if ((data.title || data.name) == (nwData.title || nwData.name)) {
        bool = false;
      }
    });
    if (bool) {
      allData[allData.length] = {};
      allData[allData.length - 1][idName] = allData.length;
      for (let i in nwData) {
        allData[allData.length - 1][`${i}`] = nwData[`${i}`];
      }
      write_to_file(fileName, allData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(`${idName.slice(0, -2)} was added!!!`);
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(`"${nwData.name || nwData.title}" is exists!`);
    }
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(`${chekByValue.key} is not correct!`);
  }
}

function update_files(res, nwData, fileName, id) {
  let idName =
    fileName == "branches"
      ? fileName.slice(0, -2) + "Id"
      : fileName.slice(0, -1) + "Id";
  fileName = `${fileName}.json`;
  let allData = file_read(fileName);
  let bool = true;

  allData.forEach((data) => {
    if (
      (data.title || data.name) == (nwData.title || nwData.name) &&
      data[idName] != id
    ) {
      bool = false;
    }
  });

  if (bool) {
    let idBool = false;
    allData.forEach((data) => {
      if (data[idName] == id) {
        for (let k in data) {
          data[k] = nwData[k] || data[k];
          idBool = true;
        }
      }
    });

    if (!idBool) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(`${idName} ${id} is not founded!!`);
    }

    write_to_file(fileName, allData);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(`${idName} ${id} is updated!!`);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(`${nwData.title || nwData.name} is exists!!`);
  }
}

function delete_files(res, fileName, id) {
  let idName =
    fileName == "branches"
      ? fileName.slice(0, -2) + "Id"
      : fileName.slice(0, -1) + "Id";
  fileName = `${fileName}.json`;
  let allData = file_read(fileName);
  let bool = false;
  allData.forEach((data, inx) => {
    if (data[idName] == id) {
      allData.splice(inx, 1);
      bool = true;
    }
  });
  if (bool) {
    write_to_file(fileName, allData);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(`${idName} ${id} is deleted!!`);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(`${idName} ${id} is not founded!!`);
  }
}
export {
  file_read,
  update_files,
  delete_files,
  post_file,
  write_to_file,
  get_token,
  get_markets,
  get_branches,
  get_products,
  get_workers,
};
