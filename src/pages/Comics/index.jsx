import React, { useState } from 'react'
import "./index.scss"
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io"; 
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
      linear-gradient(transparent 0%, #1f1f1f 100%), 
      url('https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${comic.slug}/banner.png')
    `,
  };

  // Barra de pesquisa dos gibis
  const [search, setSearch] = useState("")
  let allSeries = comic.series.map((serie) => serie)
  let searchedSerie = []
  if(search != undefined){
    for (let i = 0; i < allSeries.length; i++) {
      if(allSeries[i].title.toLowerCase().includes(search)){
        searchedSerie[i] = allSeries[i]
      }
    } 
  }
  
  // Ao clicar no botão da lupa, ele muda a classe da barra de pesquisa para active (através do useState), deixando ela visível
  const [searchBarState, setSearchBarState] = useState(false)
  const toggleSearchBar = () => {
    setSearchBarState(!searchBarState)
  }

  return (
    <div className='Comics'>
      <div className="container">
        <div className="bg" style={bg}></div>
        <div className="search">
          <button className={searchBarState ? 'active' : ''} onClick={toggleSearchBar}><IoIosSearch /></button>
          <input type="text" className={searchBarState ? 'active' : ''} placeholder='Pesquisar...' onChange={(event) => {setSearch(event.target.value.toLowerCase())}} />
        </div>
        <div className="box">
          {searchedSerie.map((serie) => (
            <Link key={serie.slug} to={`${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}`}>
              <ComicCover id={serie.title} key={serie.slug} slug={serie.slug} title={serie.title} urlPublisher={urlPublisher} urlComic={urlComic}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Comics