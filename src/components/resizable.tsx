import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerHeight * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 200,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 25],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
