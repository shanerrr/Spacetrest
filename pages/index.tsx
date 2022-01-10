import React from 'react';
import Head from 'next/head';
import PictureOfDay from '../components/PictureOfDay';
import PictureList from '../components/PictureList';

import { ImageService } from '../services/image';

import type { image } from '../types/image.interface';
import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage<{ imageResponse: image }> = ({ imageResponse }: { imageResponse: image }) => {

  //state that captures our likes (will be using a set using url as unique key)
  const [likes, setLikes] = React.useState<{ [key: string]: boolean }>({});
  //state that captures our results from endpoint
  const [photos, setPhotos] = React.useState({ loading: true, list: Array<image>() });
  //state that captures our infinte scroll page number pagination.
  const [pageNumber, setPageNumber] = React.useState(0);

  //ref that captures our gallery element
  const galleryRef = React.useRef<HTMLHeadingElement | null>(null);

  //deals with our infinite scroll api calls
  const observer = React.useRef<IntersectionObserver | null>(null);
  const lastGalleryItem = React.useCallback((node: HTMLElement | null) => {
    if (photos.loading) return;
    if (observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPageNumber(prevPageNumber => prevPageNumber + 1);
    }))
      if (node) observer.current.observe(node);
  }, [photos.loading])

  //handler that deals with clicking the like button
  const likeHandler = (url: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    //update the state
    setLikes({ ...likes, [url]: !!!likes[url] });

    //write to local storage also so we can hydrate state again with previous likes when user refreshes/comes back.
    localStorage.setItem('likes', JSON.stringify({ ...likes, [url]: !!!likes[url] }))
  }

  //handler to scroll to gallery
  const scrollIntoView = () => galleryRef.current?.scrollIntoView({ behavior: 'smooth' });

  //on component mount, fetch local storage on likes
  React.useEffect(() => setLikes(localStorage.hasOwnProperty('likes') ? JSON.parse(String(localStorage.getItem('likes'))) : []), []);

  //on component mount, fetch the other images
  //api call getting all images of days for 30 days
  React.useEffect(() => {
    setPhotos({ ...photos, loading: true });
    const startDate = new Date();
    new ImageService().getPictureOfDay(new Date(startDate.getFullYear(), startDate.getMonth() - (pageNumber + 1), startDate.getDate()).toISOString().split('T')[0], new Date(startDate.getFullYear(), startDate.getMonth() - pageNumber, startDate.getDate() - 1).toISOString().split('T')[0])
      .then(res => setPhotos(prev => ({ loading: false, list: [...prev.list, ...res.data.map((v: image) => ({ ...v, colLength: Math.floor(Math.random() * 2) + 1 })).filter((image: image) => image.media_type === "image").reverse()] })))
  }, [pageNumber]);

  return (
    <>
      <Head>
        <title>Spacetrest: Image-sharing from the final frontier</title>
        <meta name="description" content="Images about the universe" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className='snap-y snap-mandatory h-max bg-[#181A18]'>
        {/* our main page (Picture of the day)*/}
        <section className='h-screen relative align-middle snap-center'>
          <PictureOfDay imageResponse={imageResponse} isLiked={likes[imageResponse.hdurl]} onLikeClick={(url: string, event: React.MouseEvent<HTMLElement>) => likeHandler(url, event)} scrollToGallery={scrollIntoView} />
        </section>

        {/* our gallery component */}
        <section ref={galleryRef} className='h-max relative align-middle snap-center'>
          <PictureList listLoading={photos.loading} list={photos.list} lastGalleryItem={lastGalleryItem} likes={likes} onLikeClick={likeHandler} />
        </section>

        {/* {!photos.loading && <footer className='pb-3 opacity-25 hover:opacity-100 bg-[#181A18]'>
          <a className='flex justify-center items-center' href="https://github.com/shanerrr" target="_blank" rel="noopener noreferrer">
            <Image src='/github.png' height={32} width={32} />
          </a>
        </footer>} */}

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