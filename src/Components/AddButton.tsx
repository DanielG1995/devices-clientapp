import { Add } from '@mui/icons-material'
import React from 'react'

export const AddButton = ({ setOpenModal, openModal }: { setOpenModal: CallableFunction, openModal: boolean }) => {
    return (
        <div className='btn__add d-flex justify-content-center align-items-center'>
            <div onClick={() => { setOpenModal(!openModal) }} className='col-12 d-flex justify-content-center'>
                <Add fontSize='large' titleAccess='Add Device'>Add Device</Add>
            </div>
        </div>
    )
}
