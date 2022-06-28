import { Module } from '@nestjs/common';
// graphQL import
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HelloResolver } from './Author/hello.resolver';

import { CatsController } from './abc.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
      debug: false,
    }),
  ],
  controllers: [CatsController],
  providers: [HelloResolver],
})
export class AppModule {}
