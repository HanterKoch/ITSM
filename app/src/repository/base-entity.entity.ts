import { PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn({comment: 'id', type: 'integer'})
    id: number;
}