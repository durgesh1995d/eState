import React, {useEffect, useRef} from 'react';

const PrevState = (props) => {
  const prevRef = useRef(null);
  useEffect(() => {
    prevRef.current = props;
  }, [props]);
  return prevRef.current;
};

export default PrevState;
