import { useState } from "react";
import IndiaMap from "./IndiaMap";
import mockIncidents from "./mockIncidents";

export default function Dashboard() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [view, setView] = useState("active"); // active | resolved | stats

  const updateIncident = (id, updates) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, ...updates } : i
      )
    );
  };

  const activeIncidents = incidents.filter((i) => !i.resolved);
  const resolvedIncidents = incidents.filter((i) => i.resolved);

  const incidentsToShow =
    view === "active"
      ? activeIncidents
      : view === "resolved"
      ? resolvedIncidents
      : [];

  return (
    <>
      <div className="header">
        CivicWatch <span>Admin Dashboard</span>
      </div>

      <div className="dashboard">
        {/* LEFT PANEL */}
        <div className="sidebar">
          <h3>Navigation</h3>

          <button onClick={() => setView("active")}>
            View Active Incidents
          </button>

          <button onClick={() => setView("resolved")}>
            View Resolved Incidents
          </button>

          <button onClick={() => setView("stats")}>
            Statistics
          </button>
        </div>

        {/* MAP / CONTENT */}
        <div className="map-container">
          {view !== "stats" ? (
            <IndiaMap
              incidents={incidentsToShow}
              allIncidents={incidents}
              updateIncident={updateIncident}
            />
          ) : (
            <div style={{ padding: "40px" }}>
              <h2>📊 Statistics</h2>
              <p>Total Reports: {incidents.length}</p>
              <p>Active: {activeIncidents.length}</p>
              <p>Resolved: {resolvedIncidents.length}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
