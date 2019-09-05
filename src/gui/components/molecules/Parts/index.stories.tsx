import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { action } from '@storybook/addon-actions';
import Parts, { ComponentProps, ActionProps } from '.';

import cordi01 from '../../../_testJson/cordinate01.json';

const cordinate: ComponentProps = {
  ...cordi01,
};

const actions: ActionProps = {};

storiesOf('Parts', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/', 'posts']}>{story()}</MemoryRouter>)
  .add('1個', () => <Parts {...cordinate} {...actions} />)
  .add('複数', () => (
    <div style={{ display: 'flex' }}>
      <Parts {...cordinate} {...actions} />
      <Parts {...cordinate} {...actions} />
      <Parts {...cordinate} {...actions} />
      <Parts {...cordinate} {...actions} />
    </div>
  ));
