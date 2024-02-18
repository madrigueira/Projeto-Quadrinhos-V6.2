import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const Publishers = ({ publisher }) => {

  const randomComic = Math.floor(Math.random() * publisher.comics.length);
  const randomSerie = Math.floor(Math.random() * publisher.comics[randomComic].series.length);
  const comic = publisher.comics[randomComic]
  const serie = publisher.comics[randomComic].series[randomSerie]

  return (
    <div className="Publishers">
      <div className="container">
        <div className="text">
          <h2>{comic.title}</h2>
          <h1>{serie.title}</h1>
          <Link>Ver Mais</Link>
        </div>
        <img className="cover" src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher.slug}/${comic.slug}/${serie.slug}/cover.jpg`} />
        <img className="bg" src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher.slug}/${comic.slug}/banner.png`} />
      </div>
    </div>
  );
};

export default Publishers;
