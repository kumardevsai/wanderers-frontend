/*global React, render*/

import Nav from './Nav';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import WanderersStore from '../stores/WanderersStore';

useStaticRendering(true);

it('renders nav for authenticated user', () => {
  WanderersStore.user = true;

  const nav = render(
    <Provider WanderersStore={WanderersStore}>
      <StaticRouter context={{}}>
        <Nav />
      </StaticRouter>
    </Provider>
  );
  expect(nav).toMatchSnapshot();
});

it('renders nav for unauthenticated user', () => {
  WanderersStore.user = false;

  const nav = render(
    <Provider WanderersStore={WanderersStore}>
      <StaticRouter context={{}}>
        <Nav />
      </StaticRouter>
    </Provider>
  );
  expect(nav).toMatchSnapshot();
});
