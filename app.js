const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose
    .connect("mongodb://localhost/tddDB", {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log(`Connected to MongoDB at mongodb://localhost/tdBB...`)
    )
    .catch(err => {
        console.log("Failed to connect to MongodDB...", err);
        process.exit();
});

const usersRouter = require("./routes/user.route");

app.use("/api/users", usersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;

    // Render the error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;