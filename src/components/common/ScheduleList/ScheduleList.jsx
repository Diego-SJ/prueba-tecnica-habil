import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import EmptyList from '../EmptyList';
import { DeleteSchedule } from '../../../utils/Api';
import { toast } from 'react-toastify';

export default function ScheduleList(props) {
  const { id, schedules, setScheduleEdit, handleSchedules } = props;
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount) {
      handleSchedules();
      setMount(true);
    }
  }, [handleSchedules, mount, schedules]);

  const deleteItem = async (idS) => {
    try {
      await DeleteSchedule(id, idS);
      toast('Item eliminado.', { type: 'success', autoClose: 2000 });
      handleSchedules();
    } catch (error) {
      toast('Error al eliminar.', { type: 'error', autoClose: 2000 });
    }
  };

  const editSchedule = async (sch) => {
    setScheduleEdit(sch);
  };

  return (
    <div className='col-md-8 col-sm-12 col-xs-12 mb-2'>
      {schedules.length > 0 ? (
        map(schedules, (sche) => (
          <div className='card mb-1' key={sche.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <div>{`Día: ${sche.day}`}</div>
                <div>
                  <p>{`Hora entrada: ${sche.start}`}</p>
                  <p>{`Hora comida: ${sche.break}`}</p>
                  <p>{`Hora salida: ${sche.end}`}</p>
                </div>
                <div>
                  <button
                    onClick={() => editSchedule(sche)}
                    className='btn btn-warning ml-1'
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteItem(sche.id)}
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
