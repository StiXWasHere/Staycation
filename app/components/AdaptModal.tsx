import React, { ReactNode }from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const AdaptModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null

  return (
    <div className='adapt-modal' onClick={onClose}>
      <div className="adapt-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="adapt-modal-container-top">
          <button id='AdaptModalClose' onClick={onClose}>✖</button>    
        </div>
        {children}
      </div>
    </div>
  )
}

export default AdaptModal