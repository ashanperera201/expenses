import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configuration } from '../../configuration';
import { modelDefinitions } from '../../core/entity-exports';
import { ResponseMapperService } from '../../services/response-mapper.service';
import { AbstractExpenseRepository } from '../../abstracts/repositories/abstract-expenses.repository';
import { ExpenseService } from '../../services/expense.service';
import { AbstractExpenseApplication } from '../../abstracts/application-logics/abstract-expenses.application';
import { ExpensesRepository } from '../../core/repositories/expenses.repository';

@Module({
  controllers: [ExpensesController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    MongooseModule.forFeature(modelDefinitions, process.env.APP_CONNECTION_NAME),
  ],
  providers: [
    ResponseMapperService,
    {
      provide: AbstractExpenseApplication,
      useClass: ExpenseService,
    },
    {
      provide: AbstractExpenseRepository,
      useClass: ExpensesRepository,
    },
  ]
})
export class ExpenseModule {}
