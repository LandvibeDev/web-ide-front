import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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

function FileTree({ directoryId, setCurrentInfo, currentFile, files }) {
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState('1');

  useEffect(() => {
    if (currentFile.id === null) setSelectedId('1');
  }, [currentFile]);

  // 파일, 폴더 새로 생성됐을때 , openfiletab에서 현재와 다른 파일 tab 선택했을때 filetree select값 변경
  useEffect(() => {
    if (currentFile.id !== null && String(currentFile.id) !== selectedId) {
      // 파일선택하다가 폴더 선택했을때 두개 select되는거 방지
      if (String(directoryId) !== selectedId)
        setSelectedId(String(currentFile.id));
    }
  }, [currentFile, selectedId, directoryId]);

  const handleClick = (e) => {
    if (String(e.id) !== selectedId) {
      setSelectedId(String(e.id));
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
      selected={selectedId}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {files !== null ? renderTree(files) : renderTree(test)}
    </TreeView>
  );
}

export default FileTree;
