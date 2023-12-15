import React from 'react'
import errorImage404 from '../../../assets/404ErrorImage.png'
import { Figure } from "react-bootstrap";

const ErrorNotFound = () => {
  return (
    <div className='center'>
        <Figure.Image  alt="ERROR404" src={errorImage404} className='image-error' />
    </div>
  )
}

export default ErrorNotFound