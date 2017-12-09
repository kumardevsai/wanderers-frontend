import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import PropTypes from 'prop-types';

import { Figcaption } from '../elements/figure';

import { Modal } from 'react-overlays';

// https://react-bootstrap.github.io/react-overlays/
const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: `translate(-50%, -50%)`,
  border: '1px solid #e5e5e5',
  backgroundColor: 'white',
  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
  padding: 20
};

@inject('UiStore')
@observer
export default class TripImageOverlay extends Component {
  static propTypes = {};

  render() {
    const { UiStore } = this.props;
    const image = UiStore.imageOpened;

    return (
      <Modal
        aria-labelledby="modal-label"
        style={modalStyle}
        backdropStyle={backdropStyle}
        show={UiStore.openTripImage}
        onHide={() => {
          UiStore.openTripImage = false;
        }}
      >
        <div style={dialogStyle}>
          {image && (
            <figure>
              <img src={image.detail_image} alt={image.caption} />
              <Figcaption>
                {image.caption} by {image.user_name} ✰
              </Figcaption>
            </figure>
          )}
        </div>
      </Modal>
    );
  }
}
