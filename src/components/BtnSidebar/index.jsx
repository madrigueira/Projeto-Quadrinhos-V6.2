import React, { useState, useEffect } from 'react'
import "./index.scss"

const BtnSidebar = ({slug, title, urlPublisher, urlComic}) => {
  // Controlar se o Btn está ativo ou não
  const [btn, setBtn] = useState(false)

  // Verifica se o slug vindo do graphql corresponde com o da página atual para dar .active no Btn 
  useEffect(() => {
    if(slug === urlPublisher || slug === urlComic){
      setBtn(!btn)
    }
  },[urlPublisher, urlComic])

  // Remove o active de todos os Btn que não possuem o slug === urlPublisher ou urlComic
  useEffect(() => {
    return () => {
      setBtn(false); // Limpa o estado do botão
    };
  }, [urlPublisher, urlComic]);

  // Muda o caminho da imagem a ser recebida para se adequar a logo da publisher ou icone do comic. 
  // Se o urlComic vier undefined quer dizer que é o botão da publisher, senão vice-versa
  let img = ''
  if(urlComic === undefined){
    img = `https://raw.githubusercontent.com/madrigueira/pq-content/main/${slug}/logo.png`
  }else{
    img = `https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${slug}/icon.png`
  }

  return (
    <div className={`BtnSidebar ${btn ? 'active' : ''}`}>
        <img src={img} />
        <h5>{title}</h5>
    </div>
  )
}

export default BtnSidebar