import { useState } from "react";
import type { Artwork } from "./types";
import GalleryForm from "./components/GalleryForm";
import GalleryList from "./components/GalleryList";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState<"all" | "liked">("all");
  const [sort, setSort] = useState<"newest" | "az">("newest");

  const addArtwork = (title: string, artist: string) => {
    const newItem: Artwork = {
      id: Date.now(),
      title,
      artist,
      liked: false,
      createdAt: Date.now(),
    };

    setArtworks((prev) => [...prev, newItem]);
  };

  const deleteArtwork = (id: number) => {
    setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
  };

  const toggleLike = (id: number) => {
    setArtworks((prev) =>
      prev.map((artwork) =>
        artwork.id === id ? { ...artwork, liked: !artwork.liked } : artwork
      )
    );
  };

  const editArtwork = (id: number, newTitle: string, newArtist: string) => {
    setArtworks((prev) =>
      prev.map((artwork) =>
        artwork.id === id
          ? { ...artwork, title: newTitle, artist: newArtist }
          : artwork
      )
    );
  };

  const filteredArtworks = artworks
    .filter((artwork) => (filter === "liked" ? artwork.liked : true))
    .sort((a, b) => {
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }

      return b.createdAt - a.createdAt;
    });

  return (
    <div className="page">
      <div className="container">
        <header className="hero">
          <p className="tag">Interactive React + TypeScript SPA</p>
          <h1>Art Gallery</h1>
          <p className="subtitle">
            Lisa oma lemmik kunstiteosed, märgi lemmikuks, muuda ja sorteeri.
          </p>
        </header>

        <GalleryForm onAdd={addArtwork} />

        <div className="toolbar">
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "liked" ? "active" : ""}
              onClick={() => setFilter("liked")}
            >
              Liked
            </button>
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "az")}>
            <option value="newest">Newest first</option>
            <option value="az">Title A-Z</option>
          </select>
        </div>

        <GalleryList
          artworks={filteredArtworks}
          onDelete={deleteArtwork}
          onLike={toggleLike}
          onEdit={editArtwork}
        />
      </div>
    </div>
  );
}

export default App;