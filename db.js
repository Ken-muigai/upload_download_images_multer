const mongoose = require("mongoose");

module.exports = app => {
    mongoose.connect("mongodb+srv://Kenjoel:Ivylove1@cluster0.9mzmf.mongodb.net/imageTestDB?retryWrites=true&w=majority", {
        useUnifiedTopology:true,
        useNewUrlParser:true,
    }).then(res => console.log("we have been connected to mongo on port 27017"))
    .catch((er) =>{
        console.log(er);
    })

    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM",cleanup);
    process.on("SIGHUP", cleanup);

    if(app){
        app.set("mongoose", mongoose)
    }

    function cleanup(){
        mongoose.connection.close(() => {
            process.exit(0);
        })
    }
}