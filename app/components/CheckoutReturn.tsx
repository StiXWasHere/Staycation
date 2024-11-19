import React, { ReactNode }from 'react'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
}

const CheckoutReturn: React.FC<ModalProps> = ({ isOpen, children }) => {

  if (!isOpen) return null

  return (
    <div className='checkout-return'>
      <div className="checkout-return-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default CheckoutReturn