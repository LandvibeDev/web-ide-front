import React from 'react';
import { useSelector } from 'react-redux';
import { CodeEditor } from '../components';

function CurrentFileContainer() {
  const { name, openFiles } = useSelector((state) => ({
    name: state.currentFileName,
    openFiles: state.openFiles,
  }));
  return <CodeEditor fileName={name} openFiles={openFiles} />;
}

export default CurrentFileContainer;
