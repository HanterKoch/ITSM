import { combineLatest } from "rxjs";
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "src/repository/base-entity.entity";

@Entity('task')
export class Task extends BaseEntity {
    @Column({
        name: 'isshue', 
        comment: 'Текст проблемы', 
        type: String,
    })
    issueText: string;

    @Column({
        name: 'answer', 
        comment: 'Куда нужно ответить', 
        type: String,
    })
    answer: string;

    @Column({
        name: 'complited', 
        comment: 'Выполнена ли задача', 
        type: Boolean,
        default: false,
    })
    isCompleted: boolean

    @Column({
        name: 'header', 
        comment: 'Заголовок', 
        type: String,
    })
    header: string

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'user_id', 
        referencedColumnName: 'id',
    })
    currentUser: User[];

    // @ManyToOne(() => Company)
    // @JoinColumn({
    //     name: 'company_id',
    //     referencedColumnName: 'id',
    // })
    // company: Company
}
