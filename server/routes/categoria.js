const express = require('express');
const Categoria = require('../models/categoria');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autentication');
const app = express();


// ============================
// Mostrar todas las categiras
// ============================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                categorias
            });
        })
});
// ============================
// Mostrar una categoria por id
// ============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No accede a la base de datos'
                }
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay categoria'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
});
// ============================
// Crear nueva categoria
// ============================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No accede a la base de datos'
                }
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay categoria'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })

});
// ============================
// Actualizar una categoria
// ============================
app.put('/categoria/:id', verificaToken, (req, res) => {

        let id = req.params.id;
        let body = req.body

        let descCategoria = {
            descripcion: body.descripcion
        };

        Categoria.findByIdAndUpdate(id, descCategoria, { new: true, newValidators: true }, (err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'No accede a la base de datos'
                    }
                });
            }
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No hay categoria'
                    }
                });
            }
            res.json({
                ok: true,
                categoria: categoriaDB
            });
        });
    })
    // ============================
    // Eliminar categoria
    // ============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No accede a la base de datos'
                }
            });
        }
        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay categoria'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria borrada'
        });
    });
})




module.exports = app;