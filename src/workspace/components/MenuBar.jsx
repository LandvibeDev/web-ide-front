import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MenuItem } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function MenuBar(props) {
  const classes = useStyles();

  const handleFileItemClick = (event) => {
    console.log(event.target);
  };
  const handleEditItemClick = (event) => {
    console.log(event.target);
  };
  const handleProjectItemClick = (event) => {
    console.log(event.target);
  };

  return (
    <div className={classes.root}>
      <MenuItem
        title="File"
        handleItemClick={handleFileItemClick}
        MenuItems={[
          { name: 'New File' },
          { name: 'New Folder' },
          { name: 'Save' },
          { name: 'Save as' },
          { name: 'Delete' },
          { name: 'Rename' },
          { name: 'File Upload' },
        ]}
      />
      <MenuItem
        title="Edit"
        handleItemClick={handleEditItemClick}
        MenuItems={[{ name: 'Find' }, { name: 'Replace' }]}
      />
      <MenuItem
        title="Project"
        handleItemClick={handleProjectItemClick}
        MenuItems={[
          { name: 'Build' },
          { name: 'Run' },
          { name: 'Refresh' },
          { name: 'Configure Environment' },
        ]}
      />
    </div>
  );
}
export default MenuBar;
