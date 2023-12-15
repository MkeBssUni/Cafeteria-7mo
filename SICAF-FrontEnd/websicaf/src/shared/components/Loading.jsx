import React from 'react'
import '../../App.css'

const Loading = () => {
  return (
    <div className="overlay">
        <div className="my-5">
          <span className="loader"></span>
        </div>
        <div className="center-page">
          <h5>Cargando ...</h5>
        </div>
      </div>
  )
}
export default Loading

