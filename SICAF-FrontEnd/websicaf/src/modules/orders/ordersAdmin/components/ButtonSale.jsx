import React,{useState} from 'react'
import StorefrontIcon from '@mui/icons-material/Storefront';
import SvgIcon from "@mui/material/SvgIcon";
import SaveOrderModal from './SaveOrderModal';

const ButtonSale = () => {
    const [handleOpen, setHandleOpen] = useState(false);

    const openModal = () => {
        setHandleOpen(true);
    };

    const closeModal = () => {
        setHandleOpen(false);
    };

  return (
    <>
    <SaveOrderModal isOpen={handleOpen} onClose={closeModal} />
    <button class="floating-button" onClick={openModal} ><SvgIcon component={StorefrontIcon} inheritViewBox /></button>
    </>
  )
}

export default ButtonSale