import React, { useState, useEffect } from 'react';
import { SetSchedule, UpdateSchedule } from '../../../utils/Api';
import { toast } from 'react-toastify';

const initialState = () => ({
  start: '00:00',
  break: '00:00',
  end: '00:00',
});

export default function ScheduleForm(props) {
  const { id, scheduleEdit, handleSchedules, setScheduleEdit } = props;
  const [formData, setFormData] = useState(initialState());

  useEffect(() => {
    if (scheduleEdit) {
      setFormData({
        start: scheduleEdit.start ? scheduleEdit.start : '00:00',
        break: scheduleEdit.break ? scheduleEdit.break : '00:00',
        end: scheduleEdit.end ? scheduleEdit.end : '00:00',
      });
    }
  }, [scheduleEdit]);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateSchedule = async (idS, data) => {
    try {
      await UpdateSchedule(id, idS, data);
      toast('Item actualizado.', { type: 'success', autoClose: 2000 });
      handleSchedules();
      resetForm();
    } catch (error) {
      toast('Error al actualizar.', { type: 'error', autoClose: 2000 });
    }
  };

  const checkHours = () => {
    let flag = true;
    if (formData.break < formData.start || formData.break === formData.start) {
      toast('La hora de comida debe ser mayor a la hora de entrada.', {
        type: 'warning',
        autoClose: 5000,
      });
      flag = false;
    }
    if (scheduleEdit.break !== '00:00') {
      if (formData.end < formData.break || formData.end === formData.break) {
        toast('La hora de salida debe ser mayor a la hora de comida.', {
          type: 'warning',
          autoClose: 5000,
        });
        flag = false;
      }
    }
    return flag;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (scheduleEdit) {
        if (checkHours()) {
          await updateSchedule(scheduleEdit.id, formData);
        }
      } else {
        await SetSchedule(id, formData);
        toast('Horario registrado.', { type: 'success', autoClose: 2000 });
        handleSchedules();
        resetForm();
      }
    } catch (error) {
      toast('Algo salió mal, intenta más tarde.', {
        type: 'error',
        autoClose: 2000,
      });
    }
  };

  const resetForm = () => {
    setScheduleEdit(null);
    setFormData(initialState());
  };

  return (
    <>
      <form className='card card-body' onSubmit={(e) => onSubmit(e)}>
        <h4 className='mb-2'>
          {scheduleEdit ? 'Actualizar' : 'Agregar'} horario
        </h4>
        <div className='form-group'>
          <label htmlFor='number'>Hora entrada:</label>
          <input
            type='time'
            className='form-control'
            name='start'
            onChange={(e) => handleFormData(e)}
            value={formData.start}
            required
            readOnly={scheduleEdit ? true : false}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='number'>Hora inicio comida:</label>
          <input
            type='time'
            className='form-control'
            name='break'
            onChange={(e) => handleFormData(e)}
            value={formData.break}
            readOnly={
              (scheduleEdit && scheduleEdit?.break !== '00:00') ||
              !scheduleEdit?.start
                ? true
                : false
            }
          />
        </div>
        <div className='form-group'>
          <label htmlFor='number'>Hora salida:</label>
          <input
            type='time'
            className='form-control'
            name='end'
            onChange={(e) => handleFormData(e)}
            value={formData.end}
            readOnly={
              !scheduleEdit ||
              scheduleEdit?.end !== '00:00' ||
              scheduleEdit?.break === '00:00'
                ? true
                : false
            }
          />
        </div>
        <button type='submit' className='btn btn-primary mb-2'>
          {scheduleEdit ? 'Actualizar' : 'Guardar'}
        </button>
        {scheduleEdit && (
          <button
            onClick={() => resetForm()}
            type='button'
            className='btn btn-secondary'
          >
            Cancelar
          </button>
        )}
      </form>
    </>
  );
}
