const express = require("express")
const app = express()
const mongoose = require('mongoose');
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    swaggerDefinition:{
        infor:{
            title: "Chatting server",
            description : "A backend server for serving apis",
            contact:{
                name: "kareem magdy"
            },
            servers:["http://localhost:4000"]
        }
    },
    //.routes/*.js
    apis:["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

const URI=process.env.DATABASE_URI;

const authenticationRoutes=require("./routes/authentication");
const contractsRoutes=require("./routes/contracts");
const communicationRoutes=require("./routes/communication");
const isAuth=require("./controllers/isAuth");
const statusRoutes=require("./routes/status")

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET , POST , DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
})
//TODO write swagger documentation for every api
/**
 * @swagger
 * /default:
 *  get:
 *      description: default route.
 *      responses:
 *          '200':
 *              description: you have reached the default route
 */
app.use('/default',(req,res)=>{
    return res.status(200).json({"responseMessage": "you have reached the default route"})
})
app.use(authenticationRoutes);
app.use(isAuth,statusRoutes)
app.use(isAuth,contractsRoutes);
app.use(isAuth,communicationRoutes);

mongoose.connect(URI).then(result => {
    console.log("connected");
    app.listen(process.env.PORT);
})  