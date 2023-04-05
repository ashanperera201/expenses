export interface IExpenseForm {
    expenseAmount: number;
    description: string;
    expenseDate: Date | undefined;
    expenseType: string
}