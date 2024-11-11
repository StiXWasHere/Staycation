import React, { ReactNode }from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Filter: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null

  return (
    <div className='filter' onClick={onClose}>
      <div className="filter-container" onClick={(e) => e.stopPropagation()}>
        <div className="filter-container-top">
          <button id='FilterClose' onClick={onClose}>✖</button>    
        </div>
        {children}
      </div>
    </div>
  )
}

export default Filter