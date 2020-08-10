import React from 'react';
function Editor(props) {
  const { file } = props;

  return <div>{file !== null ? file.contents : null}</div>;
}

export default Editor;
