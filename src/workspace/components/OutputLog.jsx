import React, { useEffect, Fragment } from 'react';

function OutputLog({ data }) {
  useEffect(() => {
    const logDiv = document.getElementById('logDiv');
    logDiv.scrollTop = logDiv.scrollHeight;
  }, [data]);
  return (
    <div
      style={{
        maxHeight: '85%',
        overflowY: 'scroll',
      }}
      id="logDiv"
    >
      {data !== ''
        ? data.split('\n').map((line, index) => {
            if (index === 0) return null;
            return (
              <Fragment key={index}>
                <span>{line}</span>
                <br />
              </Fragment>
            );
          })
        : null}
    </div>
  );
}

export default OutputLog;
