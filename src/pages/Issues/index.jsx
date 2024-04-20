import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { RiArrowLeftLine } from "react-icons/ri"; 
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuZoomIn } from "react-icons/lu";

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

  // Seta a nova UrlComic. Utilizado para buscar gibis upados em diretórios de outros personagens (Comics)
  const [newUrlComic, setNewUrlComic] = useState(urlComic);

  // Através da API do Github ele acessa o repositório da serie escolhida para verificar se a história está mesmo dentro desse caminho ou está dentro de outro personagem (Comic)
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    const getFolders = async () => {
      try {
        let response = await axios.get(
          `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${urlComic}/${serie.slug}`, {
            headers: {
              Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
            },
          }
        );
        // Pega as pastas (Series) dentro do repositório
        let data = response.data;
        let folders = data.filter((item) => item.type === "dir");

        // Se não houver pastas no repositório, quer dizer que elas estão dentro do repositório de outro personagem (Comic)
        // Nesse caso ele lerá o nome do arquivo txt dentro do repositório - que é o nome do Comic onde estão as pastas daquele arquivo - e irá alterar a URL do personagem (newUrlComic) para esse nome do txt
        // Isso é feito pois mais de um personagem (Comic) pode possuir uma Serie, assim os dois exibem essa serie sem necessáriamente ter que upa-lá mais de uma vez
        // Dentro de cada verificação (If) ele faz outro get na api do GitHub para verificar a quantidade de arquivos dentro da pasta daquela edição para exibir a quantidade de páginas totais e a timeline de leiturda na diretia da tela
        if (folders.length == 0) {
          const txtFile = data.filter(file => file.name.endsWith('.txt'));
          const nameTxtFile = txtFile[0].name.slice(0, -4)
          setNewUrlComic(nameTxtFile)
          response = await axios.get(
            `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${nameTxtFile}/${serie.slug}/${urlIssue}`, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
              },
            }
          );
          data = response.data;
          folders = data.filter((item) => item.type === "file");
        } else {
          response = await axios.get(
            `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}`, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
              },
            }
          );
          data = response.data;
          folders = data.filter((item) => item.type === "file");
        }

        // Aqui vai ser armazenado o array com todas as páginas (todos os arquivos) dentro do repositório acessado pela api (por enquanto estamos usando apenas para exibir total de páginas e a timeline de leitura)
        setFolders(folders);
      } catch (error) {
        console.error("Erro ao obter as pastas:", error);
      }
    };
    getFolders();
  }, []);

  // Página (imagem) da hq que vai estar sendo exibida na tela
  let pageImg = `https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${newUrlComic}/${serie.slug}/${urlIssue}/${urlPage}.jpg`

  // Depois de 1 segundo, coloca a classe hidden nos controls e no botão de voltar deixando a opacity em 0
  setTimeout(function() {
    document.querySelector('.controls').classList.add('hidden')
    document.querySelector('.back-button').classList.add('hidden')
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

  // Dão zoom na image para melhorar a leitura
  const [zoomState, setZoomState] = useState('')
  function zoomPageLeft(){
    const pageImg = document.querySelector("#pageImg")
    if(pageImg.classList.contains("zoom-right")){
      pageImg.classList.remove("zoom-right"); pageImg.classList.add("zoom-left")
    }else{
      pageImg.classList.toggle("zoom-left")
    }
    setInvisibleNavigationHeight(document.querySelector('#pageImg').height)
  }
  function zoomPageRight(){
    const pageImg = document.querySelector("#pageImg")
    if(pageImg.classList.contains("zoom-left")){
      pageImg.classList.remove("zoom-left"); pageImg.classList.add("zoom-right")
    }else{
      pageImg.classList.toggle("zoom-right")
    }
    setInvisibleNavigationHeight(document.querySelector('#pageImg').height)
  }

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
  // O timeout de 0,5 segundo é para dar tempo de pegar o tamanho da página atual sendo exibida na tela (meio gambiarrento :/)
  const [invisibleNavigationHeight, setInvisibleNavigationHeight] = useState(100)
  useEffect(() => {
    setTimeout(function() {
      setInvisibleNavigationHeight(document.querySelector('#pageImg').height)
    }, 500)
  })

  // Pega a URL completa da página, menos o número da page
  const AllUrlMinusPage = `${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}/${urlIssue}/page-`

  return (
    <div className='Issues'>
      <Link to={`${mainUrl}/${urlPublisher}/${urlComic}/${serie.slug}`}><button className='back-button'><RiArrowLeftLine /></button></Link>
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
          <button onClick={zoomPageLeft}><LuZoomIn/></button>
          <Link to={`${AllUrlMinusPage}${pageNumber - 2}`} className={`${prevBtn ? 'active' : ''}`} onClick={containerScrollTop}><MdOutlineKeyboardArrowLeft/></Link>
          <p>{urlPage} / {folders.length}</p> 
          <Link to={`${AllUrlMinusPage}${pageNumber}`}     className={`${nextBtn ? 'active' : ''}`} onClick={containerScrollTop}><MdOutlineKeyboardArrowRight/></Link>
          <button onClick={zoomPageRight}><LuZoomIn/></button>
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