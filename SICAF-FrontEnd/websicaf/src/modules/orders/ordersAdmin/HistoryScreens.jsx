import React from 'react'
import FondoH from '../../assets/FondoH.jpg'
import '../../shared/css/color.css'
import { Figure } from 'react-bootstrap';


const HistoryScreens = () => {
    return (
        <div>
            <div className="table tabla-personalizada" style={{ marginTop: '20px' }}>
                <table class="table table-striped ">
                    <thead>
                        <tr >
                            <td style={{ color: 'var(--color-title)' }}> <b>Nombre</b></td>
                            <td style={{ color: 'var(--color-title)' }}><b>Apellido Paterno</b></td>
                            <td style={{ color: 'var(--color-title)' }}><b>Apellido Materno</b></td>
                            <td style={{ color: 'var(--color-title)' }}><b>Nombre del usuario</b></td>
                            <td style={{ color: 'var(--color-title)' }}><b>Correo Electrónico</b></td>
                            <td style={{ color: 'var(--color-title)' }}><b>Numero de teléfono</b></td>
                            <td> </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Anna Christina</td>
                            <td>Bustos</td>
                            <td>.</td>
                            <td>gizi_jane</td>
                            <td>bustos04@gmail.com</td>
                            <td>7771234563</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryScreens