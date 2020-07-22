import React, { useState } from 'react';
import EmployeeForm from '../../common/EmployeeForm';
import ListView from '../../common/ListView';
import { GetAllEmployees } from '../../../utils/Api';

function Home() {
  const [employeeEdit, setEmployeeEdit] = useState(null);
  const [employees, setEmployees] = useState([]);

  const handleEmployees = async () => {
    let emp = await GetAllEmployees();
    setEmployees(emp);
  };

  return (
    <div className='container pt-4 pl-2'>
      <div className='row'>
        <div className='col-md-4 col-sm-12 col-xs-12 mb-2'>
          <EmployeeForm
            setEmployeeEdit={setEmployeeEdit}
            employeeEdit={employeeEdit}
            handleEmployees={handleEmployees}
          />
        </div>
        <ListView
          employees={employees}
          handleEmployees={handleEmployees}
          setEmployeeEdit={setEmployeeEdit}
          employeeEdit={employeeEdit}
        />
      </div>
    </div>
  );
}

export default Home;
