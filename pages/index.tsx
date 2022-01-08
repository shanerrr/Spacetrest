import React from 'react';
import Head from 'next/head';
import PictureOfDay from '../components/PictureOfDay';
import PictureList from '../components/PictureList';
import Image from 'next/image';

import type { NextPage, GetServerSideProps } from 'next';
import { ImageService } from '../services/image';

interface IState {
  imageResponse: {
    copyright: string,
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

const Home: NextPage<{ imageResponse: IState['imageResponse'] }> = ({ imageResponse }: { imageResponse: IState['imageResponse'] }) => {

  //state that captures our likes (will be using a set using url as unique key)
  const [likes, setLikes] = React.useState<{ [key: string]: boolean }>({});
  const [photos, setPhotos] = React.useState({ loading: true, list: Array<IState['imageResponse']>() });

  //handler that deals with clicking the like button
  const likeHandler = (url: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    //update the state
    setLikes({ ...likes, [url]: !!!likes[url] });

    //write to local storage also so we can hydrate state again with previous likes when user refreshes/comes back.
    localStorage.setItem('likes', JSON.stringify({ ...likes, [url]: !!!likes[url] }))
  }

  //on component mount, fetch local storage on likes and fetch the other images
  React.useEffect(() => {

    //api call getting all images of days for 30 days
    const fetchPhotos = async () => {
      const startDate = new Date()
      new ImageService().getPictureOfDay(new Date(startDate.getFullYear(), startDate.getMonth() - 2, startDate.getDate()).toISOString().split('T')[0], new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1).toISOString().split('T')[0])
        .then(res => setPhotos({ ...photos, loading: false, list: res.data.map((v: IState['imageResponse']) => ({ ...v, colLength: Math.floor(Math.random() * 2) + 1 })).filter((image: IState['imageResponse']) => image.media_type === "image").reverse() }))
    }

    setLikes(localStorage.hasOwnProperty('likes') ? JSON.parse(String(localStorage.getItem('likes'))) : []);
    // fetchPhotos();

  }, []);

  return (
    <>
      <Head>
        <title>Spacestagram: Image-sharing from the final frontier</title>
        <meta name="description" content="Images about the universe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='snap-y snap-mandatory h-max bg-[#181A18]'>
        {/* our main page (Picture of the day)*/}
        <section className='h-screen relative align-middle snap-center'>
          <PictureOfDay imageResponse={imageResponse} isLiked={likes[imageResponse.hdurl]} onLikeClick={(url: string, event: React.MouseEvent<HTMLElement>) => likeHandler(url, event)} />
        </section>

        {/* our gallery component */}
        <section className='h-max relative align-middle snap-center'>
          <PictureList listLoading={photos.loading} list={photos.list} likes={likes} onLikeClick={likeHandler} />
        </section>


        {!photos.loading && <footer className='mb-3 opacity-25 hover:opacity-100 bg-[#181A18]'>
          <a className='flex justify-center items-center' href="https://github.com/shanerrr" target="_blank" rel="noopener noreferrer">
            <Image src='/github.png' height={32} width={32} />
          </a>
        </footer>}

      </main>
    </>
  )
}

export default Home;

//server data fetching
export const getServerSideProps: GetServerSideProps = async () => {

  return {
    props: {
      imageResponse: { ...(await new ImageService().getPictureOfDay()).data, show: true },
    },
  };
};