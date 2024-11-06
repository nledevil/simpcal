import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // set data
    const newData = [];
    // get first day of previous month
    let dateObj = dayjs().subtract(1, 'month').startOf('month');
    for (let m = 0; m < 3; m += 1) {
      // Month
      const month = [];
      const monthNum = dateObj.format('M');
      const monthTitle = dateObj.format('MMMM');
      for (let r = 0; r < 5; r += 1) {
        // Row
        const row = [];
        for (let d = 0; d < 7; d += 1) {
          // Day
          const dow = parseInt(dateObj.format('d'));
          if (d === dow && dateObj.format('M') === monthNum) {
            // match
            row.push({
              d: dateObj.format('D'),
              isBlank: false,
              isToday: dateObj.isSame(dayjs(), 'day'),
            });
            dateObj = dateObj.add(1, 'day');
          } else {
            row.push({
              d: '',
              isBlank: true,
              isToday: false,
            });
          }
        }
        month.push(row);
      }
      newData.push({
        monthTitle,
        month
      });
    }
    console.info('newData:', newData);
    setData(newData);
  },[])
  return (
    <div id="container">
      {data.map((m, mIdx) => (<div className="month" key={mIdx}>
        <div className="title">
          {m.monthTitle}
        </div>
        <div className="cal-container">
          <table width="100%">
            <tbody>
              <tr className="cal-headers">
                <th className="cal-cells">Su</th>
                <th className="cal-cells">Mo</th>
                <th className="cal-cells">Tu</th>
                <th className="cal-cells">We</th>
                <th className="cal-cells">Th</th>
                <th className="cal-cells">Fr</th>
                <th className="cal-cells">Sa</th>
              </tr>
              {m.month.map((r, rIdx) => (
                <tr className="cal-rows" key={rIdx}>
                  {r.map((c, cIdx) => (
                    <td className="cal-cells" style={{ backgroundColor: (c.isToday) ? '#cd970c' : 'inherit', fontWeight: (c.isToday) ? 'bold' : 'normal'}}>{c.d}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>))}
    </div>
  );
}

export default App;
