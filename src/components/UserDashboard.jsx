import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IncidentForm from "./IncidentForm";

// Leaflet Icon Fix - Necessary for React to show the blue pin
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to fly the map to the new static location upon submission
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15); 
    }
  }, [center, map]);
  return null;
}

export default function UserDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [mapCenter, setMapCenter] = useState([30.3862, 76.7894]); // Default Ambala

  const handleAddIncident = (newIncident) => {
    const report = { 
      ...newIncident, 
      id: Date.now() 
    };
    
    // Adds new report to the top of the list
    setIncidents((prev) => [report, ...prev]);
    // Updates map to show the location of this specific report
    setMapCenter([report.latitude, report.longitude]);
    setIsFormOpen(false);
  };

  const deleteIncident = (id) => {
    setIncidents((prev) => prev.filter(inc => inc.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>⚠️ Live Alerts</h2>
        <div className="feed-container">
          {incidents.length === 0 && <p className="empty-msg">No incidents reported yet.</p>}
          {incidents.map((i) => (
            <div key={i.id} className="incident-card">
              <button className="delete-btn" onClick={() => deleteIncident(i.id)}>×</button>
              <b>{i.type}</b>
              <p>{i.description}</p>
              
              {/* This displays the photo you captured */}
              {i.image && <img src={i.image} alt="incident" className="sidebar-img" />}
              
              <div className="card-footer">
                <small>📍 {i.latitude.toFixed(4)}, {i.longitude.toFixed(4)}</small>
                <small>{i.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
        <button className="report-btn" onClick={() => setIsFormOpen(true)}>
          ➕ Report Incident at Current Spot
        </button>
      </div>

      <div className="map-container">
        <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
          <ChangeView center={mapCenter} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {incidents.map((i) => (
            <Marker key={i.id} position={[i.latitude, i.longitude]}>
              <Popup>
                <strong>{i.type}</strong><br />
                {i.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {isFormOpen && (
        <IncidentForm 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleAddIncident} 
        />
      )}
    </div>
  );
}