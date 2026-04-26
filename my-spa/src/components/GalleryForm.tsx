import { useState } from "react";

type Props = {
  onAdd: (title: string, artist: string) => void;
};

export default function GalleryForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !artist.trim()) {
      return;
    }

    onAdd(title, artist);
    setTitle("");
    setArtist("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Artwork title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}