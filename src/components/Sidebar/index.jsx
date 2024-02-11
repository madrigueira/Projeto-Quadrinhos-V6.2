import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import logo_pq from "../../assets/logo.png";

const Sidebar = ({ publisher, slugs }) => {
  // Pegar a url da página sem o final depois do / - Ex: www.exemplo.com/teste -> www.exemplo.com
  let url = window.location.href;
  let splitUrl = url.split("/");
  let mainUrl = splitUrl.slice(0, 3).join("/");

  return (
    <div className="Sidebar">

      <div className="top">
        <div className="logo-pq">
          <img src={logo_pq} alt="Projeto Quadrinhos" />
        </div>
        <div className="logo-publisher">
          <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher}/logo.png`} />
        </div>
      </div>

      <div className="change-publisher">
        <div className="container">
          {slugs.map((slug) => (
            <Link key={slug} to={`${mainUrl}/${slug}`}><img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${slug}/logo.png`} /></Link>
          ))}
        </div>
      </div>

      <div className="library"></div>
      
    </div>
  );
};

export default Sidebar;
