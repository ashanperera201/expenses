import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ApplicationToast = (props: any): JSX.Element => {

    const { state, onClose } = props;

    return (
        <>
            <Snackbar open={state.open} autoHideDuration={8000} onClose={onClose}>
                <Alert onClose={onClose} severity={state.errorType} sx={{ width: '100%' }}>
                    {state.error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ApplicationToast;