import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { placeholder } from '@babel/types';

interface IData {
  label: string;
  type: string;
  placeholder: string;
  input: string;
}

const App: React.FC = () => {
  const [form, setForm] = useState<IData[]>([]);
  const [source, setSource] = useState('');

  useEffect(() => {
    const data: IData[] = [
      { label: 'name', input: 'input', type: 'text', placeholder: 'Enter your name' },
      { label: 'email', input: 'input', type: 'email', placeholder: 'Enter your email address' },
      { label: 'message', input: 'textarea', type: 'textarea', placeholder: 'Enter your message' },
    ];

    const api = new Promise<IData[]>(function(resolve, reject) {
      setTimeout(function() {
        return resolve(data);
      }, 3000);
    });

    const fetchForm = async () => {
      const data = await api;
      setForm(data);
    };

    const myscript = document.getElementById('test') as HTMLScriptElement;
    const source = myscript.src.match(/@(.*)\//) as RegExpMatchArray;
    const api_key = source[1];
    setSource(api_key);

    fetchForm();

    return () => {};
  }, []);

  return (
    <Container className="App">
      <Title>{source}</Title>
      <form>
        {form.map(item => (
          <div key={item.label}>
            <label>{item.label}</label>
            {React.createElement(item.input, { placeholder: item.placeholder, type: item.type }, null)}
          </div>
        ))}
      </form>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 24px;
  border: 1px solid;
`;

export default App;
