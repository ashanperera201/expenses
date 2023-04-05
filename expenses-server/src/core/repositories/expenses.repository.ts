import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Expenses } from '../entities/expenses.entity';
import { AbstractExpenseRepository as AbstractExpensesRepository } from '../../abstracts/repositories/abstract-expenses.repository';

@Injectable()
export class ExpensesRepository implements AbstractExpensesRepository {

    constructor(@InjectModel('Expenses') private readonly expenseModel: Model<Expenses>) { }

    getAllExpensesAsync = async (): Promise<Expenses[]> => {
        return await this.expenseModel.find({ isActive: true }).sort({ createdDate: 'descending' });
    };

    getExpenseAsync = async (id: string): Promise<Expenses> => {
        return await this.expenseModel.findOne({ _id: id });
    };

    saveExpenseAsync = async (expense: Expenses): Promise<Expenses> => {
        return await this.expenseModel.create(expense);
    };

    updateExpenseAsync = async (expense: Expenses): Promise<any> => {
        const updatedResult = await this.expenseModel.updateOne(
            { _id: expense._id },
            {
                $set: { ...expense },
            },
            { upsert: true }
        );
        return updatedResult;
    };

    deleteExpenseAsync = async (expenseIds: string[]): Promise<boolean> => {
        let query = null;
        if (expenseIds.length === 0) {
            query = { _id: expenseIds[0] };
        } else {
            const queryList = [];
            expenseIds.forEach((e) => {
                queryList.push({ _id: e });
            });
            query = { $or: queryList };
        }

        const deletedRes = await this.expenseModel.deleteMany(query);
        if (deletedRes) {
            return true;
        } else {
            return false;
        }
    };
}
