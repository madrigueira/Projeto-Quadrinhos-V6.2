import React from 'react'
import './index.scss'

const Home = ({publisher}) => {
  return (
    <div className='Home'>
        <h1>{publisher}</h1>
    </div>
  )
}

export default Home