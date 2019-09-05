import React, { ReactChildren } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      backgroundColor: 'initial',
      boxShadow: theme.shadows[5],
      padding: 0,
    },
  }),
);

type ComponentProps = {
  open: boolean;
  children: React.ReactChild | React.ReactChildren;
};
type ActionProps = {
  modalClose: () => void;
};

type PropsType = ComponentProps & ActionProps;

const SimpleModal: React.SFC<PropsType> = props => {
  const classes = useStyles();
  const handleClose = () => props.modalClose();

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className={classes.paper}>{props.children}</div>
    </Modal>
  );
};

export default SimpleModal;
