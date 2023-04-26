import React from "react";
import PictureListItem from "./PictureListItem";
import PictureModal from "../Modal/PictureModal";

import type { image } from "../../types/image.interface";

const PictureList = ({
  error,
  errorHandler,
  list,
  listLoading,
  lastGalleryItem,
  likes,
  onLikeClick,
  hostURI,
}: {
  error: boolean;
  errorHandler: () => void;
  list: Array<image>;
  listLoading: boolean;
  lastGalleryItem: (node: HTMLElement | null) => void;
  likes: { [key: string]: boolean };
  onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void;
  hostURI: string;
}) => {
  //local state
  const [modalDetails, setModalDetails] = React.useState<{
    show: boolean;
    details: image;
    length: number;
    hostURI: string;
  }>({ show: false, details: list[0], length: list.length, hostURI: hostURI });

  return (
    <>
      <section className="container mx-auto relative h-max">
        {/* our list */}
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-5 pt-5 md:pt-10 px-2 md:px-0">
          {list.map((photo, idx: number) => (
            <PictureListItem
              key={idx}
              photo={{ ...photo, idx: idx }}
              lastGalleryItem={
                list.length - 1 === idx ? lastGalleryItem : () => null
              }
              likes={likes}
              onLikeClick={onLikeClick}
              setModalDetails={(details: image) =>
                setModalDetails({
                  ...modalDetails,
                  show: true,
                  details,
                  length: list.length,
                })
              }
            />
          ))}
        </div>
        {/* loading element */}
        {listLoading && (
          <div className="mx-auto text-center py-5 md:py-10">
            <i className="fa-solid fa-star text-xl lg:text-3xl animate-loader text-white" />
          </div>
        )}
        {/* error element */}
        {error && (
          <div
            className="mx-auto text-center py-5 md:py-10 cursor-pointer"
            onClick={errorHandler}
          >
            <i className="fa-solid fa-exclamation text-xl lg:text-3xl text-red-500" />
            <h1 className="font-medium text-white text-sm pt-3">
              API call timed out (NASA APOD API). Click here to try again
            </h1>
          </div>
        )}
      </section>

      {/* details modal  */}
      <PictureModal
        modalDetails={modalDetails}
        likes={likes}
        onLikeClick={onLikeClick}
        arrowClick={(isLeftClick: boolean, index: number) =>
          setModalDetails({
            ...modalDetails,
            details: {
              ...list[isLeftClick ? index - 1 : index + 1],
              idx: isLeftClick ? index - 1 : index + 1,
            },
          })
        }
        closeModal={() => setModalDetails({ ...modalDetails, show: false })}
      />
    </>
  );
};

export default PictureList;
