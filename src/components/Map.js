import React from 'react';
import '../css/map.css';
import { showDataOnMap } from '../util';

import {
    Map as LeafletMap,
    TileLayer
  } from 'react-leaflet';

import '../css/map.css';

/* Mapa */
function Map({ countries, typeCases, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {showDataOnMap(countries, typeCases)}
            </LeafletMap>
        </div>
    )
}

export default Map;
