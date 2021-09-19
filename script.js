function reverseStr(str) {


  var listChar = str.split('').reverse().join('');

  return listChar;
}

function isPali(str) {
  var rev = reverseStr(str);
  return str === rev;

}

var date = {
  day: 1,
  month: 12,
  year: 2020
}

function convertDateToStr(date) {
  var dateStr = {
    day: '', month: '', year: ''
  };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormat(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalinforAll(date) {
  var listall = getAllDateFormat(date);

  var isPalindrom = false;

  for (var i = 0; i < listall.length; i++) {
    if (isPali(listall[i])) {
      isPalindrom = true;
      break;
    }
  }
  return isPalindrom;
}


function ifLeap(year) {
  if (year % 400 === 0) {
    return true;
  } if (year % 100 === 0) {
    return false;
  } if (year % 4 === 0) {
    return true;
  }
  return false;
}


function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30,
    31, 30, 31, 31,
    30, 31, 30, 31];

  if (month === 2) {//feb check
    if (ifLeap(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year }


}

function getNextPali(date) {
  var ctrp = 0;
  var nextd = getNextDate(date);

  while (1) {
    ctrp++;

    var isPali = checkPalinforAll(nextd);
    if (isPali) {
      break;
    }
    nextd = getNextDate(nextd);
  }

  return [ctrp, nextd]
}


function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30,
    31, 30, 31, 31,
    30, 31, 30, 31];

  if (month === 3) {//feb check
    if (ifLeap(year)) {
      day = 29;
      month--;
    } else {
      day = 28;
      month--;
    }
  }
  else {
    if (day === 0) {
      month--;
      if (month === 0) {
        day = 31;
      } else {
        day = daysInMonth[month - 1];
      }
    }
  }

  if (month < 1) {
    month = 12;
    year--;
  }

  return { day: day, month: month, year: year }
}

function getPrevPali(date) {
  var ctr = 0;
  var prevd = getPrevDate(date);

  while (1) {
    ctr++;

    var isPali = checkPalinforAll(prevd);
    if (isPali) {
      break;
    }
    prevd = getPrevDate(prevd);
  }

  return [ctr, prevd]
}
function comparePrevNext(date) {

  var prevDateDuration = getPrevPali(date)[0];

  var nextDateDuration = getNextPali(date)[0];
 // console.log(prevDateDuration);
 //   console.log(nextDateDuration);
  //convertDateToStr(date)
  if (prevDateDuration < nextDateDuration) {
  return  getPrevPali(date); //+ ',' + prevDateDuration;
  } else {
  return  getNextPali(date);
    
  }
 
}

var dateInputRef = document.querySelector('#bdy-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');
//console.log(comparePrevNext(date));

function clickHandler(e){
  var bdyStr = dateInputRef.value;

  if(bdyStr !== ''){
    var listOfDate = bdyStr.split('-');
    var date = {
      day : Number(listOfDate[2]),
      month : Number(listOfDate[1]),
      year : Number(listOfDate[0])
    };
  var isPalindrom =  checkPalinforAll(date)
if(isPalindrom){
  resultRef.innerText = 'YEs'
}else{
  var [ctr, ndate] = comparePrevNext(date);
  
 resultRef.innerText = `no closest date is ${ndate.day}-${ndate.month}-${ndate.year}!! You missed by  ${ctr} days`
}
  }
  
}

showBtnRef.addEventListener('click', clickHandler);