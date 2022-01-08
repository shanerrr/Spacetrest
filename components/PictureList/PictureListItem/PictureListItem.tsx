import React from 'react';
import Image from 'next/image';
interface IState {
  photoDetails: {
    copyright?: string,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string,
    show: boolean,
    colLength: number
  }
}

const PictureListItem = ({ photo, likes, onLikeClick, setModalDetails }: { photo: IState['photoDetails'], likes: { [key: string]: boolean }, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void, setModalDetails: (photo: IState['photoDetails']) => void }) => {

  return (
    <article key={photo.hdurl} className={`${photo.colLength === 1 ? 'col-span-1' : ''} ${photo.colLength === 2 ? 'col-span-2' : ''} shadow-md hover:shadow-2xl hover:transition-shadow rounded-[10px] p-4 animate-fadeInBottom cursor-pointer`} onClick={() => setModalDetails(photo)}>
      <div className='relative h-80 bg-white'>
        <Image className='rounded-[10px]' src={photo.title} loader={() => photo.url} layout='fill' objectFit='cover' />
        <div className='absolute -right-3 -bottom-4 h-max p-1 bg-white rounded-full cursor-pointer' onClick={(e) => onLikeClick(photo.hdurl, e)}>
          <i className={`${likes[photo.hdurl] ? 'uis uis-heart-alt text-red-900' : 'uil uil-heart '} transition-colors text-3xl`}></i>
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