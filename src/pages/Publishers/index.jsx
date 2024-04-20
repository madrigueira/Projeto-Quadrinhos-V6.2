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
  // O '...serie' está copiando todas as propriedades do objeto serie para um novo objeto, e em seguida, adicionando a propriedade comicSlug com o valor comic.slug
  // O flat é usado para juntar os arrays em um só array grandão. Ex: [[1, 2], [3, 4], [5, 6]] => [1, 2, 3, 4, 5, 6]
  const allMostRecentSeries = publisher.comics.map((comic) => comic.series.map((serie) => ({ ...serie, comicSlug: comic.slug }))).flat();
  allMostRecentSeries.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  // Filtra todas as series mais recentes para não exibir séries duplicadas/repetidas
  // O filteredMostRecentSeries recebe todas as series e faz um filtro com a ajuda do verifyDuplicateSeries. 
  // Se o verify na posição do slug daquela série (ou seja, o verify daquela série) for false (ela não foi repetida), ele retorna true, se o verify for true (já foi recebida), ele retorna false (não exibe no .map)
  const verifyDuplicateSeries = {}
  const filteredMostRecentSeries = allMostRecentSeries.filter((serie) => {
    if(!verifyDuplicateSeries[serie.slug]){
      verifyDuplicateSeries[serie.slug] = true;
      return true;
    }
    return false;
  })

  return (
    <div className="Publishers">
      <div className="container">
        <div className="text">
          <Link className="link-comic" to={`${randomComic.slug}`}><h2>{randomComic.title}</h2></Link>
          <h1>{randomSerie.title}</h1>
          <Link className="link-serie" to={`${randomComic.slug}/${randomSerie.slug}`}>Ver Mais</Link>
        </div>
        <img className="cover" src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher.slug}/${randomComic.slug}/${randomSerie.slug}/cover.jpg`} />
        <img className="bg" src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher.slug}/${randomComic.slug}/banner.png`} />
      </div>
      <h3>Mais Recentes</h3>
      <div className="box">
        {filteredMostRecentSeries.slice(0, 5).map((serie) => (
          <Link key={serie.slug} to={`${serie.comicSlug}/${serie.slug}`}>
            <ComicCover key={serie.slug} slug={serie.slug} title={serie.title} urlPublisher={urlPublisher} urlComic={serie.comicSlug} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Publishers;