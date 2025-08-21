import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    role_id!: number;

    @Column({ unique: true })
    roleName!: string;  // e.g. "admin", "user"

    // 👇 One role can belong to many users
    @OneToMany(() => User, user => user.role)
    users!: User[];
}
