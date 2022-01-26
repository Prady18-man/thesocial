import Router from "express";
import {Authcontroller}  from "../controllers/auth.controller";

const authrouter = Router();

authrouter.post("/signup",Authcontroller.createNewAccount);

export {authrouter};