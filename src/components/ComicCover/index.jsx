import React from 'react'
import "./index.scss"

const ComicCover = ({ slug, title, urlPublisher, urlComic }) => {
  // Pega a capa da comic
  const comicCover = `https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${urlComic}/${slug}/cover.jpg`;

  return (
    <div className='ComicCover'>
      <img src={comicCover} />
      <h5>{title}</h5>
    </div>
  )
}

export default ComicCover