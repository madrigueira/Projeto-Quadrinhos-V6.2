import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Issues = ({ serie }) => {
  // Separa todas as rotas da URL
  let url = window.location.href;
  let splitUrl = url.split("/");
  let mainUrl = splitUrl.slice(0, 3).join("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");
  let urlComic = splitUrl.slice(4, 5).join("/");
  let urlIssue = splitUrl.slice(6, 7).join("/");
  let urlPage = url.split("page-")[1];

  // Seta o estado de pageNumber para o número da page que está na URL
  // Depois sempre que houver qualquer mudança na URL ele seta o pageNumber para o a urlPage + 1 para avançar a página
  const [pageNumber, setPageNumber] = useState(Number(urlPage))
  useEffect(() => {
    setPageNumber(Number(urlPage) + 1)
  }, [useLocation()])

  // Página (imagem) da hq que vai estar sendo exibida na tela
  let pageImg = `https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/${urlPage}.jpg`

  // Através da API do Github ele vê a quantidade de arquivos (no caso jpgs) dentro do caminho fornecido
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    const getFolders = async () => {
      try {
        const headers = {
          "Authorization" : `Token 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`
        }
        const response = await axios.get(
          `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}`,
          {"method": "GET",
            "headers": headers
          }
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

  // Depois de 1 segundo, coloca a classe hidden nos controls deixando a opacity em 0
  setTimeout(function() {
    document.querySelector('.controls').classList.add('hidden');;
  }, 1000);

  // Deixam os botões de navegação (do control e da tela) bloqueados de acordo com as informações pegas na API do Github
  const [nextBtn, setNextBtn] = useState(false)
  const [prevBtn, setPrevBtn] = useState(false)
  useEffect(() => {
    if(Number(urlPage) === folders.length){
      setNextBtn(true)
    }else if(Number(urlPage) === 1){
      setPrevBtn(true)
    }else{
      setNextBtn(false)
      setPrevBtn(false)
    }
  }, [useLocation()])

  // Muda o tamanho da barra de progresso da leitura de acordo com o número de páginas totais e avançadas
  useEffect(() => {
    let done = 100 / folders.length
    document.querySelector('.bar-done').style.height = done * Number(urlPage) + '%'
  })

  // Sempre que avançar ou voltar uma página ele volta a tela para o topo da page (imagem)
  function containerScrollTop() {
    document.getElementById('container').scrollTop = 0;
  };

  // Deixa o tamanho da Navegação Invisivel igual ao da page (img) da hq
  const [invisibleNavigationHeight, setInvisibleNavigationHeight] = useState()
  useEffect(() => {
    setInvisibleNavigationHeight(document.querySelector('#pageImg').height)
  })

  // Pega a URL completa da página, menos o número da page
  const AllUrlMinusPage = `${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/page-`

  return (
    <div className='Issues'>
      <div className="container" id='container'>
        <div className="invisible-navigation" style={{height: `${invisibleNavigationHeight}px`}}>
          <Link to={`${AllUrlMinusPage}${pageNumber - 2}`} className={`${prevBtn ? 'active' : ''}`} onClick={containerScrollTop}>
            <div className='prev'></div>
          </Link>
          <Link to={`${AllUrlMinusPage}${pageNumber}`}     className={`${nextBtn ? 'active' : ''}`} onClick={containerScrollTop}>
            <div className='next'></div>
          </Link>
        </div>
        <img src={pageImg} id='pageImg' />
        <div className="controls">
          <Link to={`${AllUrlMinusPage}${pageNumber - 2}`} className={`${prevBtn ? 'active' : ''}`} onClick={containerScrollTop}>&#10094;</Link>
          <p>{urlPage} / {folders.length}</p> 
          <Link to={`${AllUrlMinusPage}${pageNumber}`}     className={`${nextBtn ? 'active' : ''}`} onClick={containerScrollTop}>&#10095;</Link>
        </div>
      </div>
      <div className="progress-container">
        <div className="progress">
          <div className="bar">
            <div className="bar-done"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Issues