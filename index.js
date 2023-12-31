const express = require('express');
const cors = require('cors');
const sequelize = require('./Utils/db.js');
const bodyParser=require('body-parser');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended:true}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',require('./routes/auth-routes.js'));
app.use('/',require('./routes/customer-routes.js'));
app.use('/',require('./routes/group-codes-routes.js'));
app.use('/',require('./routes/gl-accounts-routes.js'));
app.use('/',require('./routes/transactions-route'))
app.use('/',require('./routes/company-data-routes.js'));

app.use((err, red, res, next)=>{
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
});

app.get('/',(req,res)=>{
    res.send("The api is working");
})

sequelize.sync().then(()=>{
    console.log("Database successfully connected");
    app.listen(3006,()=>{
        console.log("App listening on http://localhost:3006");
    })
}).catch(err=>{
    console.log(err);
});