import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ExpenseModule } from './expense-controller/expense.module';
import { AppController } from './app.controller';
import { AppService } from '../app.service';
import { configuration } from '../configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.APP_DATABASE_CONNECTION, {
      connectionName: process.env.APP_CONNECTION_NAME,
      dbName: process.env.APP_CONNECTION_NAME,
    }),
    ExpenseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
