import React from 'react';
import { makeStyles, Grid, Paper, Box } from '@material-ui/core';
import DashBoardCard from './DashBoardCard';
import DashBoardHeader from './DashBoardHeader';

const useStyles = makeStyles((theme) => ({
	root: {
		//	marginTop: 200,
	},
	paper: {
		height: 500,
		width: 1400,
		margin: 'auto',
		overflow: 'auto',
	},
}));

function DashBoardMain(props) {
	const classes = useStyles();

	return (
		<div>
			<DashBoardHeader />
			<Box className={classes.root}>
				<Paper className={classes.paper} variant={'outlined'}>
					<Grid
						container
						direction={'row'}
						justify={'center'}
						alignItems={'center'}
					>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
						<DashBoardCard></DashBoardCard>
					</Grid>
				</Paper>
			</Box>
		</div>
	);
}

export default DashBoardMain;
