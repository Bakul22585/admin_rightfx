import * as React from 'react';
import './customImageModal.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import InnerImageZoom from 'react-inner-image-zoom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomImageModal = (prop) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const manageContent = () => {
    if (prop.isIcon) {
      return <i className="material-icons">preview</i>;
    } else {
      return <img src={prop.image} className={prop.className}/>;
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} className='btnImageOpenBtn'>
        {manageContent()}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='modalbody image-popup'>
            {/* <img src={prop.image} /> */}
            <InnerImageZoom src={prop.image} zoomSrc={prop.image} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CustomImageModal;