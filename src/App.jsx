import React, { useEffect, useState } from "react";
import "./index.scss";
import { request } from "graphql-request";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Publishers from "./pages/Publishers";
import Comics from "./pages/Comics"
import Series from "./pages/Series";
import Issues from "./pages/Issues";

const App = () => {
  // Conexão com o GraphQL
  const [graphql, setGraphql] = useState(null);

  useEffect(() => {
    const fetchGraphql = async () => {
      const { publishers } = await request(
        "https://api-sa-east-1.hygraph.com/v2/clsfislto1m5n01wjeee71mak/master",
        `{
            publishers{
              title
              slug
              updatedAt
              comics{
                title
                slug
                updatedAt
                series{
                  title
                  slug
                  updatedAt
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
          {/* Rota para redirecionar automaticamente a raiz para a página da Marvel */}
          <Route path="/" element={<Navigate to="marvel" />} />

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

          {/* Páginas de cada serie (edições) */}
          {graphql && graphql.map((publisher) => (
            publisher.comics.map((comic) => (
              comic.series.map((serie) => (
                <Route key={serie.slug} path={`${publisher.slug}/${comic.slug}/${serie.slug}`} element={<Series serie={serie} />} />
              ))
            ))
          ))}

          {/* Páginas com as páginas das hqs (issues) */}
          {graphql && graphql.map((publisher) => (
            publisher.comics.map((comic) => (
              comic.series.map((serie) => (
                <Route key={serie.slug} path={`${publisher.slug}/${comic.slug}/${serie.slug}/:numero/:pagina`} element={<Issues serie={serie} />} />
              ))
            ))
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
