import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { CommandItem } from './';

const rows = [
  { id: 0, name: 'build' },
  { id: 1, name: 'run' },
  { id: 2, name: 'custom01' },
  { id: 3, name: 'custom02' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
  },
  addBtn: { width: '30px', paddingRight: '20px' },
});

function CommandList() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={'name'} className={classes.command}>
                Build Command
              </TableCell>
              <TableCell key={'add'} className={classes.addBtn}>
                <Button variant="outlined">
                  <AddIcon color="primary" />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return <CommandItem row={row} key={row.id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CommandList;
