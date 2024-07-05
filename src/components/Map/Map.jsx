import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../context/HotelsProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Map() {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([52.366527, 4.868144]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");

  useEffect(() => {
    if (lat && long) setMapCenter([lat, long]);
  }, [lat, long]);

  return (
    <MapContainer
      className="map"
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
    >
      <button className="getLocation">Use Your Location</button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <ChengeCenter position={mapCenter} />
      {hotels.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>{item.host_location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

function ChengeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
