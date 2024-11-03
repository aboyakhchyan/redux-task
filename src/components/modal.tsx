import React, { useState } from 'react';
import './style.css'; 
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../app/hooks';
import { InputUser } from '../features/medicine/types';
import { addMedicine } from '../features/medicine/medicine.sclice';

interface IProp {
    onClose: () => void
}

export const Modal: React.FC<IProp> = ({onClose}) => {

  const dispatch = useAppDispatch()

  const {register, handleSubmit, formState: {errors}, reset} = useForm<InputUser>()

  const handleAddMedicine = (data: InputUser) => {
       dispatch(addMedicine(data))

       reset()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
            <form onSubmit={handleSubmit(handleAddMedicine)}>
                <input 
                    type="text"
                    placeholder='Input name'
                    {...register('name', {required: true})}
                />
                <input 
                    type="number"
                    placeholder='Input salary'
                    {...register('salary', {required: true, valueAsNumber: true})}
                />
                <input 
                    type="text"
                    placeholder='Input image url'
                    {...register('imageUrl', {required: true})}
                />
                <button>Save</button>
            </form>
        </div>
      </div>
    </div>
  );
};
