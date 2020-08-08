import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  command: {
    paddingLeft: '30px',
  },
});

function CommandItem({ row }) {
  const classes = useStyles();
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell colSpan={2} className={classes.command}>
        {row.name}
      </TableCell>
    </TableRow>
  );
}

export default CommandItem;
