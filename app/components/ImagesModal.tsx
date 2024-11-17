import React, { ReactNode }from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ImagesModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null

  return (
    <div className='images-modal' onClick={onClose}>
      <div className="images-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="images-modal-container-top">
          <button id='ImagesModalClose' onClick={onClose}>✖</button>    
        </div>
        {children}
      </div>
    </div>
  )
}

export default ImagesModal