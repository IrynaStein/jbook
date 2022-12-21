import { useState, useEffect } from 'react';
import Resizable from './resizable';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState<string>('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={'//happy hacking...'}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        {/* iframe sandbox property set to an empty string blocks access even from the same origin (parent <=> child) */}
        {/* iframe with sandbox property omitted or set to 'allow-same-origin' allows communitcation between child and parent */}
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
