import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { Card, CssBaseline, CardContent, Typography, CardActionArea, CardActions } from '@material-ui/core';
import Bar from './Bar';
import Starter from './Starter';
import Form from './Form';

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
      card: {
        backgroundColor: '#f9f9f9 !important',
        height: 480,
        overflow: 'visible',
        borderRadius: '4px 4px 0 0',
      },
      content: {
        overflowY: 'scroll',
        height: 'calc(480px - 72px - 27px)',
      },
      subtitle: {
        fontSize: '12px',
        margin: '24px 0 8px 0',
      },
    })
  );
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <ClickAwayListener onClickAway={handleToggle}>
        <StyledPosition toggle={toggle}>
          <GlobalStyle />
          <Card className={classes.card}>
            <Bar isOpen={toggle} onClick={() => handleToggle()} />
            <CardContent className={classes.content}>
              <Starter />
              <Starter />
              <StyledFormContainer>
                <Typography className={classes.subtitle} variant="subtitle2" color="textSecondary">
                  お問い合わせ
                </Typography>
                <Form onClick={() => handleSubmit()} />
              </StyledFormContainer>
            </CardContent>
            <CardActionArea>
              <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <StyledSmall>Powered By</StyledSmall>
                <svg style={{ marginLeft: '4px' }} width="50" height="10" viewBox="0 0 594 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.0272 104.514L14.7743 56.9455L37.768 57.6185L25.0272 104.514Z" fill="black" />
                  <ellipse rx="26.0879" ry="27.4989" transform="matrix(0.999572 0.0292567 -0.0263291 0.999653 26.4357 33.0271)" fill="white" />
                  <ellipse rx="12.3325" ry="12.4995" transform="matrix(0.999572 0.0292567 -0.0263291 0.999653 39.7636 13.4097)" fill="#4AC4F3" />
                  <path
                    d="M106.215 98H127.03L97.82 17.27H75.05L45.84 98H66.425L71.255 83.74H101.385L106.215 98ZM96.325 68.56H76.43L86.32 39.005L96.325 68.56ZM135.92 98H155.585V17.27H135.92V98ZM228.486 73.965C228.486 46.94 188.581 53.265 188.581 39.235C188.581 34.175 192.146 31.76 196.861 31.875C202.151 31.99 205.831 35.095 206.176 40.27H227.451C226.646 24.86 214.801 16.12 197.206 16.12C180.301 16.12 167.766 24.63 167.766 39.925C167.536 68.56 207.901 60.51 207.901 75.46C207.901 80.175 204.221 83.05 198.471 83.05C192.951 83.05 189.041 80.06 188.466 73.85H167.536C168.111 90.18 181.681 98.805 199.046 98.805C217.906 98.805 228.486 87.535 228.486 73.965ZM243.693 75.69C243.693 92.365 253.008 98 266.348 98H276.353V81.325H269.338C264.968 81.325 263.358 79.715 263.358 75.92V50.16H276.238V33.83H263.358V18.19H243.693V33.83H235.873V50.16H243.693V75.69ZM306.972 68.215C306.972 57.175 312.377 53.955 321.692 53.955H327.097V33.14C318.472 33.14 311.457 37.74 306.972 44.525V33.83H287.307V98H306.972V68.215ZM364.786 48.665C371.341 48.665 376.861 52.69 376.861 59.705H352.251C353.401 52.575 358.346 48.665 364.786 48.665ZM395.491 76.725H374.561C372.951 80.175 369.846 82.935 364.326 82.935C358.001 82.935 352.826 79.025 352.136 70.63H396.641C396.871 68.675 396.986 66.72 396.986 64.88C396.986 45.33 383.761 32.91 365.016 32.91C345.926 32.91 332.586 45.56 332.586 65.915C332.586 86.27 346.156 98.92 365.016 98.92C381.001 98.92 392.386 89.26 395.491 76.725ZM403.45 65.8C403.45 86.04 415.985 98.92 431.625 98.92C441.17 98.92 447.955 94.55 451.52 88.915V98H471.185V33.83H451.52V42.915C448.07 37.28 441.285 32.91 431.74 32.91C415.985 32.91 403.45 45.56 403.45 65.8ZM451.52 65.915C451.52 76.15 444.965 81.785 437.49 81.785C430.13 81.785 423.46 76.035 423.46 65.8C423.46 55.565 430.13 50.045 437.49 50.045C444.965 50.045 451.52 55.68 451.52 65.915ZM573.847 98H593.397V60.51C593.397 43.26 583.162 33.14 567.292 33.14C557.977 33.14 549.927 38.315 545.672 45.1C541.302 37.395 533.482 33.14 523.822 33.14C515.427 33.14 508.872 36.705 505.077 41.88V33.83H485.412V98H505.077V63.155C505.077 54.76 509.907 50.16 517.382 50.16C524.857 50.16 529.687 54.76 529.687 63.155V98H549.237V63.155C549.237 54.76 554.067 50.16 561.542 50.16C569.017 50.16 573.847 54.76 573.847 63.155V98Z"
                    fill="black"
                  />
                </svg>
              </CardActions>
            </CardActionArea>
          </Card>
        </StyledPosition>
      </ClickAwayListener>
    </>
  );
};

const StyledSmall = styled.small``;

const StyledPosition = styled.div<{ toggle: boolean }>`
  position: fixed;
  width: 330px;
  bottom: ${(props: any) => (props.toggle ? '0' : 'calc(-1 * (480px - 72px))')};
  right: 8px;
  text-align: left;
  font-family: 'Open sans', sans-serif;
  z-index: 999;
  transition: bottom 0.4s ease 0s !important;
`;

const StyledFormContainer = styled.div`
  margin: 8px 4px;
`;

export default App;
