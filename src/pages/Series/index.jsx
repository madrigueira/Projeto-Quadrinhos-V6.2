import { useState, useEffect } from "react";
import "./index.scss"
import { Link } from "react-router-dom";
import axios from 'axios';

const Series = ({ serie }) => {
  // Pega a url da página sem o path. Também pega apenas o path - Ex: www.exemplo.com/teste -> www.exemplo.com (mainUrl) | teste (urlPublisher)
  let url = window.location.href;
  let splitUrl = url.split("/");
  let urlPublisher = splitUrl.slice(3, 4).join("/");
  let urlComic = splitUrl.slice(4, 5).join("/");

  // Através da API do Github ele vê a quantidade de pastas dentro do caminho fornecido para exibir o equivalente em botões para linkar cada issue do gibi
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    const getFolders = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${urlComic}/${serie.slug}`, {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
        const data = response.data;

        const filteredFolders = data.filter((item) => item.type === "dir");
        setFolders(filteredFolders);
      } catch (error) {
        console.error("Erro ao obter as pastas:", error);
      }
    };
    getFolders();
  }, []);

  // if(folders.length === 1){
  //   folders.map((folder) => folder.name = "Volume Único")
  // }

  return (
    <div className='Series'>
      <h3>{serie.title}</h3>
      <div className="container">
        {folders.map((folder) => (
          <Link key={folder.name} to={`${folder.name}/page-1`}>
            <div className="each-issue">
              <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${urlComic}/${serie.slug}/${folder.name}/1.jpg`} />
              <p>{folders.length === 1 ? "Volume Único" : folder.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Series
