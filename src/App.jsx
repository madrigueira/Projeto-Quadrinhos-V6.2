import React, { useEffect, useState } from "react";
import "./index.scss";
import { request } from "graphql-request";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Publishers from "./pages/Publishers";
import Comics from "./pages/Comics"

const App = () => {
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

  return (
    <div className="App">
      <Router>
        <Sidebar graphql={graphql} />
        <Routes>
          {/* Páginas "Home" de cada publisher (editora) */}
          {graphql && graphql.map((publisher) => (
              <Route key={publisher.slug} path={publisher.slug} element={<Publishers publisher={publisher} />} />
            ))}

          {/* Páginas de cada comic (personagem) */}
          {graphql && graphql.map((publisher) => (
            publisher.comics.map((comic) => (
              <Route key={comic.slug} path={`${publisher.slug}/${comic.slug}`} element={<Comics comic={comic} />} />
            ))
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
