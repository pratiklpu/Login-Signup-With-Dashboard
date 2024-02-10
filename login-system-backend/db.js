import mysql from "mysql";
import express from "express"
import cors from "cors"
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", "GET"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6682911",
    password: "eQ97yrT1hc",
    database: "sql6682911",
});

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false })
    }
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users(name, email, password, age, dob, phone) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.age,
        req.body.dob,
        req.body.phone,
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Message: "Error in Registring" });
        return res.json(result)
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email=? and password=?';
    db.query(sql, [req.body.email, req.body.password], (err, results) => {
        if (err) return res.json({ Message: "Error inside server" });

        if (results.length > 0) {
            req.session.username = results[0].username;
            console.log(req.session.username);
            return res.json({ Login: true });
        } else {
            return res.json({ Login: false });
        }
    })
})

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("successfully connected");
});
