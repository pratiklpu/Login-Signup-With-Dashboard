import mysql from "mysql";
import express from "express"
import cors from "cors"
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", "GET", "PUT"],
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

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("successfully connected");
});


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
            const user = results[0];
            req.session.user = user;
            console.log(req.session.user);
            return res.json({ Login: true });
        } else {
            return res.json({ Login: false });
        }
    })
})

app.get('/getUser', (req, res) => {
    if (req.session.user) {
        return res.json({ valid: true, user: req.session.user })
    } else {
        return res.json({ valid: false })
    }
})

app.put('/updateUser', (req, res) => {
    const { name, age, dob, phone } = req.body;
    const email = req.session.user.email; // Assuming email is the unique identifier for users
    const sql = 'UPDATE users SET name=?, age=?, dob=?, phone=? WHERE email=?';
    db.query(sql, [name, age, dob, phone, email], (err, result) => {
        if (err) return res.json({ Message: "Error updating user details" });
        req.session.user.name = name; // Update the user details in the session as well
        req.session.user.age = age;
        req.session.user.dob = dob;
        req.session.user.phone = phone;
        return res.json({ Message: "User details updated successfully", user: req.session.user });
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
