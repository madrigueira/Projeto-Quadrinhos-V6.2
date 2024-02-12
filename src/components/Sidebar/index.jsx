import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import logo_pq from "../../assets/logo.png";
import BtnPublisher from "../BtnPublisher"
import BtnLibrary from "../BtnLibrary"

const Sidebar = ({ urlPublisher, qlPublishers, qlComics }) => {
  // Pegar a url da página sem o final depois do / - Ex: www.exemplo.com/teste -> www.exemplo.com
  const url = window.location.href;
  const splitUrl = url.split("/");
  const mainUrl = splitUrl.slice(0, 3).join("/");

  // Controlar se o menu do publisher está ativo ou não
  const [isPublisherMenuActive, setIsPublisherMenuActive] = useState(false);

  // Função para alternar o estado do menu do publisher
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
          {qlPublishers.map((publisher) => (
              <Link key={publisher.slug} to={`${mainUrl}/${publisher.slug}`}>
                <BtnPublisher key={publisher.slug} slug={publisher.slug} title={publisher.title} urlPublisher={urlPublisher}/>
              </Link>
            ))}
        </div>
      </div>

      <div className={`library ${isPublisherMenuActive ? 'active' : ''}`}>
        <h4>Sua Biblioteca</h4>
        <div className="container">
          {qlComics.map((comics) => (
            <BtnLibrary key={comics.slug} slug={comics.slug} title={comics.title} urlPublisher={urlPublisher}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
