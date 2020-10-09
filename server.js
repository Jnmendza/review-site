require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const db = require('./db');

// Middleware goes underneath
app.use(express.json())

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        const results = await db.query("select * from restaurants");
        console.log(results);
    
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            }
        });
    } catch(err) {
        console.log(err);
    }
    
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req);
    const id = req.params.id
    try{
        const results = await db.query(`select * from restaurants where id = ${id}`)

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })

    } catch(err){
        console.log(err);
    }
});

// Create a Restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "Masters",
        },
    })
})

//Update Restaurants
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "Masters"
        }
    })
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success"
    })
})

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

