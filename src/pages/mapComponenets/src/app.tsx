import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, ControlPosition, Map} from '@vis.gl/react-google-maps';

import ControlPanel from './control-panel';
import {CustomMapControl} from './map-control';
import MapHandler from './map-handler';
import { MAP_KEY } from '../../../utils/Constant';



export type AutocompleteMode = {id: string; label: string};

const autocompleteModes: Array<AutocompleteMode> = [
  {id: 'classic', label: 'Google Autocomplete Widget'},
  {id: 'custom', label: 'Custom Build'},
  {id: 'custom-hybrid', label: 'Custom w/ Select Widget'}
];

const App = () => {
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  return (
    <APIProvider apiKey={MAP_KEY}>
      <Map
        defaultZoom={3}
        defaultCenter={{lat: 22.54992, lng: 0}}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />

      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onPlaceSelect={setSelectedPlace}
      />

      <ControlPanel
        autocompleteModes={autocompleteModes}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onAutocompleteModeChange={setSelectedAutocompleteMode}
      />

      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
};

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(<App />);
}
