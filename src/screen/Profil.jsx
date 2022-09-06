import React from 'react'

const Profil = ({useEdit}) => {

    const [isEdit, setIsEdit] = useEdit;

    const handleClick = () => {
        setIsEdit(!isEdit)
    }
  return (
    <>
        <div>Profil</div>
        <button className='btn' onClick={handleClick}> EDIT </button>
    </>
  )
}

export default Profil