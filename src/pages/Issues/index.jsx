import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Issues = ({ serie }) => {
  // Pega a url da página sem o path. Também pega apenas o path - Ex: www.exemplo.com/teste -> www.exemplo.com (mainUrl) | teste (urlPublisher)
  let url = window.location.href;
  let splitUrl = url.split("/");
  let mainUrl = splitUrl.slice(0, 3).join("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");
  let urlComic = splitUrl.slice(4, 5).join("/");
  let urlIssue = splitUrl.slice(6, 7).join("/");
  let urlPage = url.split("page-")[1];

  const [pageNumber, setPageNumber] = useState(Number(urlPage))
  useEffect(() => {
    setPageNumber(Number(urlPage) + 1)
  }, [useLocation()])

  // Página da hq que vai estar sendo exibida na tela
  let pageImg = `https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/${urlPage}.png`

  const [folders, setFolders] = useState([]);
  useEffect(() => {
    const getFolders = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}`
        );
        const data = response.data;

        const filteredFolders = data.filter((item) => item.type === "file");
        setFolders(filteredFolders);
      } catch (error) {
        console.error("Erro ao obter as pastas:", error);
      }
    };
    getFolders();
  }, []);

  function containerScrollTop() {
    document.getElementById('container').scrollTop = 0;
  };

  setTimeout(function() {
    // Muda a opacidade para 0
    document.querySelector('.controls').classList.add('hidden');;
}, 1000);


  return (
    <div className='Issues'>
      <div className="container" id='container'>
        <img src={pageImg} />
        <div className="controls">
          <Link to={`${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/page-${pageNumber - 11}`} onClick={containerScrollTop}>&#10094;&#10094;</Link>
          <Link to={`${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/page-${pageNumber - 2}`} onClick={containerScrollTop}>&#10094;</Link>
          <p>{urlPage} / {folders.length}</p> 
          <Link to={`${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/page-${pageNumber}`} onClick={containerScrollTop}>&#10095;</Link>
          <Link to={`${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/page-${pageNumber + 9}`} onClick={containerScrollTop}>&#10095;&#10095;</Link>
        </div>
      </div>
      <div className="progress-container">
        <h1>dsd</h1>
      </div>
    </div>
  )
}

export default Issues