import React from 'react'
import "./index.scss"

const BtnLibrary = ({slug, title, urlPublisher}) => {
  return (
    <div className='BtnLibrary'>
        <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${urlPublisher}/${slug}/icon.png`} />
        <h5>{title}</h5>
    </div>
  )
}

export default BtnLibrary