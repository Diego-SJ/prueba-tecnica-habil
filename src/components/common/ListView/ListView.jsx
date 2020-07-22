import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import EmptyList from '../EmptyList';
import { DeleteEmployee } from '../../../utils/Api';
import { toast } from 'react-toastify';

export default function ListView(props) {
  const { setEmployeeEdit, employees, handleEmployees } = props;
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount) {
      handleEmployees();
      setMount(true);
    }
  }, [handleEmployees, mount]);

  const deleteEmployee = async (id) => {
    try {
      await DeleteEmployee(id);
      toast('Empleado eliminado.', { type: 'success', autoClose: 2000 });
      handleEmployees();
    } catch (error) {
      toast('Error al eliminar.', { type: 'error', autoClose: 2000 });
    }
  };

  const editEmployee = async (emp) => {
    setEmployeeEdit(emp);
  };

  return (
    <div className='col-md-8 col-sm-12 col-xs-12 mb-2'>
      {employees.length > 0 ? (
        map(employees, (emp) => (
          <div className='card mb-1' key={emp.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <span className='text-capitalize'>{`${emp.lNameP} ${emp.lNameM} ${emp.name}`}</span>
                <div>
                  <Link to={`/detail/${emp.id}`} className='btn btn-success'>
                    Detalles
                  </Link>
                  <button
                    onClick={() => editEmployee(emp)}
                    className='btn btn-warning ml-1'
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className='btn btn-danger ml-1'
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
