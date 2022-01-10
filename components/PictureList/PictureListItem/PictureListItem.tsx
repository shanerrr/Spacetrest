import React from 'react';
import Image from 'next/image';

import type { image } from '../../../types/image.interface';

const PictureListItem = ({ photo, lastGalleryItem, likes, onLikeClick, setModalDetails }: { photo: image, lastGalleryItem: (node: HTMLElement | null) => void, likes: { [key: string]: boolean }, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void, setModalDetails: (photo: image) => void }) => {
  
  return (
    <article ref={lastGalleryItem} className={`${photo.colLength === 1 ? 'col-span-1' : ''} ${photo.colLength === 2 ? 'col-span-2' : ''} bg-white rounded-[10px] p-4 animate-fadeInBottom cursor-pointer`} onClick={() => setModalDetails(photo)}>
      <div className='relative h-80'>
        <Image placeholder="blur" className='rounded-[10px]' src={photo.title} loader={() => photo.url} layout='fill' objectFit='cover' blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=" />
        <div className='absolute -right-3 -bottom-4 h-max p-1 bg-white rounded-full cursor-pointer' onClick={(e) => onLikeClick(photo.hdurl, e)}>
          <i className={`${likes[photo.hdurl] ? 'uis uis-heart-alt text-red-900' : 'uil uil-heart '} transition-colors text-3xl hover:text-red-900`}></i>
        </div>
      </div>
      <div>
        <span className='text-xs'>{photo.date}</span>
        <h1 className='font-medium'>{photo.title}</h1>
      </div>
    </article>
  )
}

export default PictureListItem;