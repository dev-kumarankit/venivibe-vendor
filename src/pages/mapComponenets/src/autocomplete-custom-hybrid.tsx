import React, { useEffect, useState, useCallback } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Combobox from "react-widgets/Combobox";

import "react-widgets/styles.css";
import CustomButton from "../../../components/atom/button/CustomButton";
import { arrowLeft, crossIcon } from "../../../assets/Icons";
import { CustomMapToggle, LocationToggle, MapLocationDetails, MapLocationToggle } from "../../../components/store/Toggle";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This uses the Combobox from "react-widgets" (https://jquense.github.io/react-widgets/docs/Combobox)
export const AutocompleteCustomHybrid = ({ onPlaceSelect }: Props) => {
  const map = useMap();
  const places = useMapsLibrary("places");

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>("");
  const { locationDetails, setLocationDetails } = MapLocationDetails();

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        return;
      }

      setFetchingData(true);

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
      setFetchingData(false);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (value: google.maps.places.AutocompletePrediction | string) => {

      if (typeof value === "string") {
        setInputValue(value);
        fetchPredictions(value);
      }
    },
    [fetchPredictions]
  );

  const onSelect = useCallback(
    (prediction: google.maps.places.AutocompletePrediction | string) => {
      if (!places || typeof prediction === "string") return;

      setFetchingData(true);

      const detailRequestOptions = {
        placeId: prediction.place_id,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        setLocationDetails(placeDetails)
        onPlaceSelect(placeDetails);
        setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new places.AutocompleteSessionToken());

        setFetchingData(false);
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );
  const { customMapToggle, setCustomMapToggle } = CustomMapToggle();

  const handleButtonClick = () => {
    // setMapLocation(inputValue)
    setCustomMapToggle(false)
  };
  return (
    <div className="flex flex-col space-y-4 p-4  rounded-lg ">
    <div className="flex items-center space-x-4">
      <div>
        <CustomButton
          type="button"
          icon={arrowLeft}
          buttonClass="bg-white text-gray-700 hover:bg-gray-200 rounded-md p-2"
          action={() => setCustomMapToggle(false)}
        />
      </div>
  
      <div className="flex-1">
        <Combobox
          placeholder="Search for a place"
          data={predictionResults}
          dataKey="place_id"
          textField="description"
          value={inputValue}
          onChange={onInputChange}
          onSelect={onSelect}
          busy={fetchingData}
          filter={() => true}
          focusFirstItem={true}
          hideEmptyPopup
          hideCaret
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
  
      <div>
        <CustomButton
          type="button"
          icon={crossIcon}
          buttonClass="bg-white text-gray-700 hover:bg-gray-200 rounded-md p-2"
          action={() => setCustomMapToggle(false)}
        />
      </div>
    </div>
  
    <div>
      <CustomButton
        name="Confirm"
        type="button"
        buttonClass="bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2 px-4 w-full"
        action={() => handleButtonClick()}
      />
    </div>
  </div>
  
  );
};
