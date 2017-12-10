/*global React, render*/

import PopupContent from './PopupContent';
import { Provider } from 'mobx-react';

import WanderersStore from '../stores/WanderersStore';

it('displays place popup without an image', () => {
  const place = {
    name: 'Fake place',
    place_images: []
  };

  const popup = render(
    <Provider WanderersStore={WanderersStore}>
      <PopupContent place={place} />
    </Provider>
  );
  expect(popup).toMatchSnapshot();
});
