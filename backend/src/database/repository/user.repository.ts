import {EntityRepository, Repository} from "typeorm"
import {UserEntity} from "../entity/user.entity"
import {Request , Response } from "express"



@EntityRepository(UserEntity)

export class UserRepository extends Repository<UserEntity>{

    async saveUserData(req:Request,res:Response,hashedpassword:any){
        let { username , useremail } = req.body;
        let checkIfUserExists = await this.createQueryBuilder("users")
        .select()
        .where("users.useremail = :useremail",{
            useremail,
        }).getCount() > 0;

        if(checkIfUserExists)
            return res.send({
                authenticated : false,
                message:"User already exist"
            });
        
            this.createQueryBuilder("users").insert().values({
                useremail,
                userpassword :hashedpassword,
                username,
            }).execute();

    };
}