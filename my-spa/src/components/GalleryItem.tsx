import { useState } from "react";
import type { Artwork } from "../types";

type Props = {
  artwork: Artwork;
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onEdit: (id: number, title: string, artist: string) => void;
};

export default function GalleryItem({
  artwork,
  onDelete,
  onLike,
  onEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(artwork.title);
  const [editArtist, setEditArtist] = useState(artwork.artist);

  const saveEdit = () => {
    if (!editTitle.trim() || !editArtist.trim()) {
      return;
    }

    onEdit(artwork.id, editTitle, editArtist);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <input
            className="edit-input"
            value={editArtist}
            onChange={(e) => setEditArtist(e.target.value)}
          />

          <div className="actions">
            <button onClick={saveEdit}>Save</button>
            <button className="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="image-placeholder">🖼️</div>

          <h3>{artwork.title}</h3>
          <p>{artwork.artist}</p>

          <div className="actions">
            <button className="like" onClick={() => onLike(artwork.id)}>
              {artwork.liked ? "❤️" : "🤍"}
            </button>

            <button className="secondary" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button className="delete" onClick={() => onDelete(artwork.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}