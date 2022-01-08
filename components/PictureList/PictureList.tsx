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

  // const [test] = React.useState([
  //   {
  //     "date": "2021-12-07",
  //     "explanation": "very time two massive black holes collide, a loud chirping sound is broadcast out into the universe in gravitational waves. Humanity has only had the technology to hear these unusual chirps for the past seven years, but since then we have heard about 90 -- during the first three observing runs. Featured above are the spectrograms -- plots of gravitational-wave frequency versus time -- of these 90 as detected by the giant detectors of LIGO (in the USA), VIRGO (in Europe), and KAGRA (in Japan). The more energy received on Earth from a collision, the brighter it appears on the graphic. Among many science firsts, these gravitational-radiation chirps are giving humanity an unprecedented inventory of black holes and neutron stars, and a new way to measure the expansion rate of our universe. A fourth gravitational wave observing run with increased sensitivity is currently planned to begin in 2022 December.",
  //     "hdurl": "https://apod.nasa.gov/apod/image/2112/GWaveCatalog_LigoVirgo_5692.jpg",
  //     "media_type": "image",
  //     "service_version": "v1",
  //     "title": "Ninety Gravitational Wave Spectrograms and Counting",
  //     "url": "https://apod.nasa.gov/apod/image/2112/GWaveCatalog_LigoVirgo_1080.jpg",
  //     show: true,
  //     colLength: Math.floor(Math.random() * 3) + 1
  //   },
  //   {
  //     "copyright": "Col Druscie Obs.AAC",
  //     "date": "2021-12-08",
  //     "explanation": "Comet Hale-Bopp, the Great Comet of 1997, became much brighter than any surrounding stars. It was seen even over bright city lights. Away from city lights, however, it put on quite a spectacular show. Here Comet Hale-Bopp was photographed above Val Parola Pass in the Dolomite mountains surrounding Cortina d'Ampezzo, Italy. Comet Hale-Bopp's blue ion tail, consisting of ions from the comet's nucleus, is pushed out by the solar wind. The white dust tail is composed of larger particles of dust from the nucleus driven by the pressure of sunlight, that orbit behind the comet. Comet Hale-Bopp (C/1995 O1) remained visible to the unaided eye for 18 months -- longer than any other comet in recorded history. The large comet is next expected to return around the year 4385.  This month, Comet Leonard is brightening and may soon become visible to the unaided eye.",
  //     "hdurl": "https://apod.nasa.gov/apod/image/2112/halebopp_dimai_960.jpg",
  //     "media_type": "image",
  //     "service_version": "v1",
  //     "title": "Comet Hale-Bopp Over Val Parola Pass",
  //     "url": "https://apod.nasa.gov/apod/image/2112/halebopp_dimai_960.jpg",
  //     show: true,
  //     colLength: Math.floor(Math.random() * 3) + 1
  //   },
  //   {
  //     "copyright": "JM Pasachoff Antarctic Expedition",
  //     "date": "2021-12-09",
  //     "explanation": "Few were able to stand in the Moon's shadow and watch the December 4 total eclipse of the Sun. Determined by celestial mechanics and not geographical boundaries, the narrow path of totality tracked across planet Earth's relatively inaccessible southernmost continent. Still, some enthusiastic and well-insulated eclipse chasers were rewarded with the dazzling spectacle in Antarctica's cold but clear skies. Taken just before the brief totality began, this image from a ground-based telescope inside the edge of the shadow path at Union Glacier catches a glimmer of sunlight near the top of the silhouetted lunar disk. Look closely for the pinkish solar prominences arcing above the Sun's limb. During totality, the magnificent solar corona, the Sun's outer atmosphere, made its much anticipated appearance, seen in the composite view streaming far from the Sun's edge.",
  //     "hdurl": "https://apod.nasa.gov/apod/image/2112/SOLARECLIPSE2021FORDISTROHighRes.jpg",
  //     "media_type": "image",
  //     "service_version": "v1",
  //     "title": "A Total Eclipse of the Sun",
  //     "url": "https://apod.nasa.gov/apod/image/2112/SOLARECLIPSE2021FORDISTROHighRes1024.jpg",
  //     show: true,
  //     colLength: Math.floor(Math.random() * 3) + 1
  //   },
  //   {
  //     "copyright": "Stephanie Ziyi Ye",
  //     "date": "2021-12-10",
  //     "explanation": "During polar day, in Arctic and Antarctic summer, the Sun stays above the horizon for periods of 24 hours or more. Recorded on December 4, this fisheye timelapse image tracks the Sun in multiple frames as it completes a circle in the summer sky above Union Glacier, Antarctica. Of course on that date, Union Glacier's sky did grow dark even though the Sun was above the horizon. Captured during the brief period of totality, an eclipsed Sun is at bottom center of the composite view. Near the edge of the total eclipse path across planet Earth, the Moon's shadow darkens the sky above.",
  //     "hdurl": "https://apod.nasa.gov/apod/image/2112/Eclipseclock-final2.JPG",
  //     "media_type": "image",
  //     "service_version": "v1",
  //     "title": "Eclipse on a Polar Day",
  //     "url": "https://apod.nasa.gov/apod/image/2112/Eclipseclock-final2_1024c.JPG",
  //     show: true,
  //     colLength: Math.floor(Math.random() * 3) + 1
  //   }
  // ])

  const [modalDetails, setModalDetails] = React.useState<{ show: boolean, details: IState['photoDetails'] | null }>({ show: false, details: null });

  return (
    <>
      <section className="container mx-auto relative h-max py-10">
        {
          listLoading ?
            <i className="uil uil-globe text-5xl text-blue absolute top-2/4 left-2/4 animate-pulse"></i>
            :
            <div className='grid grid-flow-row-dense grid-cols-4 auto-rows-auto gap-5'>
              {
                list.map(photo => <PictureListItem key={photo.hdurl} photo={photo} likes={likes} onLikeClick={onLikeClick} setModalDetails={(details: IState['photoDetails']) => setModalDetails({ show: true, details })} />)
              }
            </div>
        }
      </section>

      <PictureModal modalDetails={modalDetails} closeModal={() => setModalDetails({ ...modalDetails, show: false })} />
    </>
  )
}

export default PictureList;