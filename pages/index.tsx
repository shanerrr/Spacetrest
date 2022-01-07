import React from 'react';
import Head from 'next/head';
import PictureOfDay from '../components/PictureOfDay';
import PictureList from '../components/PictureList';

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
    colLength?: number
  }
}

const Home: NextPage<{ imageResponse: IState['imageResponse'] }> = ({ imageResponse }: { imageResponse: IState['imageResponse'] }) => {

  //state that captures our likes (will be using a set using url as unique key)
  const [likes, setLikes] = React.useState<{ [key: string]: boolean }>({});
  const [photos, setPhotos] = React.useState({ loading: true, list: Array<IState['imageResponse']>() });

  //handler that deals with clicking the like button
  const likeHandler = (url: string) => {
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
      new ImageService().getPictureOfDay(new Date(startDate.getFullYear(), startDate.getMonth() - 1, startDate.getDate()).toISOString().split('T')[0], new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1).toISOString().split('T')[0])
        .then(res => setPhotos({ ...photos, loading: false, list: res.data.map((v: IState['imageResponse']) => ({ ...v, colLength: Math.floor(Math.random() * 3) + 1 })).filter((image: IState['imageResponse']) => image.media_type === "image").reverse() }))
    }

    setLikes(localStorage.hasOwnProperty('likes') ? JSON.parse(String(localStorage.getItem('likes'))) : []);
    fetchPhotos();

  }, [])

  return (
    <>
      <Head>
        <title>The Universe in Motion</title>
        <meta name="description" content="Images about the universe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='snap-y'>
        {/* our main page (Picture of the day)*/}
        <section className='h-screen relative shadow-inner align-middle snap-start'>
          <PictureOfDay imageResponse={imageResponse} isLiked={likes[imageResponse.hdurl]} onLikeClick={(url: string) => likeHandler(url)} />
        </section>

        {/* our gallery component */}
        <section className='h-screen relative align-middle snap-start'>
          <PictureList listLoading={photos.loading} list={photos.list} likes={likes} onLikeClick={likeHandler} />
        </section>
      </main>


      {/* <footer className=''>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className=''>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </>
  )
}

export default Home;

//server data fetching
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      imageResponse: { ...(await new ImageService().getPictureOfDay()).data[0], show: true },
    },
  };
};