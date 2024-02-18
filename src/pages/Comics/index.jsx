import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom';
import ComicCover from '../../components/ComicCover';

const Comics = ({ comic }) => {
  // Pega a url da página sem o path. Também pega apenas o path - Ex: www.exemplo.com/teste -> www.exemplo.com (mainUrl) | teste (urlPublisher)
  let url = window.location.href;
  let splitUrl = url.split("/");
  let mainUrl = splitUrl.slice(0, 3).join("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");
  let urlComic = splitUrl.slice(4, 5).join("/");

  // Pega a url do background do comic e coloca um gradiente
  const bg = {
    backgroundImage: `
      linear-gradient(transparent 20%, #1f1f1f 100%), 
      url('https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${comic.slug}/banner.png')
    `,
  };

  return (
    <div className='Comics'>
      <div className="container">
        <div className="bg" style={bg}></div>
        <div className="box">
          {comic.series.map((serie) => (
            <Link key={serie.slug} to={`${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}`}>
              <ComicCover key={serie.slug} slug={serie.slug} title={serie.title} urlPublisher={urlPublisher} urlComic={urlComic}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Comics