import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import './App.css';
import * as actions from '../../../actions';
import DrawerMenu from '../../molecules/DrawerMenu';
import Snackbar from '../../molecules/SnackBar';
import Divider from '@material-ui/core/Divider';
import { GlobalState, RootState } from '../../../reducers';
import queryString from 'query-string';
import LazyImage from '../../atom/LazyImage';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PartsList from '../../organisms/PartsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      float: 'right',
      top: '-60px',
    },
    icon: {},
  }),
);

type ComponentProps = {
  notify: GlobalState['notify'];
  list: GlobalState['list'];
};
type ActionProps = typeof mapDispatchToProps;

type PropsType = ComponentProps & ActionProps;
const App: React.SFC<PropsType> = (props: PropsType) => {
  const classes = useStyles();

  return (
    <div>
      <BrowserRouter>
        <div>
          <DrawerMenu navigationLabel={'パーツリスト'}>
            <List>
              <ListItem button onClick={() => window.open('https://kirakiratter.com/')}>
                <ListItemIcon>
                  <LazyImage imageUrl={'./images/social_kkt.png'} height={30} />
                </ListItemIcon>
                <ListItemText primary={'キラキラッター'} />
              </ListItem>
              <ListItem button onClick={() => window.open('https://www.aikatsu.com/')}>
                <ListItemText>DCDアイカツ！</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>本ツールはアイカツファンによる制作物であり、アイカツ公式とは一切関わりありません。</ListItem>
            </List>
          </DrawerMenu>
          <Route
            exact
            path={`/`}
            render={innerProps => {
              const query = queryString.parse(innerProps.location.search);

              return (
                <div>
                  <PartsList list={props.list} />
                </div>
              );
            }}
          />
          <Snackbar open={props.notify.isOpen} message={props.notify.message} variant={props.notify.variant} onClose={props.closeNotify} />
        </div>
      </BrowserRouter>
    </div>
  );
};

// state
const mapStateToProps = (state: RootState) => {
  return {
    notify: state.reducer.notify,
    list: state.reducer.list,
  };
};

// action
const mapDispatchToProps = {
  closeNotify: actions.closeNotify,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
