import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Post } from './posts/posts.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { env } from 'node:process';

/*
* user created modules

*/
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        //entities: [User, Post],
        //synchronize: true,
        // port: +configService.get('DATABASE_PORT'),
        // username: configService.get('DATABASE_USER'),
        // password: configService.get('DATABASE_PASSWORD'),
        // host: configService.get('DATABASE_HOST'),
        // autoLoadEntities: true,
        // database: configService.get('DATABASE_NAME'),
        synchronize: configService.get('database.synchronize'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        database: configService.get('database.name'),
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
