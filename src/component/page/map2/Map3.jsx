import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import {
  fetchMaps,
  seleteAllMaps,
} from "../../../reducs/feature/mapSlice/mapSlices";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function MyComponent() {
  const dispatch = useDispatch();
  const maps = useSelector(seleteAllMaps);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const [map, setMap] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [startLocation, setStartLocation] = useState({
    lat: 11.54823482166757,
    lng: 104.86847693959957,
  });

  useEffect(() => {
    dispatch(fetchMaps());
  }, [dispatch]);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      maps.forEach((marker) => {
        bounds.extend({
          lat: parseFloat(marker.latitude),
          lng: parseFloat(marker.longitude),
        });
      });
      map.fitBounds(bounds);
      setMap(map);
    },
    [maps]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerHover = (marker) => {
    setHoveredMarker(marker);
  };

  const handleMarkerHoverExit = () => {
    setHoveredMarker(null);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);

    // Calculate distance using Google Maps Distance Matrix API
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [startLocation],
        destinations: [
          {
            lat: parseFloat(marker.latitude),
            lng: parseFloat(marker.longitude),
          },
        ],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === window.google.maps.DistanceMatrixStatus.OK) {
          setDistance(response.rows[0].elements[0].distance.text);
        } else {
          console.error("Error calculating distance:", status);
        }
      }
    );
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: startLocation.lat,
        lng: startLocation.lng,
      }}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {maps.map((marker, index) => (
        <Marker
          key={index}
          position={{
            lat: parseFloat(marker.latitude),
            lng: parseFloat(marker.longitude),
          }}
          label={{
            text: marker.sport_name,
            className: "custom-label",
          }}
            onMouseOver={() => handleMarkerHover(marker)}
            // onMouseOut={handleMarkerHoverExit}
          //onClick={() => handleMarkerHover(marker)}
          //   onClick={() => handleMarkerClick(marker)}
        >
          {hoveredMarker && hoveredMarker === marker && (
            <InfoWindow
              position={{
                lat: parseFloat(marker.latitude),
                lng: parseFloat(marker.longitude),
              }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
              }}
            >
              <div className="w-[300px] h-[250px] bg-white shadow-lg rounded-lg p-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {marker.sport_name}
                </h3>
                {/* <p className="text-gray-600 mb-2">
                  Latitude: {parseFloat(marker.latitude).toFixed(2)}
                </p>
                <p className="text-gray-600 mb-4">
                  Longitude: {parseFloat(marker.longitude).toFixed(2)}
                </p> */}
                {selectedMarker === marker && distance && (
                  <p className="text-gray-600 mb-4">Distance: {distance}</p>
                )}
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  alt={marker.sport_name}
                  src={marker.image}
                />
                <button className=" bg-slate-600 text-xl mt-5 rounded-lg w-[50px] h-[50px]">
                  go
                </button>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
