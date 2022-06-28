// generate GraphQL Typescript definitions on-demand.
// GraphQL 감시파일
import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
    typePaths: ['./src/**/*.graphql'],
    path: join(process.cwd(), 'src/graphql.ts'),
    outputAs: 'class',
    watch: true
})