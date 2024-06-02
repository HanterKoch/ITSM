import { BaseEntity } from "src/repository/base-entity.entity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @Column({comment: 'Логин', type: String})
    login: string;

    @Column({comment: 'Пароль', type: String})
    password: string;

    @Column({comment: 'Роль', type: String})
    role: string;

    @Column({name: 'Имя', type: String})
    name: string;
}
