import React from 'react';
import { NotFoundProps } from '../common/interfaces';


const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{text} Not Found</h1>
      <p>The requested {text} does not exist.</p>
    </div>
  );
}

export default NotFound;
