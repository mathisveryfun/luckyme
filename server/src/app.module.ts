import { Module } from '@nestjs/common';
// graphQL import
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HelloResolver } from './Users/hello.resolver';

import { UsersController } from './controller/users.controller';
import { AppController } from './controller/app.controller';
import { ServiceB } from './service/app.childService';

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
  ],
  controllers: [AppController, UsersController],
  providers: [HelloResolver, ServiceB],
})
export class AppModule {}
