import React from 'react';
import PictureListItem from './PictureListItem';
import PictureModal from '../Modal/PictureModal';

import type { image } from '../../types/image.interface';

const PictureList = ({ list, listLoading, lastGalleryItem, likes, onLikeClick, hostURI }: { list: Array<image>, listLoading: boolean, lastGalleryItem: (node: HTMLElement | null) => void, likes: { [key: string]: boolean }, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void, hostURI: string }) => {

  //local state
  const [modalDetails, setModalDetails] = React.useState<{ show: boolean, details: image, length: number, hostURI: string }>({ show: false, details: list[0], length: list.length, hostURI: hostURI });

  return (
    <>
      <section className="container mx-auto relative h-max">
        <div className='grid grid-flow-row-dense grid-cols-4 auto-rows-auto gap-5 pt-10'>
          {
            list.map((photo, idx: number) => <PictureListItem key={idx} photo={{ ...photo, idx: idx }} lastGalleryItem={list.length - 1 === idx ? lastGalleryItem : () => null} likes={likes} onLikeClick={onLikeClick} setModalDetails={(details: image) => setModalDetails({ ...modalDetails, show: true, details, length: list.length })} />)
          }
        </div>
        {listLoading && <div className='mx-auto text-center py-10'><i className="inline-block uil uil-star text-5xl animate-loader text-white"></i></div>}
      </section>

      {/* details modal  */}
      <PictureModal
        modalDetails={modalDetails}
        likes={likes}
        onLikeClick={onLikeClick}
        arrowClick={(isLeftClick: boolean, index: number) => setModalDetails({ ...modalDetails, details: { ...list[isLeftClick ? index - 1 : index + 1], idx: isLeftClick ? index - 1 : index + 1 } })}
        closeModal={() => setModalDetails({ ...modalDetails, show: false })}
      />
    </>
  )
}

export default PictureList;