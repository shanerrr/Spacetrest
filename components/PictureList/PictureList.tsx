import React from 'react';
import PictureListItem from './PictureListItem';
import PictureModal from '../Modal/PictureModal';
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

const PictureList = ({ list, listLoading, likes, onLikeClick }: { list: Array<IState['photoDetails']>, listLoading: boolean, likes: { [key: string]: boolean }, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void }) => {

  //local state
  const [modalDetails, setModalDetails] = React.useState<{ show: boolean, details: IState['photoDetails'] | null }>({ show: false, details: null });

  return (
    <>
      <section className="container mx-auto relative h-max py-10">
        {
          listLoading ?
            <div className='absolute top-0 left-2/4 animate-loader'>
              <i className="uil uil-star text-5xl text-white"></i>
              {/* <i className="uil uil-globe text-5xl text-white"></i> */}
            </div>
            :
            <div className='grid grid-flow-row-dense grid-cols-4 auto-rows-auto gap-5'>
              {
                list.map(photo => <PictureListItem key={photo.hdurl} photo={photo} likes={likes} onLikeClick={onLikeClick} setModalDetails={(details: IState['photoDetails']) => setModalDetails({ show: true, details })} />)
              }
            </div>
        }
      </section>

      <PictureModal modalDetails={modalDetails} likes={likes} onLikeClick={onLikeClick} closeModal={() => setModalDetails({ ...modalDetails, show: false })} />
    </>
  )
}

export default PictureList;