import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';

interface IData {
  label: string;
  type: string;
  placeholder: string;
  input: string;
  value: string;
}

const App: React.FC = () => {
  const [form, setForm] = useState<IData[]>([]);
  const [source, setSource] = useState('');

  const handleChange = ({ target }: { target: { name: string; value: string } }) => {
    let updatedForm = [...form];
    const updatedItem = updatedForm.find(item => item.label === target.name) as IData;
    updatedItem.value = target.value;
    setForm(updatedForm);
  };

  const handleSubmit = () => {
    console.log('form', form);
    axios.post('http://localhost:8000/inquiries', form).then(response => console.log(response));
  };

  useEffect(() => {
    const data: IData[] = [
      { label: 'name', input: 'input', type: 'text', placeholder: 'Enter your name', value: '' },
      { label: 'email', input: 'input', type: 'email', placeholder: 'Enter your email address', value: '' },
      { label: 'message', input: 'textarea', type: 'textarea', placeholder: 'Enter your message', value: '' },
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
            {React.createElement(item.input, { name: item.label, value: item.value, placeholder: item.placeholder, type: item.type, onChange: (event: any) => handleChange(event) }, null)}
          </div>
        ))}
        <button type="button" onClick={() => handleSubmit()}>
          submit
        </button>
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
