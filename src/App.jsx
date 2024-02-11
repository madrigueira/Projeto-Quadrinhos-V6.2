import React, { useEffect, useState } from "react";
import "./index.scss";
import { request } from "graphql-request";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

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

  // Pegar os nomes das editoras contidos no slug do publishers vindo do graphql
  let qlPublishers = []
  if (graphql) {
    qlPublishers = graphql.map((publishers) => publishers)
  }  

  return (
    <div className="App">
      <Sidebar urlPublisher={urlPublisher} qlPublishers={qlPublishers} />
      <Home urlPublisher={urlPublisher} qlPublishers={qlPublishers} />
    </div>
  );
};

export default App;
