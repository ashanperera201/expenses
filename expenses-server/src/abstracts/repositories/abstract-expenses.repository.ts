import { Expenses } from '../../core/entities/expenses.entity';

export abstract class AbstractExpenseRepository {
    abstract getAllExpensesAsync(): Promise<Expenses[]>;
    abstract getExpenseAsync(expenseId: string): Promise<Expenses>;
    abstract saveExpenseAsync(expense: Expenses): Promise<Expenses>;
    abstract updateExpenseAsync(expense: Expenses): Promise<any>;
    abstract deleteExpenseAsync(expenseIds: string[]): Promise<boolean>;
}
