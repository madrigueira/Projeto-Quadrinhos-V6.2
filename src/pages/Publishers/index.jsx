import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import ComicCover from "../../components/ComicCover"

const Publishers = ({ publisher }) => {
  // Pega a url da página sem o path. Também pega apenas o path - Ex: www.exemplo.com/teste -> www.exemplo.com (mainUrl) | teste (urlPublisher)
  let url = window.location.href;
  let splitUrl = url.split("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");

  // Randomiza a comic (personagem) e dali randomiza uma serie (hq) para exibir no banner da home da publisher (editora)
  const randomizeAnyComic = Math.floor(Math.random() * publisher.comics.length);
  const randomAnySerie = Math.floor(Math.random() * publisher.comics[randomizeAnyComic].series.length);
  const randomComic = publisher.comics[randomizeAnyComic]
  const randomSerie = publisher.comics[randomizeAnyComic].series[randomAnySerie]

  // Agrupa todas as series (hqs) independente da comic (personagem) para exibir as mais recentes na home da publisher (editora)
  // O '...seire' está copiando todas as propriedades do objeto serie para um novo objeto, e em seguida, adicionando a propriedade comicSlug com o valor comic.slug
  // O flat é usado para juntar os arrays em um só array grandão. Ex: [[1, 2], [3, 4], [5, 6]] => [1, 2, 3, 4, 5, 6]
  const allMostRecentSeries = publisher.comics.map((comic) => comic.series.map((serie) => ({ ...serie, comicSlug: comic.slug }))).flat();
  allMostRecentSeries.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  const newMostRecent = {}
  const newArray = allMostRecentSeries.filter((serie) => {
    if(!newMostRecent[serie.slug]){
      newMostRecent[serie.slug] = true;
      return true;
    }
    return false;
  })

  return (
    <div className="Publishers">
      <div className="container">
        <div className="text">
          <h2>{randomComic.title}</h2>
          <h1>{randomSerie.title}</h1>
          <Link to={`${randomComic.slug}/${randomSerie.slug}`}>Ver Mais</Link>
        </div>
        <img className="cover" src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher.slug}/${randomComic.slug}/${randomSerie.slug}/cover.jpg`} />
        <img className="bg" src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher.slug}/${randomComic.slug}/banner.png`} />
      </div>
      <h3>Mais Recentes</h3>
      <div className="box">
        {newArray.slice(0, 5).map((serie) => (
          <Link key={serie.slug} to={`${serie.comicSlug}/${serie.slug}`}>
            <ComicCover key={serie.slug} slug={serie.slug} title={serie.title} urlPublisher={urlPublisher} urlComic={serie.comicSlug} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Publishers;
