import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useHotels } from "../context/HotelsProvider";
import { useState } from "react";

function Map() {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([52.366527, 4.868144]);

  return (
    <MapContainer
      className="map"
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>
           {item.host_location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
