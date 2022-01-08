import React from 'react';
import Image from 'next/image';

interface imageResponse {
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

const PictureOfDay = ({ imageResponse, isLiked, onLikeClick }: { imageResponse: imageResponse, isLiked: boolean, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void }) => {

  //to show information
  const [showPictureofDay, setShowPictureofDay] = React.useState(imageResponse.show);

  return (
    <>
      <div className={`${showPictureofDay ? 'h-[94%]' : 'h-full'} relative`}>
        <Image className={`${showPictureofDay ? 'rounded-b-[30px]' : 'rounded-none'}  transition-all duration-300`} placeholder='blur' src={imageResponse.title} loader={() => imageResponse.hdurl} layout='fill' objectFit='cover' quality={100} priority={true} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=" />
      </div>

      <section className='absolute p-8 bottom-0 drop-shadow-2xl animate-fadeInBottom'>
        <div className='grid grid-cols-2 gap-4'>
          <div className={`bg-black/20 rounded-lg drop-shadow-2xl p-6 ${showPictureofDay ? 'visible' : 'invisible'}`}>
            <span className='text-white'>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <h1 className='font-bold text-white text-7xl align-middle underline pt-1'><a href={imageResponse.hdurl} target='_blank' rel="noreferrer">{imageResponse.title}</a></h1>
            <p className='text-white font-medium pt-7'>{imageResponse.explanation}</p>
          </div>
          <div className='flex justify-end items-end'>
            <div className='flex'>
              <div className='rounded-full p-3 bg-[#181A18] h-max mr-2 drop-shadow-2xl cursor-pointer' onClick={() => setShowPictureofDay(!showPictureofDay)}>
                <i className={`${showPictureofDay ? 'uil uil-eye-slash' : 'uil uil-eye'} text-4xl text-white`}></i>
              </div>
              <div className='rounded-full p-3 bg-[#181A18] h-max drop-shadow-2xl cursor-pointer' onClick={(e) => onLikeClick(imageResponse.hdurl, e)}>
                <i className={`${isLiked ? 'uis uis-heart-alt text-red-900' : 'uil uil-heart '} text-4xl text-white transition-colors`}></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PictureOfDay;