import * as React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ExpensesForm from './expenses-form';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getAllExpenses, deleteExpenses } from '../../shared/services/expenses.service';

const headers = ['Expense Amount', 'Description', 'Expense Date', 'Expense Type', 'Active', 'Actions'];

export default function Expenses() {

    const [viewExpenseForm, setViewExpenseForm] = React.useState<boolean>(false);
    const [results, setResults] = React.useState<any[]>([]);
    const [formData, setFormData] = React.useState<any>({});
    const [types, setTypes] = React.useState<any[]>();


    React.useEffect(() => {
        setTypes([
            { id: '1', type: 'Food' },
            { id: '2', type: 'Movies' },
            { id: '3', type: 'Online Subscription' },
            { id: '4', type: 'Traveling' },
        ]);

        fetchExpenses()
    }, [])

    const filterTypes = (id: string) => types?.find(x => x.id === id)?.type;

    const fetchExpenses = async (): Promise<void> => {
        try {
            const result = (await getAllExpenses())?.data;
            setResults(result?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const onClose = async (): Promise<void> => {
        await fetchExpenses();
        setViewExpenseForm(!viewExpenseForm);
    }

    const onEditHandler = (data: any): void => {
        setFormData(data);
        setViewExpenseForm(!viewExpenseForm);
    }

    const onDeletion = async (id: string[]) => {
        try {
            const result = (await deleteExpenses(id));
            await fetchExpenses();
            if (result) {
                console.log('SHOW TOAST');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onOpenForm = (): void => {
        setFormData(null)
        setViewExpenseForm(!viewExpenseForm);
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 400 }} gutterBottom>
                    Expenses List
                </Typography>

                <Button variant="contained" onClick={onOpenForm}>Add Expense</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header, i) => (
                                <TableCell align='left' key={i}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (results && results.length > 0) && (
                                <>
                                    {results.map((row, i) => (
                                        <TableRow key={i}                                        >
                                            <TableCell align="left">{row?.expenseAmount}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="left">{row.expenseDate}</TableCell>
                                            <TableCell align="left">{filterTypes(row?.expenseType)}</TableCell>
                                            <TableCell align="left">{row.isActive ?
                                                (<span style={{ fontWeight: 'bold', color: 'green' }}>Active</span>) :
                                                (<span style={{ fontWeight: 'bold', color: 'red' }}>In Active</span>)}</TableCell>
                                            <TableCell align="left">
                                                <Box>
                                                    <IconButton aria-label="delete" onClick={() => onDeletion([row._id])}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="edit" onClick={() => onEditHandler(row)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <>
                {
                    viewExpenseForm && (
                        <ExpensesForm open={viewExpenseForm} onClose={onClose} formData={formData} />
                    )
                }
            </>

        </>
    );
}
