export interface IExpenses {
    _id: string;
    maxExpenseAmount: number;
    description: string;
    expenseType: string;
    isActive: boolean;
    createdDate: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedOn: Date;
}