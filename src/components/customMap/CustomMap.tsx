import { APIProvider, ControlPosition, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { MAP_KEY } from "../../utils/Constant";
import { CustomMapControl } from "../../pages/mapComponenets/src/map-control";
import MapHandler from "../../pages/mapComponenets/src/map-handler";

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "custom-hybrid", label: "Custom w/ Select Widget" },
];

const CustomMap = ({ setSelectedPlaceOnMap }) => {
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0]);

  const [selectedPlace, setSelectedPlace] =
  
    useState<google.maps.places.PlaceResult | null>(null);
  setSelectedPlaceOnMap(selectedPlace?.formatted_address);

  return (
    <APIProvider apiKey={MAP_KEY}>
      <Map
        style={{ height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />

      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onPlaceSelect={setSelectedPlace}
      />
      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
};

export default CustomMap;
