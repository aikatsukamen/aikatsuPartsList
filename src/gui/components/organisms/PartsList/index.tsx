import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as Types from '../../../../types/entity';
import Pagination from 'material-ui-flat-pagination';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Parts from '../../molecules/Parts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
      marginTop: 0,
    },
    pagenationStandardButton: {
      paddingLeft: 6,
      paddingRight: 6,
    },
    pagenationRootEllipsis: {
      padding: 0,
      marginLeft: -2,
      marginRight: -2,
    },
  }),
);

export type ComponentProps = {
  list: Types.Parts[];
};

export type ActionProps = {};
type PropsType = ComponentProps & ActionProps;

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

  const handleRandom = () => {
    const eyeList = props.list.filter(item => item.category === 'カラーコンタクト');
    const glassList = props.list.filter(item => item.category === 'メガネ');
    const hairColorList = props.list.filter(item => item.category === 'ヘアカラー');
    const harStyleList = props.list.filter(item => item.category === 'ヘアスタイル');

    const eye = eyeList[Math.floor(Math.random() * eyeList.length)];
    const glass = glassList[Math.floor(Math.random() * glassList.length)];
    const color = hairColorList[Math.floor(Math.random() * hairColorList.length)];
    const style = harStyleList[Math.floor(Math.random() * harStyleList.length)];

    setDrawList([eye, glass, color, style]);
    setOffset(0);
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
    setOffset(0);
  }, [category, searchWord, props.list]);

  return (
    <div className={classes.root}>
      {/* 固定領域 */}
      <div
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          width: '100%',
          paddingTop: 10,
        }}
      >
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
          <div>
            <Button variant={'contained'} color={'primary'} size={'small'} onClick={handleRandom}>
              ランダム
            </Button>
          </div>
        </div>
        {/* pagenation */}
        <div style={{ display: 'flex' }}>
          <Select
            style={{ width: 55 }}
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
            }}
          >
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={300}>300</MenuItem>
          </Select>
          <Pagination
            style={{ display: 'flex' }}
            classes={{
              rootStandard: classes.pagenationStandardButton,
              rootCurrent: classes.pagenationStandardButton,
              rootEnd: classes.pagenationStandardButton,
              rootEllipsis: classes.pagenationRootEllipsis,
            }}
            limit={perPage}
            offset={offset}
            total={drawList.length}
            onClick={(e, offset) => handleClickPagination(offset)}
          />
        </div>
      </div>
      {/* リスト */}
      <div
        style={{
          paddingTop: 160,
        }}
      >
        <Grid container direction="row" justify={'space-around'} alignItems={'flex-start'} spacing={1}>
          {drawList.slice(offset, offset + perPage).map(item => (
            <Parts key={item.image} {...item} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Component;
