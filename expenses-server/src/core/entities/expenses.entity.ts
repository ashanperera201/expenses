import * as mongoose from 'mongoose';

export const ExpensesSchema = new mongoose.Schema({
    expenseAmount: { type: Number, required: true },
    description: { type: String, required: false },
    expenseDate: { type: Date, required: true },
    expenseType: { type: String, required: false },
    isActive: { type: Boolean, required: true, default: true },
    createdDate: { type: Date, required: true, default: new Date() },
    createdBy: { type: String, required: true },
    modifiedBy: { type: String, required: false },
    modifiedOn: { type: Date, required: false, default: new Date() },
});

export class Expenses extends mongoose.Document {
    _id: string;
    expenseAmount: number;
    expenseDate: Date;
    description: string;
    expenseType: string;
    isActive: boolean;
    createdDate: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedOn: Date;
}
