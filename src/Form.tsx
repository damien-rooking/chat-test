import React, { FC } from 'react';
import styled from 'styled-components';
import { TextField, FormControl, InputLabel, Input, FormHelperText, makeStyles, Theme, createStyles, Button, CardActionArea, CardActions, Fab, Box, Container, Grid } from '@material-ui/core';

interface IProps {
  onClick: () => void;
}

const Form: FC<IProps> = ({ onClick }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      margin: {
        marginBottom: theme.spacing(2),
      },
      label: {
        fontSize: '12px',
      },
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
    <StyledContent>
      <TextField
        label="名前"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="会社名"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="メールアドレス"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="お問い合わせ内容"
        multiline
        fullWidth
        margin="normal"
        variant="outlined"
        rows="4"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Grid container justify="center">
        <Box mt={1}>
          <Button style={{ backgroundColor: '#e03770', color: '#fff', margin: '0 auto' }}>送信</Button>
        </Box>
      </Grid>
    </StyledContent>
  );
};

const StyledContent = styled.div`
  color: #595a5a;
  padding: 16px;
  margin: 0 auto;
  line-height: 1.5;
  letter-spacing: 1px;
  background-color: #fff;
  border-radius: 4px;
`;

export default Form;
