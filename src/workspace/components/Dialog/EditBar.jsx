import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MuiAccordion from '@material-ui/core/Accordion';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import { FindForm, ReplaceForm } from './';

//찾기, 바꾸기 모두 감싸는 부분
const Accordion = withStyles({
  root: {
    borderLeft: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    borderTopRightRadius: '0.2rem',
    borderBottomRightRadius: '0.2rem',
    minWidth: '350px ',

    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: '0px !important',
  },
})(MuiAccordion);

const useStyles = makeStyles((theme) => ({
  bar: { top: 100, right: 50 },
  barDiv: {
    display: 'flex',
    border: '1px solid rgba(0, 0, 0, .125)',
    borderRadius: '0.2rem',
  },
  Btn: {
    minWidth: '24px',
    margin: 0,
    padding: 0,
    '&#expand': {
      display: 'flex',
    },
    '&#close': {
      padding: 4,
      marginLeft: 8,
    },
    '&#subBtn': {
      padding: 4,
    },
  },
  input: {
    padding: '0px !important',
    marginRight: '8px',
    backgroundColor: 'rgba(100,100,100,.125)',
    '&.MuiInput-underline:after': {
      borderBottom: '0',
    },
    '&.MuiInput-underline:before': {
      borderBottom: '0',
    },
    '&.MuiInput-underline>input': {
      padding: '6px 7px',
    },
  },
}));

function EditBar({ open, handleClose, type }) {
  const classes = useStyles();
  const findRef = useRef();
  const replaceRef = useRef();
  const [expanded, setExpanded] = React.useState(
    type === 'find' ? false : true,
  );
  const toggle = () => {
    setExpanded((expanded) => !expanded);
  };

  //EditBar 켜질때 input에 Focus 이동
  useEffect(() => {
    if (expanded) {
      replaceRef.current.focus();
    } else {
      findRef.current.focus();
    }
  }, [expanded]);
  useEffect(() => {
    if (type === 'replace') {
      setExpanded(true);
      replaceRef.current.focus();
    } else findRef.current.focus();
  }, [type]);

  const handleTabKeyDown = () => {
    replaceRef.current.focus();
  };
  return (
    <>
      <Snackbar
        className={classes.bar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        key={'TopRight'}
      >
        <div className={classes.barDiv}>
          <Button onClick={toggle} className={classes.Btn} id="expand">
            {expanded ? <ChevronRightIcon /> : <ExpandMoreIcon />}
          </Button>
          <Accordion expanded={expanded}>
            <FindForm
              handleClose={handleClose}
              handleTabKeyDown={handleTabKeyDown}
              findRef={findRef}
              useStyles={useStyles}
              expanded={expanded}
            />
            <ReplaceForm replaceRef={replaceRef} useStyles={useStyles} />
          </Accordion>
        </div>
      </Snackbar>
    </>
  );
}

export default EditBar;
