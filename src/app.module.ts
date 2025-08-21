import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/interfaces/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.BD_DATABASE,
      host: process.env.BD_HOST,
      password: process.env.BD_PASSWORD,
      port: Number(process.env.BD_PORT),
      username: process.env.BD_USERNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [`${__dirname}/migration/{.ts,*.js}`], // Ensure the UserEntity is included here
      migrationsRun: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
