import React from "react";
import Image from "next/legacy/image";

import type { image } from "../../../types/image.interface";

const PictureListItem = ({
  photo,
  lastGalleryItem,
  likes,
  onLikeClick,
  setModalDetails,
}: {
  photo: image;
  lastGalleryItem: (node: HTMLElement | null) => void;
  likes: { [key: string]: boolean };
  onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void;
  setModalDetails: (photo: image) => void;
}) => {
  return (
    <article
      ref={lastGalleryItem}
      className={`${
        photo.colLength === 1 ? "col-span-1" : "col-span-1 md:col-span-2"
      } bg-white rounded-xl p-4 animate-fadeInBottom cursor-pointer`}
      onClick={() => setModalDetails(photo)}
    >
      <div className="relative h-80">
        <Image
          placeholder="blur"
          alt={photo.date + " APOD"}
          className="rounded-xl"
          src={photo.title}
          loader={() => photo.url}
          layout="fill"
          objectFit="cover"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="
        />
        <div
          className="absolute right-2 bottom-2 h-10 w-10 p-1 bg-white rounded-full cursor-pointer flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-150"
          onClick={(e) => onLikeClick(photo.hdurl, e)}
        >
          <i
            className={`${
              likes[photo.hdurl]
                ? "fa-solid fa-heart text-red-900"
                : "fa-regular fa-heart"
            } transition-colors text-2xl hover:text-red-900`}
          />
        </div>
      </div>
      <div>
        <span className="text-xs">{photo.date}</span>
        <h1 className="font-semibold">{photo.title}</h1>
      </div>
    </article>
  );
};

export default PictureListItem;
