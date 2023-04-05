import { Injectable, HttpStatus } from '@nestjs/common';

import { AbstractExpenseRepository } from '../abstracts/repositories/abstract-expenses.repository';
import { AbstractExpenseApplication } from '../abstracts/application-logics/abstract-expenses.application';
import { ResponseMapperService } from './response-mapper.service';
import { ResponseDto, ExpensesDto } from '../shared';
import { ExpenseTypes } from 'src/shared/enums/expense-types.enum';

@Injectable()
export class ExpenseService implements AbstractExpenseApplication {

    constructor(private abstractExpenseRepository: AbstractExpenseRepository, private _responseMapperService: ResponseMapperService) { }

    getCurrentTotalAmountAsync = async (): Promise<ResponseDto<any>> => {
        try {
            let response = {
                currentCount: 0,
            };
            const expenses = await this.abstractExpenseRepository.getAllExpensesAsync();
            response.currentCount = expenses.map(x => x.expenseAmount).reduce((a, b) => a + b, 0);
            return this._responseMapperService.serviceResponseMapper<any>(response, null, false, expenses.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<any>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getPieChartDataAsync = async (): Promise<ResponseDto<any>> => {
        try {
            let response = {
                totalCountFood: 0,
                totalCountMovies: 0,
                totalCountOnlineSubscription: 0,
                totalCountTraveling: 0,
            };
            const expenses = await this.abstractExpenseRepository.getAllExpensesAsync();

            const totalCountFood = expenses.filter(x => +x.expenseType === ExpenseTypes.Food).map(x => x.expenseAmount).reduce((a, b) => a + b, 0);
            const totalCountMovies = expenses.filter(x => +x.expenseType === ExpenseTypes.Movies).map(x => x.expenseAmount).reduce((a, b) => a + b, 0);;
            const totalCountOnlineSubscription = expenses.filter(x => +x.expenseType === ExpenseTypes.OnlineSubscription).map(x => x.expenseAmount).reduce((a, b) => a + b, 0);;
            const totalCountTraveling = expenses.filter(x => +x.expenseType === ExpenseTypes.Traveling).map(x => x.expenseAmount).reduce((a, b) => a + b, 0);;

            response.totalCountFood = (totalCountFood / 10000) * 100;
            response.totalCountMovies = (totalCountMovies / 10000) * 100;
            response.totalCountOnlineSubscription = (totalCountOnlineSubscription / 10000) * 100;
            response.totalCountTraveling = (totalCountTraveling / 10000) * 100;

            return this._responseMapperService.serviceResponseMapper<any>(response, null, false, expenses.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<any>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getAllExpensesAsync = async (): Promise<ResponseDto<ExpensesDto[]>> => {
        try {
            const expenses = await this.abstractExpenseRepository.getAllExpensesAsync();
            return this._responseMapperService.serviceResponseMapper<ExpensesDto[]>(expenses, null, false, expenses.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<ExpensesDto[]>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getExpenseAsync = async (expenseId: string): Promise<ResponseDto<ExpensesDto>> => {
        try {
            const result = await this.abstractExpenseRepository.getExpenseAsync(expenseId);
            return this._responseMapperService.serviceResponseMapper<ExpensesDto>(result, null, false, result ? HttpStatus.OK : HttpStatus.NO_CONTENT);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<ExpensesDto>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    saveExpensesAsync = async (expense: ExpensesDto): Promise<ResponseDto<ExpensesDto>> => {
        try {
            const payload: any = {
                expenseAmount: expense.expenseAmount,
                description: expense.description,
                expenseDate: expense.expenseDate,
                expenseType: expense.expenseType,
                isActive: true,
                createdDate: Date.now(),
                createdBy: 'Admin',
            };
            const savedResult = await this.abstractExpenseRepository.saveExpenseAsync(payload);
            return this._responseMapperService.serviceResponseMapper<ExpensesDto>(savedResult, null, false, HttpStatus.CREATED);
        } catch (error: any) {
            return this._responseMapperService.serviceResponseMapper<ExpensesDto>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    updateExpensesAsync = async (expense: ExpensesDto): Promise<ResponseDto<any>> => {
        try {
            const requestPayload: any = {
                _id: expense._id,
                expenseAmount: expense.expenseAmount,
                expenseDate: expense.expenseDate,
                description: expense.description,
                expenseType: expense.expenseType,
                isActive: expense.isActive,
                createdDate: expense.createdDate,
                createdBy: expense.createdBy,
                modifiedBy: expense.modifiedBy,
                modifiedOn: expense.modifiedOn,
            };

            const updatedResult = await this.abstractExpenseRepository.updateExpenseAsync(requestPayload);
            return this._responseMapperService.serviceResponseMapper<ExpensesDto>(updatedResult, null, false, HttpStatus.OK);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<ExpensesDto>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    deleteExpensesAsync = async (expenseIds: string[]): Promise<ResponseDto<boolean>> => {
        try {
            const deletedResponse = await this.abstractExpenseRepository.deleteExpenseAsync(expenseIds);
            return this._responseMapperService.serviceResponseMapper<boolean>(deletedResponse, null, false, HttpStatus.OK);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<boolean>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
