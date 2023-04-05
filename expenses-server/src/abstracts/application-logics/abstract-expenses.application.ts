import { ResponseDto, ExpensesDto } from '../../shared/';

export abstract class AbstractExpenseApplication {
    abstract getAllExpensesAsync(): Promise<ResponseDto<ExpensesDto[]>>;
    abstract getExpenseAsync(expenseId: string): Promise<ResponseDto<ExpensesDto>>;
    abstract saveExpensesAsync(expense: ExpensesDto): Promise<ResponseDto<ExpensesDto>>;
    abstract updateExpensesAsync(expense: ExpensesDto): Promise<ResponseDto<any>>;
    abstract deleteExpensesAsync(expenseIds: string[]): Promise<ResponseDto<boolean>>;
    abstract getPieChartDataAsync(): Promise<ResponseDto<any>>;
    abstract getCurrentTotalAmountAsync(): Promise<ResponseDto<any>>;
}
