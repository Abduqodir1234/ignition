import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskCommentModule } from './task-comment/task-comment.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error?.extensions?.exception?.response?.message || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://root:admin@localhost:27017'),
    TasksModule,
    UserModule,
    AuthModule,
    TaskCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
