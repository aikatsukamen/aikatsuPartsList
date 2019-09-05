import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { action } from '@storybook/addon-actions';
import Parts, { ComponentProps, ActionProps } from '.';

import cordi01 from '../../../_testJson/cordinate01.json';
import cordi02 from '../../../_testJson/cordinate02.json';

const cordinate: ComponentProps = {
  list: [
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
    cordi02,
    cordi01,
    cordi01,
    cordi02,
  ],
};

const actions: ActionProps = {};

storiesOf('PartsList', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/', 'posts']}>{story()}</MemoryRouter>)
  .add('例', () => <Parts {...cordinate} {...actions} />);
