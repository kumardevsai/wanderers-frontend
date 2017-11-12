import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer, inject } from "mobx-react";

import MapGL from "../components/MapGL";

@inject("WanderersStore")
@observer
export default class ShowTrip extends Component {
  render() {
    const { WanderersStore } = this.props;

    return (
      <div>
        <h2>Soy un trip</h2>
        <MapGL />
      </div>
    );
  }
}
