import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const markers = [
  {
    lat: 11.53167632996426,
    lng: 104.89250160041107,
    text: "A",
    title: "Camko Sport Club",
    image:
      "http://136.228.158.126:50003/media/uploads/category_9e9d5d4e-5b90-4aa8-bf04-d9e39117e6cc.jpg",
  },
  {
    lat: 11.585440583436704,
    lng: 104.87594859548044,
    text: "A",
    title: "V-Sport Football Club",
    image:
      "http://136.228.158.126:50003/media/uploads/category_24be9f0d-2f7b-4b65-acf2-a72af660b473.jpg",
  },
  {
    lat: 11.583785837283765,
    lng: 104.93836464232844,
    text: "A",
    title: "platinum-sport-center",
    image:
      "http://136.228.158.126:50003/media/uploads/category_90096bf6-d138-43f2-b573-f75d75e1bb10.jpg",
  },
  {
    lat: 11.591195490706838,
    lng: 104.88516048650733,
    text: "A",
    title: "real-soccer",
    image:
      "http://136.228.158.126:50003/media/uploads/category_8d1bc891-6e69-442c-a389-85e80a0fc410.jpg",
  },
  {
    lat: 11.53914874749284,
    lng: 104.85660960732177,
    text: "A",
    title: "Happy Sports Cambodia",
    image:
      "http://136.228.158.126:50003/media/uploads/category_79829ee4-d34f-49d7-9284-c2a937bb0875.jpeg",
  },
  {
    lat: 11.629698380297807,
    lng: 104.90149284341369,
    text: "A",
    title: "Futaba Soccer Club",
    image:
      "http://136.228.158.126:50003/media/uploads/category_679887d1-e188-4db0-9bab-7b5d103fac21.jpg",
  },

  {
    lat: 11.53167632996426,
    lng: 104.89250160041107,
    text: "A",
    title: "CAMKO SPORT CLUB",
    image:
      "http://136.228.158.126:50003/media/uploads/category_9e9d5d4e-5b90-4aa8-bf04-d9e39117e6cc.jpg",
  },
  {
    lat: 11.574730412564117,
    lng: 104.86920128953376,
    text: "A",
    title: "Castor Sports",
    image:
      "http://136.228.158.126:50003/media/uploads/category_24be9f0d-2f7b-4b65-acf2-a72af660b473.jpg",
  },

  // Add more markers with title and image properties
];

const center = {
  lat: 11.54823482166757,
  lng: 104.86847693959957,
};

function MyComponent() {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const [map, setMap] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend({ lat: marker.lat, lng: marker.lng });
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
          label={{
            text: marker.text,
            className: "custom-label",
          }}
          onClick={() => handleMarkerClick(marker)}
        >
          {selectedMarker && selectedMarker === marker && (
            <InfoWindow>
              <div className=" w-[300px] h-[250px]">
                <h3 className=" mb-5">{marker.title}</h3>
                <img className=" w-[100%] h-[100%]"
                  alt={marker.title}
                  src={marker.image}
                  
                />
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
