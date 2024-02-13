import React from 'react'
import "./index.scss"

const Comics = ({ comic }) => {
  return (
    <div className='Comics'>
        <h1>{comic.title}</h1>
    </div>
  )
}

export default Comics