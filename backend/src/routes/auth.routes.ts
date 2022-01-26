import Router from "express";
import {Authcontroller}  from "../controllers/auth.controller";

const authrouter = Router();

authrouter.get("/posts",  Authcontroller.showPosts);
authrouter.post("/signup",Authcontroller.signup);

export {authrouter};