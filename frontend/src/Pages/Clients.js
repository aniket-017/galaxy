import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Clients.css";

const Clients = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/aak/l1/client-logos");
        if (!cancelled && response.data?.success) {
          setLogos(response.data.logos || []);
          setFetchError("");
        }
      } catch (e) {
        if (!cancelled) {
          setFetchError("Could not load client logos. Please try again later.");
          console.error(e);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="clientcontainer">
      {loading && <p className="clients-status">Loading clients…</p>}
      {!loading && fetchError && <p className="clients-status clients-status--error">{fetchError}</p>}
      {!loading && !fetchError && logos.length === 0 && (
        <p className="clients-status">No client logos to display yet.</p>
      )}
      {!loading && !fetchError && logos.length > 0 && (
        <ul className="logogrid">
          {logos.map((item) => (
            <li key={item._id} className="logogrid__item">
              <img src={item.imageUrl} className="logogrid__img" alt={item.name || "Client logo"} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Clients;
