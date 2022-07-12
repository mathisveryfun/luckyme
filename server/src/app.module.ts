import { Module } from '@nestjs/common';
// graphQL import
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HelloResolver } from './Users/hello.resolver';

import { UsersController } from './Userss/users.controller';
import { AppController } from './controller/app.controller';
// import { ServiceB } from './service/app.childService';
// import { ServiceA } from './service/app.serviceA';
import { UsersService } from './Userss/users.service';
import { EmailService } from './Email/email.service';
import { UsersModule } from './Userss/users.module';
import { EmailModule } from './Email/email.module';
import emailConfig from './config/emailconfig';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      debug: false,
    }),
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      // emailConfig를 저장합니다.
      load: [emailConfig],
      // 전역 모듈로 동작합니다.
      isGlobal: true,
      // 환경변수의 유효성을 검사합니다.
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [HelloResolver],
})
export class AppModule {}
