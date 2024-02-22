import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";
import logo_pq from "../../assets/logo.png";
import BtnSidebar from "../BtnSidebar"

const Sidebar = ({ graphql }) => {
  // Pegar a url da página sem o path. Também pega apenas o path - Ex: www.exemplo.com/teste -> www.exemplo.com (mainUrl) | teste (urlPublisher)
  let url = window.location.href;
  let splitUrl = url.split("/");
  let mainUrl = splitUrl.slice(0, 3).join("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");
  let urlComic = splitUrl.slice(4, 5).join("/");

  // Pegar um array contendo apenas os comics dentro da publisher (editora) que estiver selecionada (mesma da url)
  let qlComics = []
  if (graphql) {
    let selectedPublisher = graphql.find(publisher => publisher.slug === urlPublisher);
    qlComics = selectedPublisher.comics.map(comic => comic);
  }

  // Controlar se o menu do publisher está ativo ou não. Função para alternar o estado do menu do publisher
  const [publisherActive, setPublisherActive] = useState(false);
  const togglePublisherActive = () => {
    setPublisherActive(!publisherActive);
  };

  // Controlar se o botão da library está ativo ou não. Função para alternar o estado do botão da library
  const [comicActive, setComicActive] = useState(false);
  const toggleComicActive = () => {
    setComicActive(!comicActive);
  };

  // Assim que a URL for alterada ele atualiza o estado do Botão da Library para o mais adequado
  useEffect(() => {
    setComicActive(comicActive)
  }, [useLocation()])
  
  return (
    <div className="Sidebar">
      <div className="top">
        <div className="logo-pq">
          <img src={logo_pq} alt="Projeto Quadrinhos" />
        </div>
        <div className="logo-publisher" onClick={togglePublisherActive}>
          <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/logo.png`} />
        </div>
      </div>

      <div className={`change-publisher ${publisherActive ? 'active' : ''}`}>
        <div className="container">
          {graphql ? (graphql.map((publisher) => (
              <Link key={publisher.slug} to={`${mainUrl}/${publisher.slug}`} onClick={togglePublisherActive}>
                <BtnSidebar key={publisher.slug} slug={publisher.slug} title={publisher.title} urlPublisher={urlPublisher}/>
              </Link>
            ))):('')}
        </div>
      </div>

      <div className={`library ${publisherActive ? 'active' : ''}`}>
        <h4>Sua Biblioteca</h4>
        <div className="container">
          {qlComics.map((comics) => (
            <Link key={comics.slug} to={`${mainUrl}/${urlPublisher}/${comics.slug}`} onClick={toggleComicActive}>
              <BtnSidebar key={comics.slug} slug={comics.slug} title={comics.title} urlPublisher={urlPublisher} urlComic={urlComic}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
