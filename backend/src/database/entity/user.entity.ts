import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: string ;

    @Column({
        nullable : false
    })
    username !: string;

    @Column({
        nullable : false
    })
    useremail !: string;

    @Column({
        nullable : false
    })
    userpassword !: string;

}