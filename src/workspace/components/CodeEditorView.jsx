import React from 'react';
function CodeEditorView(props) {
  const { fileName } = props;

  return <div>{fileName}</div>;
}

export default CodeEditorView;
