import React from 'react';
import Head from 'next/head';
import PictureOfDay from '../../../components/PictureOfDay';

import { ImageService } from '../../../services/image';

import type { GetServerSideProps } from 'next';
import type { image } from '../../../types/image.interface';

const PhotoOfDate = ({ imageResponse }: { imageResponse: image }) => {

  //state that captures our likes (will be using a set using url as unique key)
  const [likes, setLikes] = React.useState<{ [key: string]: boolean }>({});

  //handler that deals with clicking the like button
  const likeHandler = (url: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    //update the state
    setLikes({ ...likes, [url]: !!!likes[url] });

    //write to local storage also so we can hydrate state again with previous likes when user refreshes/comes back.
    localStorage.setItem('likes', JSON.stringify({ ...likes, [url]: !!!likes[url] }))
  }

  //on component mount, fetch local storage on likes
  React.useEffect(() => setLikes(localStorage.hasOwnProperty('likes') ? JSON.parse(String(localStorage.getItem('likes'))) : []), []);

  return (
    <>
      <Head>
        <title>Spacetrest: {imageResponse.date} Picture of the day</title>
        <meta name="description" content="Images about the universe" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className='snap-y snap-mandatory h-max bg-[#181A18]'>
        {/* our main page (Picture of the day)*/}
        <section className='h-screen relative align-middle snap-center'>
          <PictureOfDay imageResponse={imageResponse} isLiked={likes[imageResponse.hdurl]} onLikeClick={(url: string, event: React.MouseEvent<HTMLElement>) => likeHandler(url, event)} scrollToGallery={undefined} />
        </section>
      </main>
    </>
  )
}


export default PhotoOfDate;

//server data fetching
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  if (ctx.params?.date) {
    return {
      props: {
        imageResponse: { ...(await new ImageService().getSpecificImageOfDay(ctx.params.date)).data, show: true },
      },
    };
  }
  else {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
};