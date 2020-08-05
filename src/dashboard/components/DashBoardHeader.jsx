import React, { useState } from 'react';
import { makeStyles, Grid, Box, Button } from '@material-ui/core';
import CreateDialog from '../dialog/CreateDialog';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 50,
		marginBottom: 10,
	},
	paper: {
		height: 50,
		width: 1400,
		margin: 'auto',
		overflow: 'auto',
	},
}));

function DashBoardHeader(props) {
	const classes = useStyles();

	const [openCreate, setOpenCreate] = useState(false);

	const onClickCreate = () => {
		setOpenCreate(true);
	};
	const onClickCloseCreate = () => {
		setOpenCreate(false);
	};

	return (
		<Box className={classes.root}>
			<Grid
				className={classes.paper}
				container
				justify={'flex-start'}
				alignItems={'center'}
			>
				<img src='' alt='logo' />
			</Grid>
			<Grid
				className={classes.paper}
				container
				justify={'flex-end'}
				alignItems={'center'}
			>
				<Button
					size='medium'
					variant='contained'
					color='primary'
					onClick={onClickCreate}
				>
					Create Project
				</Button>
			</Grid>
			<CreateDialog
				openCreate={openCreate}
				onClickCloseCreate={onClickCloseCreate}
			/>
		</Box>
	);
}

export default DashBoardHeader;
