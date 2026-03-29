import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search } from "lucide-react";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LocationPickerProps {
  location: { lat: number; lng: number } | null;
  onLocationChange: (loc: { lat: number; lng: number }) => void;
}

const EGYPT_BOUNDS: L.LatLngBoundsExpression = [[22.0, 24.7], [31.7, 37.0]];

const LocationPicker = ({ location, onLocationChange }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [27.5, 30.8],
      zoom: 6,
      minZoom: 5,
      maxBounds: EGYPT_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onLocationChange({ lat, lng });
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(map);
      }
    });

    mapInstanceRef.current = map;
    setTimeout(() => map.invalidateSize(), 300);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!location || !mapInstanceRef.current) return;
    if (markerRef.current) {
      markerRef.current.setLatLng([location.lat, location.lng]);
    } else {
      markerRef.current = L.marker([location.lat, location.lng]).addTo(mapInstanceRef.current);
    }
  }, [location]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + " مصر")}&countrycodes=eg&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lon);
        mapInstanceRef.current.setView([latNum, lngNum], 14);
        onLocationChange({ lat: latNum, lng: lngNum });
        if (markerRef.current) {
          markerRef.current.setLatLng([latNum, lngNum]);
        } else {
          markerRef.current = L.marker([latNum, lngNum]).addTo(mapInstanceRef.current);
        }
      }
    } catch {
      // silently fail
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Search bar */}
      <div className="flex gap-2" style={{ direction: "rtl" }}>
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="ابحث عن منطقتك..."
            className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-display font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {searching ? "جاري..." : "بحث"}
        </button>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="h-64 rounded-xl border border-border overflow-hidden z-0"
        style={{ direction: "ltr" }}
      />
    </div>
  );
};

export default LocationPicker;
