import WanderersStore from '../stores/WanderersStore';
import { stub } from 'sinon';

describe('conditional broadcast', () => {
  it('pushes new message into messages array', () => {
    WanderersStore.conditionalBroadcast({ type: 'new_message', data: 'hello' });

    expect(WanderersStore.messages[0]).toEqual('hello');
  });

  it('handles new stop', () => {
    WanderersStore.conditionalBroadcast({
      type: 'new_stop',
      data: { id: 1, user_name: 'Pedrito Pedrosa' }
    });

    expect(WanderersStore.stops[0]).toEqual({
      id: 1,
      user_name: 'Pedrito Pedrosa'
    });

    expect(WanderersStore.notification).toEqual('New Stop Added! 🛵');
  });

  it('removes stop', () => {
    WanderersStore.stops = [{ id: 1 }];

    WanderersStore.conditionalBroadcast({
      type: 'remove_stop',
      data: 1
    });

    expect(WanderersStore.stops.length).toEqual(0);
    expect(WanderersStore.notification).toEqual('Stop Removed! 🙀');
  });

  it('joins the video chat', () => {
    WanderersStore.conditionalBroadcast({
      type: 'video_join',
      data: { user_name: 'Pedrito Pedrosa' }
    });

    expect(WanderersStore.notification).toEqual(
      'Pedrito Pedrosa has joined the video chat 🤘'
    );
  });
});

describe('loadStops', () => {
  it('calls the places api and loads the stops', async () => {
    WanderersStore.user = { token: 'lalala' };
    WanderersStore.placesApi = {
      // https://github.com/sinonjs/sinon/issues/804
      loadStops: stub().resolves({ data: ['stop'] })
    };

    await WanderersStore.loadStops(1);

    expect(WanderersStore.stops[0]).toEqual('stop');
  });
});

describe('loadVideoToken', () => {
  it('calls the places api and loads the video token', async () => {
    WanderersStore.user = { token: 'lalala' };

    WanderersStore.placesApi = {
      loadVideoToken: stub().resolves({ data: { token: 'lalalal' } })
    };

    await WanderersStore.loadVideoToken(1);

    expect(WanderersStore.videoToken).toEqual('lalalal');
  });
});

describe('addTripImage', () => {
  it('adds images to the trip', async () => {
    // setup
    WanderersStore.user = { token: 'lalala' };

    WanderersStore.placesApi = {
      // anytime there is await, it'll return a promise. You need to wait until it is actually resolved. When it is resolved, the data shuld look like this: { data: 'this is an image' }
      addTripImage: stub().resolves({ data: 'this is an image' })
    };

    // actual code being tested
    await WanderersStore.addTripImage(
      1,
      'this is an image',
      'this is the caption'
    );

    // expect
    expect(WanderersStore.tripImages[0]).toEqual('this is an image');
    expect(WanderersStore.notification).toEqual('Image added! 📷');
  });
});
