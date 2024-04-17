import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    type: "postgres",
                    host: "localhost",
                    port: 5432,
                    username: "postgres",
                    password: "8022",
                    database: "ITSM",
                    entities: [
                        "dist/**/*.entity.js"
                    ],
                    synchronize: true,
                    logging: false,
                }
            }
        }),
        UsersModule,
        TaskModule,
    ],
})
export class AppModule {}