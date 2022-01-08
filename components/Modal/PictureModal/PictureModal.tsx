import React from 'react';
import Image from 'next/image';
import Modal from '..';

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

const PictureModal = ({ modalDetails, likes, onLikeClick, closeModal }: { modalDetails: { show: boolean, details: IState['photoDetails'] }, likes: { [key: string]: boolean }, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void, closeModal: () => void }) => {

  return (
    <Modal show={modalDetails.show}>
      <main className='bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 h-3/4 w-3/4 rounded-[10px]'>
        <div className='grid grid-cols-3 h-[100%] gap-6'>

          {/* image side */}
          <section className='relative h-full col-span-2'>
            <Image placeholder='blur' className='rounded-tl-lg rounded-bl-lg' src={modalDetails?.details?.title} loader={() => modalDetails?.details?.url} layout='fill' objectFit='cover' blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=" />
          </section>

          {/* details side */}
          <section className='relative flex justify-center items-center pr-5 overflow-y-auto'>
            <div>
              {/* description */}
              <h1 className='font-bold text-4xl'>{modalDetails.details?.title}</h1>
              <span className='text-sm'>{modalDetails.details?.date}</span>
              <p className='mt-6 overflow-auto'>{modalDetails.details?.explanation}</p>

              {/* heart icon */}
              <div title="Like" className='py-4' onClick={(e) => onLikeClick(modalDetails.details.hdurl, e)}>
                <i className={`${likes[modalDetails?.details?.hdurl] ? 'uis uis-heart-alt text-red-900' : 'uil uil-heart '} hover: text-4xl cursor-pointer transition-colors`}></i>
              </div>
            </div>

            {/* x icon */}
            <div title='Close' className='absolute top-1 right-1 cursor-pointer' onClick={closeModal}>
              <i className="uis uis-times text-4xl"></i>
            </div>
          </section>

        </div>
      </main>
    </Modal>
  )
}

export default PictureModal;