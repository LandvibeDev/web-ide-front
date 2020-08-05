import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	DialogActions,
	Button,
} from '@material-ui/core';

function CreateDialog(props) {
	return (
		<Dialog
			open={props.openCreate}
			onClose={props.onClickCloseCreate}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle>Option</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='projectName'
					label='Project Name'
					type='name'
				/>
				<TextField
					autoFocus
					margin='dense'
					id='description'
					label='Description'
					type='text'
					fullWidth
				/>
				<img src='' alt='Node.js logo' />
				<InputLabel>Version</InputLabel>
				<Select value={'12.x.x'} label='Version'>
					<MenuItem value={'12.x.x'}>12.x.x</MenuItem>
					<MenuItem value={'11.x.x'}>11.x.x</MenuItem>
					<MenuItem value={'10.x.x'}>10.x.x</MenuItem>
				</Select>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={props.onClickCloseCreate}
					color='primary'
					variant='contained'
				>
					Create
				</Button>
				<Button
					onClick={props.onClickCloseCreate}
					color='secondary'
					autoFocus
					variant='contained'
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default CreateDialog;
