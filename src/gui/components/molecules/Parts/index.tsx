import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import { Parts } from '../../../../types/entity';
import { makeStyles } from '@material-ui/styles';
import LazyImage from '../../atom/LazyImage';
import QRCode from 'qrcode.react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 3,
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
    },
  }),
);

export type ComponentProps = Parts;

export type ActionProps = {};
type PropsType = ComponentProps & ActionProps;

const Parts: React.SFC<PropsType> = (props: PropsType) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <div className={classes.root}>
      <Card className={classes.card} onClick={handleExpandClick}>
        <LazyImage imageUrl={props.image} height={100} />
        <CardHeader title={props.name} subheader={props.version} className={classes.header} disableTypography={true} />
      </Card>

      <Dialog open={expanded} onClose={handleExpandClick}>
        <div className={classes.detail}>
          <Typography variant={'h4'}>{props.name}</Typography>

          {props.qr ? (
            <div style={{ textAlign: 'center' }}>
              <QRCode value={props.qr} level={'L'} size={100} />
            </div>
          ) : (
            ''
          )}

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
      </Dialog>
    </div>
  );
};

export default Parts;
