import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import fileAPIs from '../APIs/fileAPIs';
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
});

function FileTree({ directoryId, setCurrentInfo, currentFile }) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [selectedId, setselectedId] = useState('1');

  useEffect(() => {
    fileAPIs
      .get('/files')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setData(test);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (currentFile.id === null) setselectedId('1');
  }, [currentFile]);

  // 파일, 폴더 새로 생성됐을때 , openfiletab에서 현재와 다른 파일 tab 선택했을때 filetree select값 변경
  useEffect(() => {
    if (currentFile.id !== null && String(currentFile.id) !== selectedId) {
      // 파일선택하다가 폴더 선택했을때 두개 select되는거 방지
      if (String(directoryId) !== selectedId)
        setselectedId(String(currentFile.id));
    }
  }, [currentFile, selectedId, directoryId]);

  const handleClick = (e) => {
    setselectedId(String(e.id));
    setCurrentInfo(e);
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={String(nodes.id)}
      nodeId={String(nodes.id)}
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
      defaultExpanded={['1']}
      selected={selectedId}
      defaultExpandIcon={'+'}
    >
      {data !== null ? renderTree(data) : null}
    </TreeView>
  );
}

export default FileTree;
