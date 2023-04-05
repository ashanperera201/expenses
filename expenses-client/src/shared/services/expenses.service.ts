import apiKit from '../helpers/axios-http-kit';

export const getAllExpenses = (): Promise<any> => {
    return apiKit.get(`/api/expenses`);
};

export const saveExpense = (payload: any): Promise<any> => {
    return apiKit.post(`/api/expenses`, payload);
}

export const updateExpense = (payload: any): Promise<any> => {
    return apiKit.put(`/api/expenses`, payload)
}

export const deleteExpenses = (payload: any): Promise<any> => {
    return apiKit.post(`/api/expenses/delete`, payload);
}

export const getChartData = (): Promise<any> => { 
    return apiKit.get(`/api/expenses/chart-data`);
}

export const getCurrentAmount = (): Promise<any> => {
    return apiKit.get(`/api/expenses/current-amount`);
}