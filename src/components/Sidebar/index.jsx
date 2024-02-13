import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import logo_pq from "../../assets/logo.png";
import BtnPublisher from "../BtnPublisher"
import BtnLibrary from "../BtnLibrary"

const Sidebar = ({ graphql }) => {
  // Pegar a url da página sem o path. Também pega apenas o path - Ex: www.exemplo.com/teste -> www.exemplo.com (mainUrl) | teste (urlPublisher)
  let url = window.location.href;
  let splitUrl = url.split("/");
  let mainUrl = splitUrl.slice(0, 3).join("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");

  // Pegar um array contendo apenas os comics dentro da publisher (editora) que estiver selecionada (mesma da url)
  let qlComics = []
  if (graphql) {
    let selectedPublisher = graphql.find(publisher => publisher.slug === urlPublisher);
    qlComics = selectedPublisher.comics.map(comic => comic);
  }

  // Controlar se o menu do publisher está ativo ou não. Função para alternar o estado do menu do publisher
  const [isPublisherMenuActive, setIsPublisherMenuActive] = useState(false);
  const togglePublisherMenu = () => {
    setIsPublisherMenuActive(!isPublisherMenuActive);
  };
  
  return (
    <div className="Sidebar">
      <div className="top">
        <div className="logo-pq">
          <img src={logo_pq} alt="Projeto Quadrinhos" />
        </div>
        <div className="logo-publisher" onClick={togglePublisherMenu}>
          <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/logo.png`} />
        </div>
      </div>

      <div className={`change-publisher ${isPublisherMenuActive ? 'active' : ''}`}>
        <div className="container">
          {graphql ? (graphql.map((publisher) => (
              <Link key={publisher.slug} to={`${mainUrl}/${publisher.slug}`} onClick={togglePublisherMenu}>
                <BtnPublisher key={publisher.slug} slug={publisher.slug} title={publisher.title} urlPublisher={urlPublisher}/>
              </Link>
            ))):('')}
        </div>
      </div>

      <div className={`library ${isPublisherMenuActive ? 'active' : ''}`}>
        <h4>Sua Biblioteca</h4>
        <div className="container">
          {qlComics.map((comics) => (
            <Link key={comics.slug} to={`${mainUrl}/${urlPublisher}/${comics.slug}`}>
              <BtnLibrary key={comics.slug} slug={comics.slug} title={comics.title} urlPublisher={urlPublisher}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
