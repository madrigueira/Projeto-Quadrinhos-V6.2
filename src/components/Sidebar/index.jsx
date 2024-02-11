import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import logo_pq from "../../assets/logo.png";

const Sidebar = ({ publisher, slugs }) => {
  // Pegar a url da página sem o final depois do / - Ex: www.exemplo.com/teste -> www.exemplo.com
  const url = window.location.href;
  const splitUrl = url.split("/");
  const mainUrl = splitUrl.slice(0, 3).join("/");

  // Estado para controlar se o menu do publisher está ativo ou não
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
          <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher}/logo.png`} />
        </div>
      </div>

      <div className={`change-publisher ${isPublisherMenuActive ? 'active' : ''}`}>
          {slugs.map((slug) => (
            <Link key={slug} to={`${mainUrl}/${slug}`}><img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${slug}/logo.png`} /></Link>
          ))}
      </div>

      <div className="library"></div>
    </div>
  );
};

export default Sidebar;
