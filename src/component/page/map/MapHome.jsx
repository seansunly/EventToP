import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text, lat, lng }) => {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -100%)",
        backgroundColor: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        fontSize: "12px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      {text}
    </div>
  );
};

export default function MapHome() {
  const locations = [
    { lat: 11.54823482166757, lng: 104.86847693959957, text: "A" },
    { lat: 11.53167632996426, lng: 104.89250160041107, text: "B" },
    { lat: 11.585440583436704, lng: 104.87594859548044, text: "C" },
    { lat: 11.629698380297807, lng: 104.90149284341369, text: "D" },
  ];

  const defaultProps = {
    center: {
      lat: 11.58, // Adjusted center latitude
      lng: 104.88, // Adjusted center longitude
    },
    zoom: 11, // Adjusted zoom level
  };

  const renderMarkers = () => {
    return locations.map((location, index) => (
      <Marker
        key={index}
        lat={location.lat}
        lng={location.lng}
        text={location.text}
      />
    ));
  };

  return (
    <div>
      <h1>test map</h1>
      <div className="justify-center">
        <div className="w-[50%] h-[100vh] mx-auto">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {renderMarkers()}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
