import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, Grid, Paper, Box } from '@material-ui/core';
import ProjectItemCard from './ProjectItemCard';
import DashBoardHeader from './DashBoardHeader';
import Api from '../APIs/WebIDE';

const useStyles = makeStyles((theme) => ({
  root: {
    //	marginTop: 200,
  },
  paper: {
    height: '500px',
    width: '90%',
    margin: 'auto',
    overflow: 'auto',
    padding: '20px',
  },
}));

function DashBoardMain(props) {
  const classes = useStyles();
  const [projectList, setProjectList] = useState([]);

  const getProjectList = async () => {
    await Api({
      method: 'GET',
      url: '/projects',
    })
      .then(({ data }) => {
        console.log(data);
        setProjectList(data);
      })
      .catch((error) => {
        console.log('실패');
      });
  };

  useEffect(() => {
    getProjectList();
  }, []);

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
            {projectList.map((project, i) => {
              return (
                <ProjectItemCard
                  key={i}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  type={project.type}
                />
              );
            })}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default withRouter(DashBoardMain);
