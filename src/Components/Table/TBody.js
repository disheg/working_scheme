import React from 'react';
import Cell from './Cell';

const _ = require('lodash');

const msToTime = (duration) => {
  let hours = duration / (1000 * 60 * 60);

  return hours ;
};

const calculateWorkingTime = (data) => {
  const weeks = Object.keys(data);
  const result = weeks.reduce((acc, key) => {
    const week = data[key];
    const keysOfDays = Object.keys(week);
    const callculateHoursOfWeek = keysOfDays.reduce((accTime, keyDay) => {
      const time = week[keyDay];
      if (time === '' || !time) return accTime;
      console.log(time)
      const [start, end] = time.split('-');
      const [startHour, startMinutes] = start.split(':');
      const [endHour, endMinutes] = end.split(':');
      const startTime = new Date(2011, 0, 1, startHour, startMinutes);
      const endTime = new Date(2011, 0, 1, endHour, endMinutes);
      const ms = endTime - startTime;
      let hoursOfDay = msToTime(ms);
      if (hoursOfDay > 6) {
        hoursOfDay -= 1;
      }
      return accTime + hoursOfDay;
    }, 0);
    return acc + callculateHoursOfWeek;
  }, 0);
  return result;
}

const Body = (props) => {
    if (!props.week) {
      const { data } = props;
      const table = data.map(({ name, jobtime }, index) => {
        const hours = calculateWorkingTime(jobtime);
        const procentageOfHours = (hours * 100) / 160;
        return (<tr key={_.uniqueId(name, index)}>
          <td>{name}</td>
          <td>{hours}</td>
          <td>{procentageOfHours}%</td>

        </tr>)
      });
      return (<tbody>{table}</tbody>)
    }
    const { week, data, updateSchema } = props;

    const table = data.map(({ name, jobtime }, index) => {
      const objOfWeekTimes = jobtime[week];
      const keys = Object.keys(objOfWeekTimes);
      const nameCell = <td key={_.uniqueId(name, index)}>{name}</td>;
      const cells = keys.map((day) => (
        <Cell
          name={name}
          day={day}
          key={_.uniqueId(day)}
          value={objOfWeekTimes[day]}
          onSubmit={updateSchema}
          week={week}
        />
      ));
      const cellsData = [nameCell, ...cells];
      return (
        <tr key={_.uniqueId(name, index)}>
          {cellsData}
        </tr>
      );
    });
    return (
      <tbody>{table}</tbody>
    );
}

export default Body;
