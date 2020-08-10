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
    console.log(event);
  };
  const handleEditItemClick = (event) => {
    console.log(event);
  };
  const handleProjectItemClick = (event) => {
    console.log(event);
  };

  return (
    <div className={classes.root}>
      <MenuItem
        title={
          <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            울림 IDE
          </div>
        }
        type="menuBar"
        MenuItems={[]}
      />
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
        type="menuBar"
      />
      <MenuItem
        title="Edit"
        handleItemClick={handleEditItemClick}
        MenuItems={[{ name: 'Find' }, { name: 'Replace' }]}
        type="menuBar"
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
        type="menuBar"
      />
    </div>
  );
}
export default MenuBar;
