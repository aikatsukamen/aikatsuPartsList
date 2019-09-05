import React from 'react';
import { createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Card, CardMedia, CardHeader, CardActions, Collapse, CardContent, Typography, Theme, Divider } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router';
import { Parts } from '../../../../types/entity';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Modal from '../Modal';
import LazyImage from '../../atom/LazyImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 10,
    },
    header: {
      padding: 5,
      fontSize: 10,
      textAlign: 'center',
    },
    card: {
      width: 100,
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    textcontent: {
      whiteSpace: 'pre-line',
    },
    detail: {
      padding: 10,
      backgroundColor: 'white',
    },
  }),
);

export type ComponentProps = Parts;

export type ActionProps = {};
type PropsType = ComponentProps & ActionProps & RouteComponentProps;

const CordinateThumb: React.SFC<PropsType> = (props: PropsType) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <div className={classes.root}>
      <Card className={classes.card} onClick={handleExpandClick}>
        <LazyImage imageUrl={props.image} height={100} />
        <CardHeader title={props.name} subheader={props.version} className={classes.header} disableTypography={true} />
      </Card>

      <Modal open={expanded} modalClose={handleExpandClick}>
        <div className={classes.detail}>
          <Typography variant={'h4'}>{props.name}</Typography>

          <Divider />

          <Typography variant={'h6'}>アイカツスターズ！</Typography>
          <Typography variant={'body2'}>{!props.stars.level && !props.stars.event && !props.stars.ranking && !props.stars.book && 'このアイカツではもらえないよ！'}</Typography>
          <Typography variant={'body2'}>{props.stars.level && props.stars.level}</Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.stars.event && props.stars.event}
          </Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.stars.ranking && props.stars.ranking}
          </Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.stars.book && props.stars.book}
          </Typography>

          <Divider />

          <Typography variant={'h6'}>アイカツフレンズ！</Typography>
          <Typography variant={'body2'}>
            {!props.friends.level && !props.friends.event && !props.friends.ranking && !props.friends.book && 'このアイカツではもらえないよ！'}
          </Typography>
          <Typography variant={'body2'}>{props.friends.level && props.friends.level}</Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.friends.event && props.friends.event}
          </Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.friends.ranking && props.friends.ranking}
          </Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.friends.book && props.friends.book}
          </Typography>

          <Divider />

          <Typography variant={'h6'}>アイカツオンパレード！</Typography>
          <Typography variant={'body2'}>{!props.parade.level && !props.parade.event && !props.parade.ranking && !props.parade.book && 'このアイカツではもらえないよ！'}</Typography>
          <Typography variant={'body2'}>{props.parade.level && props.parade.level}</Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.parade.event && props.parade.event}
          </Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.parade.ranking && props.parade.ranking}
          </Typography>
          <Typography variant={'body2'} className={classes.textcontent}>
            {props.parade.book && props.parade.book}
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(CordinateThumb);
