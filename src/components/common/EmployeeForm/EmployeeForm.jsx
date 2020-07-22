import React, { useState, useEffect } from 'react';
import { AddEmployee, UpdateEmployee } from '../../../utils/Api';
import { toast } from 'react-toastify';

const initialState = () => ({
  number: '',
  name: '',
  lNameP: '',
  lNameM: '',
  rol: '',
  area: '',
  boss: '',
});

export default function Form(props) {
  const { employeeEdit, handleEmployees, setEmployeeEdit } = props;
  const [formData, setFormData] = useState(initialState());

  useEffect(() => {
    if (employeeEdit) {
      setFormData({
        number: employeeEdit.number,
        name: employeeEdit.name,
        lNameP: employeeEdit.lNameP,
        lNameM: employeeEdit.lNameM,
        rol: employeeEdit.rol,
        area: employeeEdit.area,
        boss: employeeEdit.boss,
      });
    }
  }, [employeeEdit]);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateEmployee = async (id, emp) => {
    try {
      await UpdateEmployee(id, emp);
      toast('Empleado actualizado.', { type: 'success', autoClose: 2000 });
    } catch (error) {
      toast('Error al eliminar.', { type: 'error', autoClose: 2000 });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employeeEdit) {
        updateEmployee(employeeEdit.id, formData);
      } else {
        await AddEmployee(formData);
        toast('Empleado registrado.', { type: 'success', autoClose: 2000 });
      }
      handleEmployees();
      setFormData(initialState());
    } catch (error) {
      toast('Algo salió mal, intenta más tarde.', {
        type: 'error',
        autoClose: 2000,
      });
    }
  };

  const resetForm = () => {
    setEmployeeEdit(null);
    setFormData(initialState());
  };

  return (
    <>
      <form className='card card-body' onSubmit={(e) => onSubmit(e)}>
        <h2>{employeeEdit ? 'Actualizar' : 'Registrar'} empleado</h2>
        <div className='form-group'>
          <label htmlFor='number'>Número del empleado</label>
          <input
            type='number'
            min='0'
            className='form-control text-capitalize'
            name='number'
            onChange={(e) => handleFormData(e)}
            value={formData.number}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Nombre del empleado</label>
          <input
            type='text'
            className='form-control text-capitalize'
            name='name'
            onChange={(e) => handleFormData(e)}
            value={formData.name}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lnameP'>Apellido Paterno</label>
          <input
            type='text'
            className='form-control text-capitalize'
            name='lNameP'
            onChange={(e) => handleFormData(e)}
            value={formData.lNameP}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lnameM'>Apellido Materno</label>
          <input
            type='text'
            className='form-control text-capitalize'
            name='lNameM'
            onChange={(e) => handleFormData(e)}
            value={formData.lNameM}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='rol'>Puesto</label>
          <input
            type='text'
            className='form-control text-capitalize'
            name='rol'
            onChange={(e) => handleFormData(e)}
            value={formData.rol}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='area'>Area</label>
          <input
            type='text'
            className='form-control text-capitalize'
            name='area'
            onChange={(e) => handleFormData(e)}
            value={formData.area}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='boss'>Jefe inmediato</label>
          <input
            type='text'
            className='form-control text-capitalize'
            name='boss'
            onChange={(e) => handleFormData(e)}
            value={formData.boss}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary mb-2'>
          {employeeEdit ? 'Actualizar' : 'Registrar'}
        </button>
        {employeeEdit && (
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
