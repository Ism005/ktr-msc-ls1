const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

let corsOptions = {
    origin: "http://localhost:50000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "Jonathan",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Homepage" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});