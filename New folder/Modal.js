import React from 'react'
import ReactDom from 'react-dom'
const MODAL_STYLE={
    position:"fixed",
    top:"-30%",
    left:"50%",
    backgroundColor:'rgb(34,34,34)',
    transform:'translate(-50%,50%)',
    zIndex:2,
    height:'90%',
    width:'90%'
}
const OVERLAY_STYLE={
    position:"fixed",
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:2
}
export default function Modal({children,onClose}) {
  return ReactDom.createPortal(
    <>
        <div style={OVERLAY_STYLE} />
        <div style={MODAL_STYLE}>
            <buttom className="btn bg-danger fs-4" style={{marginLeft:'90%',marginTop:"-35px"}} onClick={onClose}>X</buttom>
            {children}
        </div>
    </>,
    document.getElementById('cart-root')
  )
}
