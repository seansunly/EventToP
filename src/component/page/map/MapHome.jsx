import React from 'react'
import GoogleMapReact  from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function MapHome() {
    const defaultProps = {
      center: {
        lat: 11.54823482166757,
        lng: 104.86847693959957,
      },
      zoom: 15,
    };
  return (
    <div>
      <h1>test map</h1>
      // Important! Always set the container height explicitly
      <div className=' justify-center'>
        <div className=" w-[50%] h-[100vh] mx-auto">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
