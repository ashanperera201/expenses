import { IsNotEmpty } from 'class-validator';

export class ExpensesDto {
    _id: string;
    @IsNotEmpty()
    expenseAmount: number;
    @IsNotEmpty()
    expenseDate: Date;
    description: string;
    @IsNotEmpty()
    expenseType: string;
    isActive: boolean;
    createdDate: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedOn: Date;
}
