import PopupContent from './PopupContent';

it('displays place popup without an image', () => {
  const place = {
    name: 'Fake place',
    place_images: []
  };

  const popup = render(<PopupContent place={place} />);
  expect(popup).toMatchSnapshot();
});
