const express = require("express");
const router = express.Router();
const mongoose = require("../node_modules/mongoose");
let Person = require("../models/person");

router.get("/persons", function (req, res, next) {
  Person.find(function (err, persons) {
    if (err) return next(err);
    //res.json(persons);
    res.render("personsTable", { persons });
  });
});

//ruta para mostrar el formulario
router.get("/person", function (req, res) {
  res.render("person");
});

//ruta para mostrar la página principal
router.get("/main", function (req, res) {
  res.render("main");
});

//PRACTICA 22 -----------------------------------------------------------------------------
/*Aquí se contiene el objecto Id de la base de datos que se asigna automaticamente a cada documento q se agrega a la coleccion.
Cuando se renderiza la vista listado, se pasa un objeto persons que contiene todos los documentos con sus keys */
router.get("/persons", function (req, res, next) {
  Person.find(function (err, persons) {
    if (err) return next(err);
    res.render("persons", { persons }); //cambia el tipo de objeto
  });
});

//Utilizar id para ejecutar metodo findByIdAndRemove
//deletePerson
router.get("/deletePerson/:id", function (req, res, next) {
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.redirect("/persons");
  });
});

//findById
router.get("/findById/:id", function (req, res, next) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return next(err);
    res.render("personUpdate", { person });
  });
});

//updatePerson
router.post("/updatePerson", function (req, res, next) {
  Person.findByIdAndUpdate(
    req.body.objId,
    {
      nombre: req.body.nombre,
      edad: req.body.edad,
      tipoSangre: req.body.tipoSangre,
      nss: req.body.nss,
    },
    function (err, post) {
      if (err) return next(err);
      res.redirect("/persons");
    }
  );
});
// ----------------------------------------------------------------------------

//agregar nuevo documento a la colección
//ruta para atender la petición del formulario
router.post("/addPerson", function (req, res) {
  const myPerson = new Person({
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss,
  }); //crear la entidad
  myPerson.save(); //guardar en la base de datos
});

module.exports = router;
