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

const PictureModal = ({ modalDetails, closeModal }: { modalDetails: { show: boolean, details: IState['photoDetails'] | null }, closeModal: () => void }) => {

  return (
    <Modal show={modalDetails.show}>
      <main className='bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 h-3/4 w-3/4 rounded-[10px]'>
        <div className='grid grid-cols-3 h-[100%] gap-6'>

          {/* image side */}
          <section className='relative h-full col-span-2'>
            <Image className='rounded-tl-lg rounded-bl-lg' src={modalDetails?.details?.title} loader={() => modalDetails?.details?.url} layout='fill' objectFit='cover' />
          </section>

          {/* details side */}
          <section className='relative flex justify-center items-center pr-5'>
            <div>
              <h1 className='font-bold text-4xl'>{modalDetails.details?.title}</h1>
              <span className='text-sm'>{modalDetails.details?.date}</span>
              <p className='mt-6'>{modalDetails.details?.explanation}</p>
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