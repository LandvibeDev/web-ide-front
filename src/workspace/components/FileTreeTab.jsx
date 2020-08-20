import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

import { MenuItem } from '.';
import { CreateFileDialog } from './Dialog';

import fileAPIs from '../../common/APIs/fileAPIs';
const useStyles = makeStyles((theme) => ({
  root: {},
}));

function FileTreeTab({ directoryId, setCurrentInfo, getFiles }) {
  const [isFileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileType, setFileType] = useState(null);
  const classes = useStyles();

  const handleFileTreeTabClick = (name) => {
    if (name === 'New File') {
      setFileType('file');
    } else if (name === 'New Folder') {
      setFileType('directory');
    }
    setFileDialogOpen(true);
  };

  const handleFileDialogClose = () => {
    setFileDialogOpen(false);
    setFileType(null);
  };

  const handleFileDialogSubmit = (value) => {
    // TODO: create a file request
    fileAPIs
      .post('file', {
        name: value,
        type: fileType,
        permission: 777,
        parentId: directoryId,
        contents: '',
      })
      .then((res) => {
        setCurrentInfo(res.data);
        getFiles();
      })
      .catch((error) => {
        console.log(error);
      });
    setFileDialogOpen(false);
  };

  return (
    <div>
      {fileType !== null && (
        <CreateFileDialog
          open={isFileDialogOpen}
          handleClose={handleFileDialogClose}
          handleSubmit={handleFileDialogSubmit}
          type={fileType}
        />
      )}
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <MenuItem
            title={<AddIcon color="primary" />}
            handleItemClick={handleFileTreeTabClick}
            MenuItems={[{ name: 'New File' }, { name: 'New Folder' }]}
            type="fileTreeTab"
          />
        </Grid>
        <Grid item>
          <Button variant="outlined">
            <RefreshIcon color="primary" />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default FileTreeTab;
