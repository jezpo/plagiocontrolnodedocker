var mongoose = require("mongoose");
mongoose.connect("mongodb://172.20.0.2:27017/policedb", {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on("error", (error) => {
    console.log("Error de conexión en la base de datos")
});
db.on("open", () => {
    console.log("Conexión establecida");
});
module.exports = mongoose;