const mongoose = require("mongoose"); //inyectamos dependencia mongoose
const express = require("express"); //inyectamos dependencia express
const personsRoute = require("./routes/persons"); //inyectamos dependencia de router de persons

//se genera el app de express y setteamos el valor de mongoose
mongoose.Promise = global.Promise;
const app = express();

//configuramos view engine y agreganos el router
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(personsRoute);

//conectamos la base de datos mediante mongoose
mongoose.connect(
  `mongodb+srv://user:user@cluster0.1bwvg.mongodb.net/practicaPW?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//imprimimos en consola si tenemos un error o si se conectó la base de datos
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected succesfully");
});

//levantamos el servidor
app.listen(3000);
