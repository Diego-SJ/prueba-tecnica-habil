import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ScheduleForm from '../ScheduleForm';
import { GetEmployeeById } from '../../../utils/Api';

const initialState = () => ({
  number: '',
  name: '',
  lNameP: '',
  lNameM: '',
  rol: '',
  area: '',
  boss: '',
});

const EmployeeDetail = (props) => {
  let params = useParams();
  const { scheduleEdit, handleSchedules, setScheduleEdit } = props;
  const [employee, setEmployee] = useState(initialState());
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const getEmployee = async () => {
      let emp = await GetEmployeeById(params.id);
      setEmployee({
        number: emp.number,
        name: emp.name,
        lNameP: emp.lNameP,
        lNameM: emp.lNameM,
        rol: emp.rol,
        area: emp.area,
        boss: emp.boss,
      });
    };
    if (!mount) {
      getEmployee();
      setMount(true);
    }
  }, [employee, mount, params, setEmployee]);

  return (
    <>
      <Link to='/' className='btn btn-block btn-info mb-2'>
        Regresar
      </Link>
      <div className='card card-body mb-2'>
        <h4 className='mb-2'>Datos del empleado</h4>
        <p className='text-capitalize'>
          Número de empleado: {`${employee.number}`}
        </p>
        <p className='text-capitalize'>
          Nombre: {`${employee.name} ${employee.lNameP} ${employee.lNameM}`}
        </p>
        <p className='text-capitalize'>Puesto: {`${employee.rol}`}</p>
        <p className='text-capitalize'>Area: {`${employee.area}`}</p>
        <p className='text-capitalize'>Jefe directo: {`${employee.boss}`}</p>
      </div>
      <ScheduleForm
        id={params?.id}
        scheduleEdit={scheduleEdit}
        handleSchedules={handleSchedules}
        setScheduleEdit={setScheduleEdit}
      />
    </>
  );
};

export default EmployeeDetail;
