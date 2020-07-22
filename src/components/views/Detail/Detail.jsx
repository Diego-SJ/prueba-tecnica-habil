import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeDetail from '../../common/EmployeeDetail';
import ScheduleList from '../../common/ScheduleList';
import { GetAllSchedulesByEmployee } from '../../../utils/Api';

function Detail() {
  let params = useParams();
  const [schedules, setSchedules] = useState([]);
  const [scheduleEdit, setScheduleEdit] = useState(null);

  const handleSchedules = async () => {
    let res = await GetAllSchedulesByEmployee(params.id);
    setSchedules(res);
  };

  return (
    <div className='container pt-4 pl-2'>
      <div className='row'>
        <div className='col-md-4 col-sm-12 col-xs-12 mb-2'>
          <EmployeeDetail
            handleSchedules={handleSchedules}
            schedules={schedules}
            scheduleEdit={scheduleEdit}
            setScheduleEdit={setScheduleEdit}
          />
        </div>
        <ScheduleList
          id={params.id}
          handleSchedules={handleSchedules}
          schedules={schedules}
          setScheduleEdit={setScheduleEdit}
        />
      </div>
    </div>
  );
}

export default Detail;
