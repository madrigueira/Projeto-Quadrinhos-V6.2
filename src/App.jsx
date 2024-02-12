import React, { useEffect, useState } from "react";
import "./index.scss";
import { request } from "graphql-request";
import Sidebar from "./components/Sidebar";
import Publishers from "./pages/Publishers";

const App = ({ urlPublisher }) => {

  // Conexão com o GraphQL
  const [graphql, setGraphql] = useState(null);

  useEffect(() => {
    const fetchGraphql = async () => {
      const { publishers } = await request(
        "https://api-sa-east-1.hygraph.com/v2/clsfislto1m5n01wjeee71mak/master",
        `{
            publishers {
              title
              slug
              comics{
                title
                slug
                series{
                  title
                  slug
                }
              }
            }
          }`
      );
      setGraphql(publishers);
    };
    fetchGraphql();
  }, []);

  // Pegar um array contendo todos os dados vindos do grapql
  let qlPublishers = []
  if (graphql) {
    qlPublishers = graphql.map((publishers) => publishers)
  }
  
  // Pegar um array contendo apenas os comics dentro da publisher que estiver selecionada (mesmo slug da url)
  let qlComics = []
  if (graphql) {
    let selectedPublisher = graphql.find(publisher => publisher.slug === urlPublisher);
    qlComics = selectedPublisher.comics.map(comic => comic);
  }

  return (
    <div className="App">
      <Sidebar urlPublisher={urlPublisher} qlPublishers={qlPublishers} qlComics={qlComics} />
      <Publishers urlPublisher={urlPublisher} qlPublishers={qlPublishers} />
    </div>
  );
};

export default App;
