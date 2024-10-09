import { GoogleMap } from "@vis.gl/react-google-maps";

const GoogleMapComponent = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <GoogleMap
        mapOptions={{
          center: { lat: -3.745, lng: -38.523 },
          zoom: 10,
        }}
        style={{ width: "100%", height: "100%" }}
        googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      />
    </div>
  );
};

export default GoogleMapComponent;
