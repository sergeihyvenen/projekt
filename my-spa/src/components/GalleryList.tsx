import type { Artwork } from "../types";
import GalleryItem from "./GalleryItem";

type Props = {
  artworks: Artwork[];
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onEdit: (id: number, title: string, artist: string) => void;
};

export default function GalleryList({
  artworks,
  onDelete,
  onLike,
  onEdit,
}: Props) {
  if (artworks.length === 0) {
    return (
      <div className="empty">
        <h2>Pole andmeid</h2>
        <p>Lisa esimene kunstiteos vormi kaudu.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {artworks.map((artwork) => (
        <GalleryItem
          key={artwork.id}
          artwork={artwork}
          onDelete={onDelete}
          onLike={onLike}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}