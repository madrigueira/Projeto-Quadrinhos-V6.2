import React from 'react'
import "./index.scss"

const Comics = ({ comic }) => {
  // Pega a url da página sem o path. Também pega apenas o path - Ex: www.exemplo.com/teste -> www.exemplo.com (mainUrl) | teste (urlPublisher)
  let url = window.location.href;
  let splitUrl = url.split("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");

  // Pega a url do background do comic e coloca um gradiente
  const bg = {
    backgroundImage: `
      linear-gradient(transparent 20%, #1f1f1f 100%), 
      url('https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${comic.slug}/banner.png')
    `,
  };

  return (
    <div className='Comics'>
      <div className="bg" style={bg}></div>
      <h1>{comic.title}</h1>
    </div>
  )
}

export default Comics