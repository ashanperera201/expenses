import React from 'react';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ApplicationToast from '../../shared/components/application-toast';
import ApplicationDialogTitle from '../../shared/components/application-dialog-title';
import { saveExpense, updateExpense, getCurrentAmount } from '../../shared/services/expenses.service';
import { IExpenseForm } from '../../shared/interfaces/expense-form.interface';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ExpensesForm = (props: any): JSX.Element => {

    const { formData } = props;

    const [types, setTypes] = React.useState<any[]>();
    const [currentTotalExpense, setCurrentTotalExpense] = React.useState<any>();

    const [toastState, setToastState] = React.useState<any>({ error: '', open: false, errorType: 'success' });

    const openSnack = (errorMessage: string, errorType: 'success' | 'info' | 'warning' | 'error') => {
        setToastState({ error: errorMessage, open: true, errorType: errorType });
    };

    const onClose = (): void => {
        setToastState({ error: '', open: false, errorType: 'success' });
    }


    const [form, setForm] = React.useState<IExpenseForm>({
        description: '',
        expenseDate: undefined,
        expenseType: '',
        expenseAmount: 0,
    });

    React.useEffect(() => {
        setTypes([
            { id: '1', type: 'Food' },
            { id: '2', type: 'Movies' },
            { id: '3', type: 'Online Subscription' },
            { id: '4', type: 'Traveling' },
        ]);

        fetchCurrentTotalExpense();

        if (formData) {
            setForm({
                description: formData?.description,
                expenseDate: new Date(formData?.expenseDate),
                expenseType: formData?.expenseType,
                expenseAmount: +formData?.expenseAmount,
            })
        } else {
            setForm({
                description: '',
                expenseDate: undefined,
                expenseType: '',
                expenseAmount: 0,
            })
        }

        return () => {
            setForm({
                description: '',
                expenseDate: undefined,
                expenseType: '',
                expenseAmount: 0,
            })
        }
    }, [formData]);

    const fetchCurrentTotalExpense = async (): Promise<any> => {
        setCurrentTotalExpense(((await getCurrentAmount())?.data)?.data?.currentCount);
    }

    const isFormValid = (): boolean => (form && form.expenseDate && form.expenseType) ? true : false;

    const onSave = async () => {
        try {
            if (isFormValid()) {
                if (form.expenseAmount < 10000 && currentTotalExpense < 10000) {
                    const savedResult = await saveExpense(form);
                    if (savedResult) {
                        openSnack('Successfully saved.', 'success');
                    }
                } else {
                    openSnack('Expense amount has exceeded', 'error');
                }
            } else {
                openSnack('Invalid Form', 'error');
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            const timeRef = setTimeout(() => {
                handleClose();
                clearTimeout(timeRef);
            }, 1000);
        }
    };

    const onUpdate = async () => {
        try {
            if (isFormValid()) {
                if (form.expenseAmount < 10000 && currentTotalExpense < 10000) {
                    formData.description = form?.description;
                    formData.expenseDate = new Date(form.expenseDate!);
                    formData.expenseType = form?.expenseType;
                    formData.expenseAmount = +form?.expenseAmount;

                    const updatedResult = await updateExpense(formData);
                    if (updatedResult) {
                        openSnack('Successfully updated.', 'success');
                    }
                } else {
                    openSnack('Expense amount has exceeded', 'error');
                }
            } else {
                openSnack('Invalid Form', 'error');
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            const timeRef = setTimeout(() => {
                handleClose();
                clearTimeout(timeRef);
            }, 1000);
        }
    }

    const handleClose = (): void => {
        props?.onClose();
    }

    const onExpenseAmountChange = (e: any): void => {
        const expenseAmount = e.target.value;
        setForm({ ...form, expenseAmount: e.target.value && !(+e.target.value < 0) ? +e.target.value : 0 })
        if (expenseAmount > 10000 && currentTotalExpense > 10000) {
            openSnack('Expense amount has exceeded', 'error');
        }
    }

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                open={props?.open}
                fullWidth={true}
                maxWidth={'xs'}
            >
                <ApplicationDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {formData ? 'Update Expense' : 'Create Expense'}
                </ApplicationDialogTitle>
                <DialogContent dividers sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <TextField
                        required
                        placeholder='Description'
                        maxRows={10}
                        label="Description"
                        fullWidth
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e?.target?.value ? e?.target?.value : '' })}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{ width: '100%' }}
                            value={form?.expenseDate ? dayjs(form?.expenseDate) : null}
                            onChange={(e) => setForm({ ...form, expenseDate: e ? new Date(e.toDate()) : undefined })}
                        />
                    </LocalizationProvider>

                    <Select
                        fullWidth
                        placeholder='Type'
                        displayEmpty
                        value={form.expenseType}
                        onChange={(e) => setForm({ ...form, expenseType: e?.target?.value ? e.target.value : '' })}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            types?.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item?.type}</MenuItem>
                            ))
                        }
                    </Select>

                    <TextField
                        required
                        label="Expense Amount"
                        placeholder='Expense Amount'
                        maxRows={10}
                        type='number'
                        fullWidth
                        value={form.expenseAmount}
                        onChange={onExpenseAmountChange}
                    />
                </DialogContent>
                <DialogActions>
                    {
                        formData ? (
                            <>
                                <Button autoFocus onClick={onUpdate}>
                                    Update changes
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button autoFocus onClick={onSave}>
                                    Save changes
                                </Button>
                            </>
                        )
                    }

                </DialogActions>
            </BootstrapDialog>

            <ApplicationToast state={toastState} onClose={onClose} />
        </>
    )
}

export default ExpensesForm;