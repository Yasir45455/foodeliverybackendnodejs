const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://yasirkh261:yasirkh261@cluster0.yhwramo.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log('dataBase Connected');
});

