import React from 'react';
import Head from 'next/head';
import PictureOfDay from '../components/PictureOfDay';
import PictureList from '../components/PictureList';

import type { NextPage, GetServerSideProps } from 'next';
import { ImageService } from '../services/image';

interface IState {
  pictureOfDay: {
    copyright: string,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string,
    show: boolean
  },
  pictures: {
    href: string,
    items: Array<>,
    links: [],
    metadata: object
    version: string
  }
}

const Home: NextPage<{ pictureOfDay: IState['pictureOfDay'] }> = ({ pictureOfDay }: { pictureOfDay: IState['pictureOfDay'] }) => {

  //state that captures our likes (will be using a set using url as unique key)
  const [likes, setLikes] = React.useState<{ [key: string]: boolean }>({});
  const [photos, setPhotos] = React.useState({ loading: true, list: [] });

  //handler that deals with clicking the like button
  const likeHandler = (url: string) => {
    //update the state
    setLikes({ ...likes, [url]: !!!likes[url] });

    //write to local storage also so we can hydrate state again with previous likes when user refreshes/comes back.
    localStorage.setItem('likes', JSON.stringify({ ...likes, [url]: !!!likes[url] }))
  }

  //on component mount, fetch local storage on likes and fetch the other images
  React.useEffect(() => {

    //api call
    const fetchPhotos = async () => {
      new ImageService().getGeneralPhotos(Math.floor(Math.random() * 50))
        .then(res => {

        })
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

      {/* our main page (Picture of the day)*/}
      <section className='h-screen relative shadow-inner align-middle'>
        <PictureOfDay pictureOfDay={pictureOfDay} isLiked={likes[pictureOfDay.hdurl]} onLikeClick={(url: string) => likeHandler(url)} />
      </section>

      {/* our gallery component */}
      <section className='h-screen relative align-middle'>
        <PictureList onLikeClick={likeHandler} />
      </section>


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
      pictureOfDay: { ...(await new ImageService().getPictureOfDay()).data, show: true },
    },
  };
};