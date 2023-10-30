/* Your Code Here */
function createEmployeeRecord(data) {
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(data) {
    return data.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeInEvents.push({ type: 'TimeIn', date, hour: parseInt(hour, 10) });
    return this; // Return 'this' for method chaining
  }
  
  function createTimeOutEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeOutEvents.push({ type: 'TimeOut', date, hour: parseInt(hour, 10) });
    return this; // Return 'this' for method chaining
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    }
    return 0;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(event => event.date);
    const payable = eligibleDates.reduce((memo, date) => memo + wagesEarnedOnDate.call(this, date), 0);
    return payable;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
  }