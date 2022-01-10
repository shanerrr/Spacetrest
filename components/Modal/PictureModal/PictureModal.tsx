import React from 'react';
import Image from 'next/image';
import Modal from '..';

import type { image } from '../../../types/image.interface'

const PictureModal = ({ modalDetails, likes, onLikeClick, arrowClick, closeModal }: { modalDetails: { show: boolean, details: image, length: number, hostURI: string }, likes: { [key: string]: boolean }, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void, arrowClick: (isLeftClick: boolean, index: number) => void, closeModal: () => void }) => {

  //refs for animations
  const cardRef = React.useRef(null);
  const leftArrowRef = React.useRef(null);
  const rightArrowRef = React.useRef(null);
  //modal background
  const backdropRef = React.useRef(null);

  const [isCopied, setIsCopied] = React.useState(false);

  //animations for dekstop and mobile
  const animationOpen = false ? { duration: .5, bottom: 0 } : { duration: 0.5, top: '50%', left: '50%' };
  const animationClose = false ? { duration: .5, opacity: 0, bottom: -500, } : { duration: 0.5, top: '125%', left: '50%', opacity: 0 };

  //if they click x button
  const closeModalHandler = () => {
    //close modal animation
    gsap.to(leftArrowRef.current, { duration: .5, left: '-100%', ease: Power3.easeInOut, })
    gsap.to(rightArrowRef.current, { duration: .5, right: '-100%', ease: Power3.easeInOut, })
    gsap.to(cardRef.current, { ...animationClose, ease: Power3.easeInOut, onComplete: modalBackdropAnimation })
  }

  //this is to animate modal backdrop as a part of the animation cycle.
  const modalBackdropAnimation = () => {
    cardRef.current = null;
    gsap.to(backdropRef.current, { duration: .3, opacity: 0, ease: Power3.easeInOut, onComplete: closeModal });
  }

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) return await navigator.clipboard.writeText(text);
    else return document.execCommand('copy', true, text);
  }

  // onClick handler function for the copy button
  const handleCopyClick = (copyText: string) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        setIsCopied(false);
        console.log(err);
      });
  }

  //to attach the animation upon component mount
  React.useEffect(() => {
    if (modalDetails.show) {
      //modal open animation
      gsap.to(cardRef.current, { ...animationOpen, ease: Power3.easeInOut })
      gsap.to(leftArrowRef.current, { duration: .5, left: '5%', ease: Power3.easeInOut })
      gsap.to(rightArrowRef.current, { duration: .5, right: '5%', ease: Power3.easeInOut })
    }
  }, [modalDetails.show]);

  return (
    <Modal show={modalDetails.show} backdropRef={backdropRef}>

      {/* back button - not on first photo */}
      <div ref={leftArrowRef} className={`absolute left-0 top-1/2 cursor-pointer z-30 ${modalDetails.details?.idx === 0 ? 'invisible' : 'visible'}`} onClick={() => arrowClick(true, modalDetails.details?.idx)}>
        <i className="uis uis-arrow-circle-left text-white text-6xl"></i>
      </div>

      <main ref={cardRef} className='bg-white absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 h-3/4 w-3/4 rounded-[10px]'>

        <div className='grid grid-cols-3 h-[100%] gap-6'>
          {/* image side */}
          <section className='relative h-full col-span-2'>
            <Image placeholder='blur' className='rounded-tl-lg rounded-bl-lg' src={modalDetails.details?.title} loader={() => modalDetails.details?.url} layout='fill' objectFit='cover' blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=" />
          </section>

          {/* details side */}
          <section className='relative flex justify-center items-center pr-5 overflow-y-auto'>
            {/* x icon */}
            <div title='Close' className='absolute top-2 right-2 cursor-pointer' onClick={closeModalHandler}>
              <i className="uis uis-times text-4xl"></i>
            </div>

            {/* description */}
            <div>
              <h1 className='font-bold text-4xl'>{modalDetails.details?.title}</h1>
              <span className='text-sm'>{modalDetails.details?.date}</span>
              <p className='mt-6 overflow-y-auto h-2/4'>{modalDetails.details?.explanation}</p>
            </div>

            {/* heart and share icon */}
            <div className='absolute bottom-0 flex justify-center py-4 w-full border-t-2 bg-white item'>
              <div title="Like" onClick={(e) => onLikeClick(modalDetails.details.hdurl, e)}>
                <i className={`${likes[modalDetails?.details?.hdurl] ? 'uis uis-heart-alt text-red-900' : 'uil uil-heart '} hover:text-red-900 text-4xl cursor-pointer transition-colors`}></i>
              </div>
              <div title="Share" className='relative' onClick={(e) => handleCopyClick(`${modalDetails.hostURI}/photo/${modalDetails.details.date}`)}>
                {isCopied && <span className='pr-3 absolute -left-5 -top-10 w-max p-2 bg-blue-900 rounded-[10px] text-white font-medium animate-fadeInBottom'>Link copied!</span>}
                <i className="pl-3 uil uil-share text-4xl cursor-pointer hover:text-blue-900"></i>
              </div>
            </div>
          </section>

        </div>
      </main>

      <div ref={rightArrowRef} className={`absolute right-0 top-1/2 cursor-pointer z-30 ${modalDetails.details?.idx === modalDetails.length - 1 ? 'invisible' : 'visible'}`} onClick={() => arrowClick(false, modalDetails.details?.idx)}>
        <i className="uis uis-arrow-circle-right text-white text-6xl"></i>
      </div>


    </Modal>
  )
}

export default PictureModal;