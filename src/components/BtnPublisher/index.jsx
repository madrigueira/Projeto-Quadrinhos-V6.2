import React, { useState, useEffect } from 'react'
import "./index.scss"

const BtnPublisher = ({slug, title, urlPublisher}) => {
  // Controlar se o Btn está ativo ou não
  const [btn, setBtn] = useState(false)

  // Verifica se o slug vindo do graphql corresponde com o da página atual para dar .active no Btn 
  useEffect(() => {
    if(slug === urlPublisher){
      setBtn(!btn)
    }
  },[urlPublisher])

  // Remove o active de todos os Btn que não possuem o slug === urlPublisher
  useEffect(() => {
    return () => {
      setBtn(false); // Limpa o estado do botão
    };
  }, [urlPublisher]);

  return (
    <div className={`BtnPublisher ${btn ? 'active' : ''}`}>
        <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${slug}/logo.png`} />
        <h5>{title}</h5>
    </div>
  )
}

export default BtnPublisher