import React from 'react';
import Image from 'next/image';

interface pictureOfDay {
  copyright: string,
  date: string,
  explanation: string,
  hdurl: string,
  media_type: string,
  service_version: string,
  title: string,
  url: string,
  show: boolean
}

export default function PictureOfDay({ pictureOfDay, isLiked, onLikeClick }: { pictureOfDay: pictureOfDay, isLiked: boolean, onLikeClick: (url: string) => void }) {

  //to show information
  const [showPictureofDay, setShowPictureofDay] = React.useState(pictureOfDay.show);

  return (
    <>
      <Image src={pictureOfDay.title} loader={() => pictureOfDay.url} layout='fill' objectFit='cover' quality={100} priority={true} />

      <section className='absolute p-8 bottom-0 drop-shadow-2xl'>
        <div className='grid grid-cols-2 gap-4'>
          <div className={`bg-black/20 rounded-lg drop-shadow-2xl p-6 ${showPictureofDay ? 'visible' : 'invisible'}`}>
            <span className='text-white'>{new Date(pictureOfDay.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <h1 className='font-bold text-white text-7xl align-middle underline pt-1'><a href={pictureOfDay.hdurl} target='_blank'>{pictureOfDay.title}</a></h1>
            <p className='text-white font-medium pt-7'>{pictureOfDay.explanation}</p>
          </div>
          <div className='flex justify-end items-end'>
            <div className='flex opacity-50 hover:opacity-100'>
              <div className='rounded-full p-3 bg-white h-max mr-2 drop-shadow-2xl cursor-pointer' onClick={() => setShowPictureofDay(!showPictureofDay)}>
                <i className={`${showPictureofDay ? 'uil uil-eye-slash' : 'uil uil-eye'} text-4xl`}></i>
              </div>
              <div className='rounded-full p-3 bg-white h-max drop-shadow-2xl cursor-pointer' onClick={() => onLikeClick(pictureOfDay.hdurl)}>
                <i className={`${isLiked ? 'uis uis-heart-alt text-red-900' : 'uil uil-heart '} text-4xl`}></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
