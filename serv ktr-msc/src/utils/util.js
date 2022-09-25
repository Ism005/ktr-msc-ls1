const User = require("../../models/users");
const app = express();
const port = process.env.PORT || 5000;

connectDb().catch(err => console.log(err));

app.use(express.json());

app.post("/create" ,(req  , res , next) => {
    console.log(req.body);
    let {password} = req.body;
    let pass = req.body.password
    if (password !== null && password !== undefined ) {
        const userr = new User(req.body);
        userr.save();
        res.json( userr )
    }
    res.json("erreur")
});