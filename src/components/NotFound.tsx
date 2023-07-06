import React from 'react';
import { NotFoundProps } from '../common/interfaces';


const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  const errorMessage = text === "Error" ? (
    <>
      <h1>aww snap!</h1>
      <p>I think github throttled us.</p>
    </>
  ) : (
    <>
      <h1>{text} Not Found</h1>
      <p>The requested {text} does not exist.</p>
    </>
  );

  return <div style={{ textAlign: 'center', color: text === "Error" ? 'red' : 'inherit' }}>{errorMessage}</div>;
}

export default NotFound;
