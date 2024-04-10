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

  // Seta a nova UrlComic. Utilizado para buscar gibis upados em diretórios de outros personagens (Comics)
  const [newUrlComic, setNewUrlComic] = useState(urlComic);

  // Através da API do Github ele vê a quantidade de pastas dentro do caminho fornecido para exibir o equivalente em botões para linkar cada issue do gibi
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
        if (folders.length == 0) {
          const txtFile = data.filter(file => file.name.endsWith('.txt'));
          const nameTxtFile = txtFile[0].name.slice(0, -4)
          setNewUrlComic(nameTxtFile)
          response = await axios.get(
            `https://api.github.com/repos/madrigueira/pq-content/contents/${urlPublisher}/${nameTxtFile}/${serie.slug}`, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
              },
            }
          );
          data = response.data;
          folders = data.filter((item) => item.type === "dir");
        }

        setFolders(folders);
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
              <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${newUrlComic}/${serie.slug}/${folder.name}/1.jpg`} />
              <p>{folders.length === 1 ? "Volume Único" : folder.name}</p>
            </div>
          </Link>
        )) : <h5>Carregando...</h5>}
      </div>
    </div>
  )
}

export default Series
