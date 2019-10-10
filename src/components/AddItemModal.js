import React, { useState,useRef } from 'react'
import MdAdd from 'react-ionicons/lib/MdAdd'

const AddItemModal = ({ close, save }) => {
  const [alert, showAlert] = useState(false)
  const releaseDateRef = useRef()
  const titleRef = useRef()
  const productionBudgetRef = useRef()
  const worldwideBoxOfficeRef = useRef()
  const formVerify = (newMovie) => {
    releaseDateRef.current.value && titleRef.current.value && productionBudgetRef.current.value && worldwideBoxOfficeRef.current.value
    ? save({
      title: releaseDateRef.current.value,
      releaseDate: titleRef.current.value,
      productionBudget: productionBudgetRef.current.value,
      worldwideBoxOffice: worldwideBoxOfficeRef.current.value,
    })
    : showAlert(true)
  }
  return (
    <div className="modal__area">
      <div className="modal">
        <MdAdd className="modal__close" onClick={() => close(false)} />
        <h3>Add a new Movie Information</h3>
        <div className="modal__form">
          <span>Movie name</span>
          <input
            className="modal__input"
            placeholder="e.g. Iron Man"
            ref={releaseDateRef}
            type="text"
            required
          />
          <span>Release date</span>
          <input
            className="modal__input"
            placeholder="e.g. 29-02-2020"
            ref={titleRef}
            type="text"
            required
          />
          <span>Production budget</span>
          <input
            className="modal__input"
            placeholder="e.g. 13000000"
            ref={productionBudgetRef}
            type="number"
            required
          />
          <span>Worldwide box office</span>
          <input
            className="modal__input"
            placeholder="e.g. 13000000"
            ref={worldwideBoxOfficeRef}
            type="number"
            required
          />
          {alert && <p className="alert">please fill all fields</p>}
          <button className="modal__button" onClick={() => formVerify()}>It's showtime</button>
        </div>
      </div>
    </div>
  )
}

export default AddItemModal
