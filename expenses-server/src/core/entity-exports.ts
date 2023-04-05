import { ModelDefinition } from '@nestjs/mongoose';
import { ExpensesSchema } from './entities/expenses.entity';

export const modelDefinitions: ModelDefinition[] = [
    { name: 'Expenses', schema: ExpensesSchema },
];
