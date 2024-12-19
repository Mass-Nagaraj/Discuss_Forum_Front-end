import React from 'react'

const FindDate = ({arr2,arr4}) => {
    
    let showdate=new Date()

    let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
    let dt=showdate.toDateString()
    let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
    const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
    const [currentHours,currentMinutes,currentsec]=displayTime.split(':');

    let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
    let arr3=[Number(currentHours),Number(currentMinutes)];
    let date=[];
    
    if(arr1[2]-arr2[2]!==0){
      date= arr2[2]-arr1[1]+"Years ago";
    }
    else if(arr1[1]-arr2[1]!==0){
      date= arr1[1]-arr2[1]+" Months ago";
    }
    else if(arr1[0]-arr2[0]!==0){
      date= arr1[0]-arr2[0]+" days ago";
    }
    else if(arr3[0]-arr4[0]!==0){
      date= arr3[0]-arr4[0]+" Hours ago"
    }
    else if(arr3[1]-arr4[1]!==0){
      date= arr3[1]-arr4[1]+" Minutes ago";
    }
    else{
      date= "Just Now";
    }
  

  return date;
}

export default FindDate
