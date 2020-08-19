import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedId } from '../modules/reducers';

const test = {
  id: '1',
  name: 'Project',
  children: [
    {
      id: '2',
      name: 'src',
      type: 'directory',
      permission: 777,
      children: [
        {
          id: '3',
          name: 'test1.js',
          type: 'file',
          permission: 777,
        },
        {
          id: '4',
          name: 'test2.js',
          type: 'file',
          permission: 777,
        },
      ],
    },
    {
      id: '5',
      name: 'node_modules',
      type: 'directory',
      permission: 777,
      children: [],
    },
    {
      id: '6',
      name: 'package.json',
      type: 'file',
      permission: 777,
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  icon: {
    paddingRight: 3,
    fontSize: '0.9rem',
  },
});

function FileTree({ setCurrentInfo, files }) {
  const classes = useStyles();

  const selectedId = useSelector((state) => state.selectedId);
  const dispatch = useDispatch();
  const onSetSelectedId = (id) => dispatch(setSelectedId(id));

  const handleClick = (e) => {
    if (e.id !== selectedId) {
      onSetSelectedId(e.id);
      setCurrentInfo(e);
    }
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={String(nodes.id)}
      nodeId={String(nodes.id)}
      label={
        <span>
          {nodes.type === 'file' ? (
            <DescriptionIcon className={classes.icon} color="primary" />
          ) : (
            <FolderIcon className={classes.icon} color="disabled" />
          )}
          {nodes.name}
        </span>
      }
      onClick={() => handleClick(nodes)}
    >
      {Array.isArray(nodes.children) &&
        nodes.children.map((node) => renderTree(node))}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['1']}
      selected={String(selectedId)}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {files !== null ? renderTree(files) : renderTree(test)}
    </TreeView>
  );
}

export default FileTree;
