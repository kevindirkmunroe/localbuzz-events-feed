import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type EventItem = {
  event_id: string;
  title: string;
  description?: string;
  start_datetime: string;
  location_name?: string;
  address?: string;
  category?: string;
  price?: string;
  website?: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events/public")
        .then((res) => setEvents(res.data.data ?? res.data))
        .finally(() => setLoading(false));
  }, []);

  if (loading) return <main className="page">Loading events...</main>;

  return (
      <main className="page">
        <h1>LocalBuzz Events</h1>

        <div className="event-list">
          {events.map((event) => (
              <article key={event.event_id} className="event-card">
                <h2>{event.title}</h2>

                <p className="date">
                  {new Date(event.start_datetime).toLocaleString()}
                </p>

                {event.location_name && <p><strong>Venue:</strong> {event.location_name}</p>}
                {event.address && <p><strong>Address:</strong> {event.address}</p>}
                {event.category && <p><strong>Category:</strong> {event.category}</p>}
                {event.price && <p><strong>Price:</strong> {event.price}</p>}

                {event.description && (
                    <p className="description">{event.description}</p>
                )}

                {event.website && (
                    <a href={event.website} target="_blank" rel="noreferrer">
                      Event Website
                    </a>
                )}
              </article>
          ))}
        </div>
      </main>
  );
}

export default App;
