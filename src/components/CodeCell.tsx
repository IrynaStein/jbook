import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState<string>('');

  const clickHandler = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue={'//happy hacking...'}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={clickHandler}>Submit</button>
      </div>
      {/* iframe sandbox property set to an empty string blocks access even from the same origin (parent <=> child) */}
      {/* iframe with sandbox property omitted or set to 'allow-same-origin' allows communitcation between child and parent */}
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
