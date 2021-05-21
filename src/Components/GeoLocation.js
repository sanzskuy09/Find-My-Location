import { useState } from "react";

import ReactMapGL, { FlyToInterpolator, Marker } from "react-map-gl";

import marker from "../Assets/marker.png";

import { browserName } from "react-device-detect";
import Button from "./Button";
import TableData from "./TableData";

const GeoLocation = () => {
  const [details, setDetails] = useState({
    browserName: "",
    data: null,
  });

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibW5zYW56IiwiYSI6ImNrbXNzZjJ1dzBpOHcyb3BvNWw1NHV3eG0ifQ.Z_04LU2RBESzZSpxGvFENg";

  const [viewport, setViewport] = useState({
    latitude: -6.177,
    longitude: 106.833,
    zoom: 15,
  });

  const getUserGeoLocation = async () => {
    try {
      // get Ip Adress
      const response = await fetch(
        "https://geolocation-db.com/json/ef6c41a0-9d3c-11eb-8f3b-e1f5536499e7"
      );
      const responseToJSON = await response.json();
      const ipAddress = responseToJSON?.IPv4;

      // get data from IP Address
      const getDetailUser = await fetch(
        `https://json.geoiplookup.io/${ipAddress}`
      );
      const information = await getDetailUser.json();

      // set data to state
      await setDetails({
        ...details,
        browserName,
        data: information,
      });

      await setViewport({
        ...viewport,
        latitude: information?.latitude,
        longitude: information?.longitude,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ margin: "30px auto", textDecoration: "underline" }}>
        Click Button To Search Your Location
      </h1>

      {/* Button */}
      <Button getUserGeoLocation={getUserGeoLocation} />

      {/* Table Data */}
      <TableData details={details} />

      {/* MapBox */}
      <div className="container">
        <div className="map-wrapper">
          <ReactMapGL
            {...viewport}
            width="50vw"
            height="50vh"
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mnsanz/ckmdfjmjtifat17qo8obecacs"
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          >
            <Marker
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <img src={marker} alt="You are Here" />
            </Marker>
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
};

export default GeoLocation;
