import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import { useDispatch } from 'react-redux';
import { selectFile } from '../modules/reducers';

const data = {
  id: 'root',
  name: 'Project',
  children: [
    {
      id: '1',
      name: 'public',
      type: 'directory',
    },
    {
      id: '3',
      name: 'src',
      type: 'directory',
      children: [
        {
          id: '4',
          name: 'App.js',
          type: 'file',
        },
        {
          id: '5',
          name: 'index.js',
          type: 'file',
        },
        {
          id: '6',
          name: 'App.css',
          type: 'file',
        },
        {
          id: '7',
          name: 'App.test.js',
          type: 'file',
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

function FileTree(props) {
  const classes = useStyles();

  // redux로 codeEditor에 보여질 파일관리
  const dispatch = useDispatch();
  const onSelectFile = (name) => dispatch(selectFile(name));

  const handleClick = (e) => {
    if (e.type === 'file') {
      onSelectFile(e.name);
    }
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => handleClick(nodes)}
    >
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

export default FileTree;
