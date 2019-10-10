import React from 'react'
import MdAdd from 'react-ionicons/lib/MdAdd'

const AddItemFloatingButton = ({ action }) =>
  <button className="floating-button" onClick={() => action(true)}>
    <MdAdd className="floating-button__icon" color="white" fontSize="28px"/>
  </button>

export default AddItemFloatingButton