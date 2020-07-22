import { db } from './Firebase';
import { map } from 'lodash';
import * as moment from 'moment';

export const AddEmployee = async (EmployeeObject) => {
  try {
    await db.collection('Employee').doc().set(EmployeeObject);
    return true;
  } catch (error) {
    return false;
  }
};

export const GetAllEmployees = async () => {
  try {
    const res = await db.collection('Employee').get();
    const employeeList = [];
    map(res?.docs, (emp) => {
      const data = emp.data();
      data.id = emp.id;
      employeeList.push(data);
    });
    return employeeList;
  } catch (error) {
    return false;
  }
};

export const DeleteEmployee = async (id) => {
  if (window.confirm('¿Deseas eliminar a este empleado?')) {
    try {
      await db.collection('Employee').doc(id).delete();
    } catch (error) {
      return false;
    }
  }
};

export const UpdateEmployee = async (id, emp) => {
  try {
    await db.collection('Employee').doc(id).update(emp);
    return true;
  } catch (error) {
    return false;
  }
};

export const GetEmployeeById = async (id) => {
  try {
    let emp = await db.collection('Employee').doc(id).get();
    let empObj = {};
    empObj.id = id;
    empObj.number = emp.data().number;
    empObj.name = emp.data().name;
    empObj.lNameP = emp.data().lNameP;
    empObj.lNameM = emp.data().lNameM;
    empObj.rol = emp.data().rol;
    empObj.area = emp.data().area;
    empObj.boss = emp.data().boss;
    return empObj;
  } catch (error) {
    return false;
  }
};

export const SetSchedule = async (id, data) => {
  try {
    await db
      .collection('Employee')
      .doc(id)
      .collection('Schedules')
      .doc()
      .set({
        day: moment().format('L'),
        start: data.start,
        break: data.break,
        end: data.end,
      });
    return true;
  } catch (error) {
    return false;
  }
};

export const GetAllSchedulesByEmployee = async (id) => {
  try {
    const res = await db
      .collection('Employee')
      .doc(id)
      .collection('Schedules')
      .get();
    const ScheduleList = [];
    map(res?.docs, (sch) => {
      const data = sch.data();
      data.id = sch.id;
      ScheduleList.push(data);
    });
    return ScheduleList;
  } catch (error) {
    return false;
  }
};

export const DeleteSchedule = async (idE, idS) => {
  if (window.confirm('¿Deseas eliminar este item?')) {
    try {
      await db
        .collection('Employee')
        .doc(idE)
        .collection('Schedules')
        .doc(idS)
        .delete();
    } catch (error) {
      return false;
    }
  }
};

export const UpdateSchedule = async (idE, idS, data) => {
  try {
    await db
      .collection('Employee')
      .doc(idE)
      .collection('Schedules')
      .doc(idS)
      .update(data);
    return true;
  } catch (error) {
    return false;
  }
};
