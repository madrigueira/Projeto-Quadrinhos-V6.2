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
  const [teste, setTeste] = useState(urlComic);
  useEffect(() => {
    const getFolders = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${urlComic}/${serie.slug}`, {
            headers: {
              Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
            },
          }
        );
        const data = response.data;

        let filteredFolders = data.filter((item) => item.type === "dir");
        const filteredFiles = data.filter((item) => item.type === "file");
        const txtFiles = filteredFiles.filter(file => file.name.endsWith('.txt'));
        
        if (txtFiles.length > 0) {
          const test = txtFiles[0].name.slice(0, -4)
          setTeste(test)
          const response2 = await axios.get(
            `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${test}/${serie.slug}`, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
              },
            }
          );
          const data2 = response2.data;
          filteredFolders = data2.filter((item) => item.type === "dir");
        } else {
          console.log('Não há arquivos .txt no diretório.');
        }

        setFolders(filteredFolders);
      } catch (error) {
        console.error("Erro ao obter as pastas:", error);
      }
    };
    getFolders();
  }, []);


  return (
    <div className='Series'>
      <h3>{serie.title}</h3>
      <div className="container">
        {folders.length != 0 ? folders.map((folder) => (
          <Link key={folder.name} to={`${folder.name}/page-1`}>
            <div className="each-issue">
              <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${teste}/${serie.slug}/${folder.name}/1.jpg`} />
              <p>{folders.length === 1 ? "Volume Único" : folder.name}</p>
            </div>
          </Link>
        )) : <h5>Carregando...</h5>}
      </div>
    </div>
  )
}

export default Series
