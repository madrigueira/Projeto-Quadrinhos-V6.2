import React from 'react'
import './index.scss'
import logo_pq from '../../assets/logo.png'

const Sidebar = ({publisher}) => {
  return (
    <div className='Sidebar'>
        
        <div className="top">
            <div className="logo-pq">
                <img src={logo_pq} alt="Projeto Quadrinhos" />
            </div>
            <div className="logo-publisher">
                <img src={`https://raw.githubusercontent.com/madrigueira/pq-content/main/${publisher}/logo.png`} />
            </div>
        </div>

        <div className="library"></div>

    </div>
  )
}

export default Sidebar