import { googleSignin, signin, signup } from "../controllers/auth.controller";

const route = require("express").Router();

route.post('/signup', signup);
route.post('/signin', signin);
route.post('/googlesignin', googleSignin);

module.exports = route;