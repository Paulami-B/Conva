"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const route = require("express").Router();
route.post('/signup', auth_controller_1.signup);
route.post('/signin', auth_controller_1.signin);
route.post('/googlesignin', auth_controller_1.googleSignin);
module.exports = route;
