import React from 'react';
import { connect } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import * as actions from '../../../actions';
import DrawerMenu from '../../molecules/DrawerMenu';
import Snackbar from '../../molecules/SnackBar';
import Divider from '@material-ui/core/Divider';
import { GlobalState, RootState } from '../../../reducers';
import LazyImage from '../../atom/LazyImage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
        <div style={{ paddingTop: 65 }}>
          <PartsList list={props.list} />
        </div>
        <Snackbar open={props.notify.isOpen} message={props.notify.message} variant={props.notify.variant} onClose={props.closeNotify} />
      </div>
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
