import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

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

//찾기부분
const Find = withStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

// 바꾸기 부분
const Replace = withStyles((theme) => ({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

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
      position: 'absolute',
      right: '8px',
    },
    '&#arrow': {
      padding: 4,
    },
  },

  accordianDiv: {
    // padding: '4px 5px',
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
  },
}));

function EditBar({ open, handleClose, type }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(
    type === 'find' ? false : true,
  );
  const toggle = () => {
    setExpanded((expanded) => !expanded);
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
          <Accordion square expanded={expanded}>
            <Find>
              <div className={classes.accordianDiv}>
                <Input className={classes.input} />
                <div id="result" style={{ display: 'inline-block' }}>
                  결과 없음
                </div>
              </div>
              <Button className={classes.Btn} id="arrow">
                <ArrowUpwardIcon />
              </Button>
              <Button className={classes.Btn} id="arrow">
                <ArrowDownwardIcon />
              </Button>
              <Button onClick={handleClose} className={classes.Btn} id="close">
                <CloseIcon />
              </Button>
            </Find>
            <Replace>
              <div className={classes.accordianDiv}>
                <Input className={classes.input} />
                <div style={{ display: 'inline-block' }}>변경</div>
                &nbsp;<div style={{ display: 'inline-block' }}>전체 변경</div>
              </div>
            </Replace>
          </Accordion>
        </div>
      </Snackbar>
    </>
  );
}

export default EditBar;
