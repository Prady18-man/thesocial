import {Request,Response} from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator"
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserRepository } from "../database/repository/user.repository";
import {getCustomRepository}  from "typeorm"

dotenv.config();
//controller 
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

    static validateEmail(useremail: string):boolean{
        let isEmailValidator = EmailValidator.validate(useremail);
        return isEmailValidator;

    }

    static async createNewAccount(req : Request,res : Response){
        let {useremail,userpassword} = req.body;
        let jwt_secret_key =""+process.env.JWT_SECRET_KEY  ;


        if(!Authcontroller.validateEmail){
            return res.send({
                authenticated: false,
                message: "Enter valid email!",
            });

        }

        let salt = await bcrypt.genSalt(10);
        bcrypt.hash(userpassword,salt,async(error:any, hashedpassword:any)=>{
            if(error){
                return res.send({
                    message: error, 
                    authentication: false,

                });
            }
           
            //saving userdata

            let userRepository = getCustomRepository(UserRepository);
          await userRepository.saveUserData(req,res,hashedpassword);
   
   //sending jwt
          jwt.sign(
        {
            useremail
        },
        jwt_secret_key,
        {
            expiresIn:"1h"
        },
        async(error : any , data : any)=>{
            if(error){
            return res.send({
                message:error,
            //error:error,
                authentication:false});
            }
            return res.send({
                data:data,
                authentication: true
            });
        }
    );


        });

    }

}

