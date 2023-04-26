import React from "react";
import Image from "next/legacy/image";
import Modal from "..";

import useIsSmallDevice from "../../../hooks/useIsSmallDevice";

import type { image } from "../../../types/image.interface";

const PictureModal = ({
  modalDetails,
  likes,
  onLikeClick,
  arrowClick,
  closeModal,
}: {
  modalDetails: {
    show: boolean;
    details: image;
    length: number;
    hostURI: string;
  };
  likes: { [key: string]: boolean };
  onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void;
  arrowClick: (isLeftClick: boolean, index: number) => void;
  closeModal: () => void;
}) => {
  //refs for animations
  const cardRef = React.useRef(null);
  const leftArrowRef = React.useRef(null);
  const rightArrowRef = React.useRef(null);
  //modal background
  const backdropRef = React.useRef(null);

  //custom hook that checks viewport width
  const isSmallDevice = useIsSmallDevice();

  //state to send user if link was copied
  const [isCopied, setIsCopied] = React.useState(false);
  //animations for dekstop and mobile
  const animationsOpenMap = {
    SMALL: { duration: 0.5, bottom: 0 },
    LARGE: { duration: 0.5, top: "50%", left: "50%" },
  };
  const animationsCloseMap = {
    SMALL: { duration: 0.5, opacity: 0, bottom: -500 },
    LARGE: { duration: 0.5, top: "125%", left: "50%", opacity: 0 },
  };

  //if they click x button
  const closeModalHandler = () => {
    //close modal animation
    gsap.to(leftArrowRef.current, {
      duration: 0.5,
      left: "-100%",
      ease: Power3.easeInOut,
    });
    gsap.to(rightArrowRef.current, {
      duration: 0.5,
      right: "-100%",
      ease: Power3.easeInOut,
    });
    gsap.to(cardRef.current, {
      ...animationsCloseMap[isSmallDevice ? "SMALL" : "LARGE"],
      ease: Power3.easeInOut,
      onComplete: modalBackdropAnimation,
    });
  };

  //this is to animate modal backdrop as a part of the animation cycle.
  const modalBackdropAnimation = () => {
    cardRef.current = null;
    gsap.to(backdropRef.current, {
      duration: 0.3,
      opacity: 0,
      ease: Power3.easeInOut,
      onComplete: closeModal,
    });
  };

  const copyTextToClipboard = async (text: string) => {
    if ("clipboard" in navigator)
      return await navigator.clipboard.writeText(text);
    else return document.execCommand("copy", true, text);
  };

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
      .catch(() => setIsCopied(false));
  };

  //to attach the animation upon component mount
  React.useEffect(() => {
    if (modalDetails.show) {
      //modal open animation
      gsap.to(cardRef.current, {
        ...animationsOpenMap[isSmallDevice ? "SMALL" : "LARGE"],
        ease: Power3.easeInOut,
      });
      gsap.to(leftArrowRef.current, {
        duration: 0.5,
        left: "5%",
        ease: Power3.easeInOut,
      });
      gsap.to(rightArrowRef.current, {
        duration: 0.5,
        right: "5%",
        ease: Power3.easeInOut,
      });
    }
  }, [modalDetails.show, isSmallDevice]);

  return (
    <Modal show={modalDetails.show} backdropRef={backdropRef}>
      {/* back button - exclude on first photo */}
      <button
        type="button"
        ref={leftArrowRef}
        className={`absolute left-0 top-[18%] md:top-1/2 cursor-pointer z-30 ${
          modalDetails.details?.idx === 0 ? "invisible" : "visible"
        }`}
        onClick={() => arrowClick(true, modalDetails.details?.idx)}
      >
        <i className="fa-solid fa-left text-white text-4xl md:text-5xl" />
      </button>

      <main
        ref={cardRef}
        className="bg-white absolute rounded-t-[10px] -bottom-96 md:bottom-auto h-[95%] md:top-full md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:h-3/4 md:w-3/4 md:rounded-[10px]"
      >
        <div className="grid grid-cols-1 grid-rows-3 gap-0 h-full md:grid-cols-3 md:grid-rows-none md:gap-6">
          {/* image side */}
          <section className="relative h-full col-span-2 md:col-span-1 xl:col-span-2 row-span-1">
            <Image
              placeholder="blur"
              className="rounded-t-[10px] md:rounded-l-[10px] md:rounded-r-none"
              alt={modalDetails.details?.date + " APOD"}
              src={modalDetails.details?.title}
              loader={() => modalDetails.details?.url}
              layout="fill"
              objectFit="cover"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="
            />
          </section>

          {/* details side */}
          <section className="relative flex justify-center items-center p-5 md:pr-5 md:pl-0 row-span-2 md:row-span-1 md:col-span-2 xl:col-span-1 overflow-y-hidden">
            {/* description */}
            <div className="h-full">
              {/* <div> */}
              <div className="flex justify-between">
                <div>
                  <h1 className="font-bold text:3xl md:text-4xl">
                    {modalDetails.details?.title}
                  </h1>
                  <span className="text-sm">{modalDetails.details?.date}</span>
                </div>
                {/* x icon */}
                <button
                  type="button"
                  title="Close"
                  className="self-start hover:rotate-90 duration-150 transition-all hover:text-red-700"
                  onClick={closeModalHandler}
                >
                  <i className="fa-regular fa-xmark text-2xl" />
                </button>
              </div>
              <p className="mt-6 overflow-y-auto h-4/6">
                {modalDetails.details?.explanation}
              </p>
            </div>

            {/* heart and share icon */}
            <div className="fixed md:absolute bottom-0 flex gap-3 justify-center py-4 w-full border-t bg-white item">
              <button
                type="button"
                className="flex justify-center"
                title="Like"
                onClick={(e) => onLikeClick(modalDetails.details.hdurl, e)}
              >
                <i
                  className={`${
                    likes[modalDetails?.details?.hdurl]
                      ? "fa-solid fa-heart text-red-900"
                      : "fa-regular fa-heart"
                  } transition-colors text-2xl hover:text-red-900`}
                />
              </button>
              <button
                type="button"
                title="Share"
                className="relative"
                onClick={(e) =>
                  handleCopyClick(
                    `${modalDetails.hostURI}/photo/${modalDetails.details.date}`
                  )
                }
              >
                {isCopied && (
                  <span className="pr-3 absolute -left-5 -top-10 w-max p-2 bg-blue-900 rounded-[10px] text-white font-medium animate-fadeInBottom">
                    Link copied to clipboard!
                  </span>
                )}
                <i className="fa-regular fa-share hover:text-blue-900 text-2xl" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* next button - exclude on last photo of list */}
      <button
        type="button"
        ref={rightArrowRef}
        className={`absolute right-0 top-[18%] md:top-1/2 cursor-pointer z-30 ${
          modalDetails.details?.idx === modalDetails.length - 1
            ? "invisible"
            : "visible"
        }`}
        onClick={() => arrowClick(false, modalDetails.details?.idx)}
      >
        <i className="fa-solid fa-right text-white text-4xl md:text-5xl" />
      </button>
    </Modal>
  );
};

export default PictureModal;
