const { expect } = require("chai");

// Your code here
function createEmployeeRecord(employeeData){
    const employeeInfo = {};
    employeeInfo.firstName = employeeData[0]
    employeeInfo.familyName = employeeData[1]
    employeeInfo.title = employeeData[2]
    employeeInfo.payPerHour = employeeData[3]
    employeeInfo.timeInEvents = []
    employeeInfo.timeOutEvents = []
    return employeeInfo;
  }   

  

function createEmployeeRecords(allEmployeeData) {
    const employeeRecords = [];

    allEmployeeData.forEach(data => {
        const employee = createEmployeeRecord(data);
        employeeRecords.push(employee)
        
    })
    return employeeRecords;
    }
function createTimeInEvent(employeeRecord, dateStamp) {
    
    const [date, hour] = dateStamp.split(" "); 
    
    const timeInEvent = {

        type: "TimeIn",
        hour: parseInt(hour),
        date 
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}
function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}
function hoursWorkedOnDate(employeeRecords, date){
    const workedTimeIn = employeeRecords.timeInEvents.find(clockTime=> clockTime.date === date)
    const workedTimeOut = employeeRecords.timeOutEvents.find(clockTime => clockTime.date === date)
    const workedHours = (workedTimeOut.hour - workedTimeIn.hour) / 100
    return workedHours
}
function wagesEarnedOnDate(employeeRecords, date) {
    const employeePay = employeeRecords.payPerHour
    const wage = hoursWorkedOnDate(employeeRecords, date) * employeePay
    return wage
}
function allWagesFor(employeeRecord){
    const timeIn = employeeRecord.timeInEvents
    let totalPay = 0
    timeIn.forEach(timeInEvent => {
        const date = timeInEvent.date
        const payForDate = wagesEarnedOnDate(employeeRecord, date)
        totalPay += payForDate
    }
   
        ) 
        return totalPay
}
function calculatePayroll(employeeRecords) {
    
    let totalPay = 0
    employeeRecords.forEach(employeeRecords => {
        totalPay += allWagesFor(employeeRecords)
    })
    return totalPay
}


  
   

    
