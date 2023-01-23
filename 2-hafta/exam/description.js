// Market App

// POST /login
/* 
    {
        "username": "Eshmat",
        "password": 123
    }
*/
// ============================Token===================================
// GET /markets

/* 
    {
        "id": 1,
        "name": "Makro",
        "branches": [
            {
                "id": 1,
                "name": "Makro Yunusobod",
                "address": "Yunusobod",
            },
            {
                "id": 2,
                "name": "Makro Chilonzor",
                "address": "Chilonzor",
            }
        ]
    }
*/



// POST /markets
/* 
    {
        "name": "Havas"
    }
*/
// PUT /markets/1
/* 
    {
        "name": "Havas2"
    }
*/
// DELETE /markets/1

// GET /markets/1

/* 
    {
        "id": 1,
        "name": "Makro",
        "branches": [
            {
                "id": 1,
                "name": "Makro Yunusobod",
                "address": "Yunusobod",
                "workers": [
                    {
                        "id": 1,
                        "name": "Eshmat",
                        "phoneNumber": "998901234567"
                    }
                ],
                "products": [
                    {
                        "id": 1,
                        "title": "Olma",
                        "price": "100000"
                    }
                ]
            },
            {
                "id": 2,
                "name": "Makro Chilonzor",
                "address": "Chilonzor",
                "workers": [
                    {
                        "id": 2,
                        "name": "Toshmat",
                        "phoneNumber": "998901234567"
                    }
                ],
                "products": [
                    {
                        "id": 2,
                        "title": "Anor",
                        "price": "100000"
                    }
                ]
            }
        ]
    }
*/

// GET /branches

// GET /branches/1

/* 
    {
        "id": 1,
        "name": "Makro Yunusobod",
        "address": "Yunusobod",
        "workers": [
            {
                "id": 1,
                "name": "Eshmat",
                "phoneNumber": "998901234567"
            }
        ],
        "products": [
            {
                "id": 1,
                "title": "Olma",
                "price": "100000"
            }
        ]
    }
*/

// POST /branches

/* 
    {
        "name": "Makro Yunusbodi",
        "address": "Yunusobod",
        "marketId": 1
    }
*/

// PUT /branches/1

/* 
    {
        "name": "Makro Yunusobod",
        "address": "Yunusobod",
        "marketId": 2
    }
*/

// DELETE /branches/1

// GET /worker

// GET /worker/1

// POST /worker

/* 
    {
        "name": "Eshmat",
        "phoneNumber": "998901234567",
        "branchId": 1
    }
*/

// PUT /worker/1
/* 
    {
        "name": "Toshmat",
        "phoneNumber": "998901234566",
        "branchId": 2
    }
*/

// DELETE /worker/1


// POST /products

// POST /products/1

/* 
    {
        "title": "Anor",
        "price": "200000",
        "branchId": 2
    }
*/

// PUT /products/1
/* 
    {
        "title": "Anor",
        "price": "200000",
        "branchId": 1
    }
*/

// DELETE /products/1


// github commit eng kamida 15 ta bo'lishi kerak
