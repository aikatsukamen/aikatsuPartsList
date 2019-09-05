import React, { InputHTMLAttributes } from 'react';
import { createStyles } from '@material-ui/core/styles';
import { Theme, Grid, TextField, Select, MenuItem } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router';
import * as Types from '../../../../types/entity';
import Pagination from 'material-ui-flat-pagination';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Parts from '../../molecules/Parts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 10,
    },
  }),
);

export type ComponentProps = {
  list: Types.Parts[];
};

export type ActionProps = {};
type PropsType = ComponentProps & ActionProps & RouteComponentProps;

const Component: React.SFC<PropsType> = (props: PropsType) => {
  const classes = useStyles();

  // 部位
  const [category, setCategory] = React.useState({
    hairStyle: true,
    hairColor: true,
    glasses: true,
    eye: true,
    // QRとして流通しているものに絞り込み
    qr: false,
  });

  // フリーワード
  const [searchWord, setSearchWord] = React.useState('');

  // リスト
  const [drawList, setDrawList] = React.useState(props.list);

  // ページネーション
  const [perPage, setPerPage] = React.useState(50);
  const [offset, setOffset] = React.useState(0);

  const handleCategoryChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [name]: event.target.checked });
  };

  const handleSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleClickPagination = (selectOffset: number) => {
    setOffset(selectOffset);
  };

  // 入力に変化があった時の処理
  React.useEffect(() => {
    // パーツの絞り込み
    const newList: Types.Parts[] = props.list.filter(item => {
      // 部位絞り込み
      if (!category.eye && item.category === 'カラーコンタクト') return false;
      if (!category.glasses && item.category === 'メガネ') return false;
      if (!category.hairColor && item.category === 'ヘアカラー') return false;
      if (!category.hairStyle && item.category === 'ヘアスタイル') return false;

      if (category.qr && (!item.stars.book && !item.friends.book && !item.parade.book)) return false;

      if (searchWord) {
        if (item.name.includes(searchWord)) return true;
        if (item.animeChara.includes(searchWord)) return true;

        let hit = false;
        ['stars', 'friends', 'parade'].map(version => {
          ['book', 'event', 'ranking', 'level'].map(genre => {
            if (item[version][genre].includes(searchWord)) {
              hit = true;
            }
          });
        });

        return hit;
      }
      return true;
    });

    setDrawList(newList);
  }, [category, searchWord, props.list]);

  return (
    <div className={classes.root}>
      {/* 検索 */}
      <div>
        <div>
          <TextField value={searchWord} onChange={handleSearchWordChange} fullWidth={true} placeholder={'フリーワード検索'} />
        </div>
        <div>
          髪
          <Checkbox checked={category.hairStyle} onChange={handleCategoryChange('hairStyle')} />
          髪色
          <Checkbox checked={category.hairColor} onChange={handleCategoryChange('hairColor')} />
          目鏡
          <Checkbox checked={category.glasses} onChange={handleCategoryChange('glasses')} />
          カラコン
          <Checkbox checked={category.eye} onChange={handleCategoryChange('eye')} />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <Select
          value={perPage}
          onChange={e => {
            setPerPage(Number(e.target.value));
          }}
        >
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={300}>300</MenuItem>
        </Select>
        <Pagination limit={perPage} offset={offset} total={drawList.length} onClick={(e, offset) => handleClickPagination(offset)} />
      </div>
      {/* リスト */}
      <Grid container direction="row" justify={'flex-start'} alignItems={'flex-start'} spacing={1}>
        {drawList.slice(offset, offset + perPage).map(item => (
          <Parts {...item} />
        ))}
      </Grid>
    </div>
  );
};

export default withRouter(Component);
