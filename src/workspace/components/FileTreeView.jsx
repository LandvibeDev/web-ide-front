import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

const data = {
  id: 'root',
  name: 'Project',
  children: [
    {
      id: '1',
      name: 'public',
    },
    {
      id: '3',
      name: 'src',
      children: [
        {
          id: '4',
          name: 'App.js',
        },
        {
          id: '5',
          name: 'index.js',
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

function FileTreeView(props) {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={'>'}
      defaultExpanded={['root']}
      defaultExpandIcon={'+'}
    >
      {renderTree(data)}
    </TreeView>
  );
}

export default FileTreeView;
