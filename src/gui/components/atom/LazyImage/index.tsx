import React from 'react';
// import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
// import { createStyles, Theme } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     icon: {},
//   }));

type ComponentProps = {
  imageUrl: string;
  height: number;
};

type PropsType = ComponentProps;
const LazyImage: React.SFC<PropsType> = (props: PropsType) => {
  return (
    <LazyLoad height={props.height}>
      <img src={props.imageUrl} height={props.height} />
    </LazyLoad>
  );
};

export default LazyImage;
