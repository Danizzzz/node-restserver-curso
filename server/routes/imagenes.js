const express = require('express');
const fs = require('fs');



const app = express();
const path = require('path');

const { verificaTokenImg } = require('../middlewares/autentication');



app.get('/imagenes/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg)
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendfile(noImagePath);
    }




})




module.exports = app;