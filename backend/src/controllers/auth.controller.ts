import {Request,Response} from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator"
import dotenv from "dotenv";

dotenv.config();
export class Authcontroller {
    static async showPosts(req: Request, res: Response){
        let jwt_secret_key =""+ process.env.JWT_SECRET_KEY;
        let token ="" + req.headers.authorization ;
        jwt.verify(token,jwt_secret_key, async(error: any,data :any)=>{
            if(error){
                return res.send({
                    data : error,
                    received : false,
                });
            }
             return res.send({
                posts: "List of posts",
                userdata: data,
            });
        });
    }

    static async signup(req : Request,res : Response){
        let {username,useremail,userpassword} = req.body;
        let jwt_secret_key =""+process.env.JWT_SECRET_KEY  ;


        let isEmailValidator = EmailValidator.validate(useremail);
        if(!isEmailValidator){
            return res.send({
                data:"Provide valid Email",
                authentication : false,
            });
        }

        jwt.sign(
            {
                useremail,
                userpassword
            },
            jwt_secret_key,
            {
                expiresIn:"1h"
            },
            async(error : any , data : any)=>{
                if(error){
                return res.send({
                    data:error,
                    //error:error,
                    authentication:false});
                }
                return res.send({
                    data:data,
                    authentication: true
                });
            }
        );
    }

}