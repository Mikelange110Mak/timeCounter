const dayList = document.querySelector('.dayList'),
   timeList = document.querySelector('.timeList'),
   rateList = document.querySelector('.rateList'),
   selectedYear = document.querySelector('.table__selected-year'),
   selectedMonth = document.querySelector('.table__selected-month'),
   elementAverageTimeSpan = document.querySelector('.table__average-month'),
   elementAverageRateSpan = document.querySelector('.table__average-rate'),
   submitBtn = document.querySelector('.select__submit'),
   tableSection = document.querySelector('.table'),
   outDataSection = document.querySelector('.out-data'),
   outDataSpan = document.querySelector('.out-data__span'),
   elementFooterBtn = document.querySelector('.footer__button'),
   formAddDay = document.querySelector('.add'),
   footerTitleBlock = document.querySelector('.footer__title')



let selectMonth, selectYear;
const url = 'http://localhost:3000'

async function onChange() {
   selectMonth = document.getElementById('month').value
   selectYear = document.getElementById('year').value
   const res = await getDataByDate(selectYear, selectMonth)
   clearData()
   drawData(res)
}

async function getDataByDate(year, month) {
   const response = await axios.post(`${url}/get_data`, { year, month })
   return response.data
}


function clearData() {
   dayList.innerHTML = ""
   timeList.innerHTML = ""
   rateList.innerHTML = ""
   elementAverageTimeSpan.innerHTML = ""
   elementAverageRateSpan.innerHTML = ""
}

async function drawData(storage) {
   console.log(storage);
   let timeCountArr = []
   let rateCountArr = []

   switch (true) {
      case (storage === undefined): tableSection.classList.add('hidden'); break
      case (storage.length < 1): tableSection.classList.add('hidden'), outDataSection.classList.remove('hidden'); break
   }

   if (storage) {
      for (let el of storage) {
         outDataSection.classList.add('hidden')
         tableSection.classList.remove('hidden')
         dayList.innerHTML += `<li class="table__list-item">${el.day}
               </li>`;
         timeList.innerHTML += `<li class="table__list-item">${el.time}
               </li>`;
         rateList.innerHTML += `<li class="table__list-item">${el.rate}
               </li>`;


         //Для подсчета средней оценки:
         timeCountArr.push(el.time)
         rateCountArr.push(el.rate)
      }

      const timeCount = timeCountArr.reduce((a, b) => (a + b), 0)
      const rateCount = rateCountArr.reduce((a, b) => (a + b), 0)
      const averageTime = Math.round(timeCount / timeCountArr.length)
      const averageRate = (rateCount / rateCountArr.length).toFixed(2)
      elementAverageTimeSpan.innerHTML += averageTime
      elementAverageRateSpan.innerHTML += averageRate
   }

   //Отображение выбранного месяца и года:
   let month = selectMonth
   let year = selectYear
   switch (month) {
      case '01': month = 'Январь'; break;
      case '02': month = 'Февраль'; break;
      case '03': month = 'Март'; break;
      case '04': month = 'Апрель'; break;
      case '05': month = 'Май'; break;
      case '06': month = 'Июнь'; break
      case '07': month = 'Июль'; break;
      case '08': month = 'Август'; break;
      case '09': month = 'Сентябрь'; break;
      case '10': month = 'Октябрь'; break;
      case '11': month = 'Ноябрь'; break;
      case '12': month = 'Декабрь'; break;
   }
   selectedYear.innerHTML = year
   selectedMonth.innerHTML = month
   outDataSpan.innerHTML = `${month} ${year}`
}
drawData()

elementFooterBtn.addEventListener('click', () => {
   formAddDay.classList.add('show')
   formAddDay.classList.remove('hide')
   footerTitleBlock.classList.remove('hide')
   footerTitleBlock.classList.add('show')
})










































/*





   let arr = storage[year][month]
   
   console.log(arr);
 
   
   
 
   
*/