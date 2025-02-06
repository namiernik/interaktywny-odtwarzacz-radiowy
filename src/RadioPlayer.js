import React, { useState, useRef, useEffect } from "react";

const stations = [
  { name: "Antyradio", url: "http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx" },
  { name: "RMF FM", url: "http://195.150.20.9/RMFFM48" },
  { name: "Eska Rock", url: "http://waw.ic.smcloud.net/radioeska.pl/eska-rock.mp3" }
];

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [station, setStation] = useState(stations[0].url);
  const [location, setLocation] = useState(null);
  const [browserInfo, setBrowserInfo] = useState("");
  const audioRef = useRef(new Audio(station));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
      },
      (error) => {
        setLocation("Nie udało się uzyskać lokalizacji");
      }
    );

    setBrowserInfo(`${navigator.userAgent}`);
  }, []);

  useEffect(() => {
    audioRef.current.src = station;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [station]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="radio-player">
      <h2>Odtwarzacz Radia</h2>
      <select onChange={(e) => setStation(e.target.value)} value={station}>
        {stations.map((s) => (
          <option key={s.url} value={s.url}>{s.name}</option>
        ))}
      </select>
      <button onClick={togglePlayPause} aria-label="Play/Pause">
        {isPlaying ? "Pauza" : "Odtwórz"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
      <div className="info">
        <p>Twoja lokalizacja: {location || "Pobieranie..."}</p>
        <p>Przeglądarka: {browserInfo}</p>
      </div>
    </div>
  );
};

export default RadioPlayer;