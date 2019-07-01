import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Edit, Close } from '@material-ui/icons';
import { FormControl, InputLabel, Input, FormHelperText, TextField, Button, Card, CardContent } from '@material-ui/core';

const GlobalStyle = createGlobalStyle`
  body {
   font-family: 'Roboto', sans-serif
  }
`;

interface IData {
  label: string;
  input_type: string;
  placeholder: string;
  tag: string;
  value: string;
}

const App: React.FC = () => {
  const [form, setForm] = useState<IData[]>([]);
  const [source, setSource] = useState('');
  const [toggle, setToggle] = useState(false);

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

  const handleToggle = () => setToggle(!toggle);

  useEffect(() => {
    const data: IData[] = [
      { label: 'name', tag: 'input', input_type: 'text', placeholder: 'Enter your name', value: '' },
      { label: 'email', tag: 'input', input_type: 'email', placeholder: 'Enter your email address', value: '' },
      { label: 'message', tag: 'textarea', input_type: 'textarea', placeholder: 'Enter your message', value: '' },
    ];

    const api = new Promise<IData[]>(function(resolve, reject) {
      setTimeout(function() {
        return resolve(data);
      }, 300);
    });

    const fetchForm = async () => {
      const data = await api;
      setForm(data);
    };

    const hiddenDiv = document.getElementById('test') as HTMLDivElement;
    const api_key = hiddenDiv.dataset.key as string;
    // const myscript = document.getElementById('test') as HTMLScriptElement;
    // const source = myscript.src.match(/@(.*)\//) as RegExpMatchArray;
    // const api_key = source[1];
    setSource(api_key);

    fetchForm();

    return () => {};
  }, []);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      fab: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    })
  );
  const classes = useStyles();

  return (
    <Position>
      <GlobalStyle />

      {toggle ? (
        <Container className="App">
          <Wrapper>
            <Title>{source}</Title>
            <form>
              {form.map(item => (
                // <div key={item.label}>
                //   <Label>{item.label}</Label>
                //   {React.createElement(item.tag, { name: item.label, value: item.value, placeholder: item.placeholder, input_type: item.input_type, onChange: (event: any) => handleChange(event) }, null)}
                // </div>
                <TextField label={item.label} />
              ))}

              <Button onClick={() => handleSubmit()}> submit</Button>
            </form>
          </Wrapper>
        </Container>
      ) : (
        <div />
      )}

      {toggle ? (
        <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={() => handleToggle()}>
          <Close />
        </Fab>
      ) : (
        <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={() => handleToggle()}>
          <Edit />
        </Fab>
      )}
    </Position>
  );
};

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled(Card)`
  padding: 24px;
  width: 300px;
  height: 400px;
  background: rgb(252, 252, 252);
`;

const Wrapper = styled.div`
  border: 1px solid #ddd;
`;
const Position = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  text-align: right;
`;
const Label = styled.label`
  display: block;
`;

export default App;
