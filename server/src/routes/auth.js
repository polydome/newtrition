const express = require('express');
const AuthService = require('../services/authService')
const {AuthError} = require("../services/results");

const router = express.Router();

router.post('/', async function (req, res) {
    const {username, password} = req.body

    if (!username || !password)
        return res.sendStatus(400);

    const result = await AuthService.generateTokens(username, password);

    if (result.error === AuthError.INVALID_USERNAME_OR_PASSWORD)
        return res.status(401).send({
            error: {
                message: "Invalid username or password."
            }
        });

    if (result.data) {
        const {accessToken, refreshToken} = result.data;
        return res.status(200).send({accessToken, refreshToken});
    }

    res.sendStatus(500);
});

module.exports = router;