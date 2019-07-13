const express = require('express');
const Producto = require('../models/producto');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autentication');
const app = express();


// ============================
// Mostrar todas los prductos
// ============================
app.get('/producto', verificaToken, (req, res) => {
    Producto.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .populate('categoria')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            });
        })
});
// ============================
// Mostrar todas un producto
// ============================
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No accede a la base de datos'
                }
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay producto'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    })
});
// ============================
// buscar productos
// ============================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'No accede a la base de datos'
                    }
                });
            }
            res.json({
                ok: true,
                productos
            });
        })
});
// ============================
// Crear nuevo product
// ============================
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No accede a la base de datos'
                }
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay producto'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    })

});
// ============================
// Actualizar un producto
// ============================
app.put('/producto/:id', verificaToken, (req, res) => {

        let id = req.params.id;
        let body = req.body

        Producto.findById(id, (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'No accede a la base de datos'
                    }
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No hay producto'
                    }
                });
            }

            productoDB.nombre = body.nombre;
            productoDB.precioUni = body.precioUni;
            productoDB.categoria = body.categoria;
            productoDB.disponible = body.disponible;
            productoDB.descripcion = body.descripcion;

            productoDB.save((err, productoGuardado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: 'No accede a la base de datos'
                        }
                    });
                }
                res.json({
                    ok: true,
                    producto: productoGuardado
                });
            })
        });
    })
    // ============================
    // Eliminar categoria
    // ============================
app.delete('/producto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndDelete(id, (err, productoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No accede a la base de datos'
                }
            });
        }
        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay producto'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Producto borrado'
        });
    });
})


module.exports = app;