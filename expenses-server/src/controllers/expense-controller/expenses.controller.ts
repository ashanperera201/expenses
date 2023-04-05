import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


import { AbstractExpenseApplication } from '../../abstracts/application-logics/abstract-expenses.application'
import { ExpensesDto } from '../../shared';

@ApiTags('Expenses')
@Controller('api/expenses')
export class ExpensesController {

    constructor(private _abstractExpenseApplication: AbstractExpenseApplication) { }

    @Get('current-amount')
    async getCurrentTotalAmountAsync(@Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._abstractExpenseApplication.getCurrentTotalAmountAsync();
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get('chart-data')
    async getChartDataAsync(@Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._abstractExpenseApplication.getPieChartDataAsync();
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get()
    async getAllExpenseDetailsAsync(@Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._abstractExpenseApplication.getAllExpensesAsync();
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get('/:expenseId')
    async getExpenseAsync(@Param() { expenseId }: any, @Res() response: Response) {
        try {
            const serviceResult = await this._abstractExpenseApplication.getExpenseAsync(expenseId);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('delete')
    async deleteExpensesAsync(@Body() expenseIds: string[], @Res() response: Response): Promise<any> {
        try {
            if (expenseIds && expenseIds.length > 0) {
                const deletedRes = await this._abstractExpenseApplication.deleteExpensesAsync(expenseIds);
                return response.status(deletedRes.statusCode).json(deletedRes);
            } else {
                return response.status(HttpStatus.BAD_REQUEST).json("Expense id's required.");
            }
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post()
    async saveExpensesAsync(@Body() expenses: ExpensesDto, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._abstractExpenseApplication.saveExpensesAsync(expenses);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Put()
    async updateExpenseAsync(@Body() expenses: ExpensesDto, @Res() response: Response): Promise<any> {
        try {
            const updatedResult = await this._abstractExpenseApplication.updateExpensesAsync(expenses);
            return response.status(updatedResult.statusCode).json(updatedResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }   
}
