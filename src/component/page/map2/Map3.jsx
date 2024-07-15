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
  const [searchTerm, setSearchTerm] = useState("");

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

    // Pan and zoom to the selected marker
    setMap((prevMap) => {
      if (prevMap) {
        prevMap.panTo({
          lat: parseFloat(marker.latitude),
          lng: parseFloat(marker.longitude),
        });
        // prevMap.setZoom(10);
      }
      return prevMap;
    });
  };

  const filteredMaps = searchTerm
    ? maps.filter((marker) =>
        marker.sport_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : maps;

  useEffect(() => {
    if (selectedMarker) {
      handleMarkerClick(selectedMarker);
    }
  }, [selectedMarker, handleMarkerClick]);

  return isLoaded ? (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          const filteredMarker = filteredMaps.find((marker) =>
            marker.sport_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase().trim())
          );
          if (filteredMarker) {
            setSelectedMarker(filteredMarker);
          }
        }}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />
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
        {filteredMaps.map((marker, index) => (
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
            onClick={() => handleMarkerClick(marker)}
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
                  {selectedMarker === marker && distance && (
                    <p className="text-gray-600 mb-4">Distance: {distance}</p>
                  )}
                  <img
                    className="w-full h-48 object-cover rounded-lg"
                    alt={marker.sport_name}
                    src={marker.image}
                  />
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);