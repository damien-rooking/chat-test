import React from 'react';
import styled from 'styled-components';
import { CardHeader, IconButton, makeStyles, Theme, createStyles, Icon } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import Maximize from '@material-ui/icons/Maximize';
import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
interface IProps {
  isOpen: boolean;
  onClick: () => void;
}
const Bar: React.FC<IProps> = ({ onClick, isOpen }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      header: {
        backgroundColor: '#E03770',
        color: '#fff',
        position: 'relative',
        borderRadius: '4px 4px 0 0',
        paddingLeft: 60,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s ease 0s !important',
      },
      icon: {
        color: '#fff',
      },
    })
  );
  const classes = useStyles();
  return (
    <CardHeader
      className={classes.header}
      onClick={onClick}
      avatar={<StyledImage src="https://d223inzzioa7u0.cloudfront.net/src/img/chatbot.svg" alt="" />}
      action={
        <IconButton classes={isOpen ? {} : { root: classes.root }} aria-label="Settings">
          {isOpen ? <Close className={classes.icon} /> : <IconButton classes={{ root: classes.root }} />}
        </IconButton>
      }
      title="お問い合わせ"
    />
  );
};

const StyledImage = styled.img`
  width: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
  vertical-align: top;
  max-width: 100%;
  z-index: 999;
`;
export default Bar;
