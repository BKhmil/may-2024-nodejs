const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const {readAllFromDB, writeAllToDB} = require("./helper.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ~~~~~~~~~~ TASK ~~~~~~~~~
// create-users -> users (POST)
// get-list-users -> users (GET)
// get-user-by-id -> users/:id (GET)
// update-user -> users/:id (PUT)
// delete-user -> users/:id (DELETE)
app.get('/users', async (req, res) => {
    try {
        const users = await readAllFromDB();
        res.json(users);
    } catch (e) {
        console.error(e.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const users = await readAllFromDB();

        const newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        users.push(newUser);

        await writeAllToDB(users);

        res.status(201).json(users);
    } catch (e) {
        console.error(e.message);
    }

});

app.get('/users/:userId', async (req, res) => {
    try {
        const users = await readAllFromDB();

        const user = users.find(user => user.id === Number(req.params.userId));

        user ? res.json(user) : res.status(404).json({ message: "No users with current id or empty db" });
    } catch (e) {
        console.error(e);
    }
});

app.put('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = await readAllFromDB();

        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            res.status(404).json({ message: "No users with current id or empty db" });
        } else {
            users[userIndex] = {...req.body, id: userId}

            await writeAllToDB(users);

            res.json(users[userIndex]);
        }
    } catch(e) {
        console.log(e);
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const users = await readAllFromDB();

        const userIndex = users.findIndex(user => user.id === Number(req.params.userId));

        if (userIndex === -1) {
            res.status(404).json({ message: "No users with current id or empty db" });
        } else {
            users.splice(userIndex, 1);

            await writeAllToDB(users);

            res.sendStatus(204);
        }
    } catch(e) {
        console.error(e);
    }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
})