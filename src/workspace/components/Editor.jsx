import React from 'react';
function Editor(props) {
  const { fileName } = props;

  return <div>{fileName}</div>;
}

export default Editor;
