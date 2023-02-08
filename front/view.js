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
   formAddDay = document.querySelector('.add'),
   modal = document.querySelector('.modal')



let selectMonth, selectYear, addDay, addMonth, addYear, addRate;

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


async function postData(addDay, addMonth, addYear, addTime, addRate) {
   const response = await axios.post(`${url}/post_data`, { addDay, addMonth, addYear, addTime, addRate })
   if (response.data === 'Wrong Data') {
      wrongData()
   }
   else {
      console.log(response.data);
      correctData()
   }
}

async function addNewDay() {
   addDay = document.getElementById('addDay').value
   addMonth = document.getElementById('addMonth').value
   addYear = document.getElementById('addYear').value
   addTime = document.getElementById('addTime').value
   addRate = document.getElementById('addRate').value
   const res = await postData(addDay, addMonth, addYear, addTime, addRate)
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



document.querySelectorAll('input[type="number"]').forEach(input => {
   input.oninput = () => {
      if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength)
   }
})

function openModal() {
   modal.classList.remove('hidden')
}
function closeModal() {
   modal.classList.add('hidden')
}

modal.addEventListener('click', (e) => {
   let modalBody = document.querySelector('.modal__body')
   if (e.target === modalBody || e.target === modal) closeModal()
})

document.addEventListener('keydown', (key) => {
   if (key.code === 'Escape') closeModal()
})



function wrongData() {
   let modalContent = document.querySelector('.modal__content')
   let errorModal = document.querySelector('.modal__error')
   errorModal.classList.remove('hidden')
   errorModal.classList.add('show')
   modalContent.classList.add('shake')

   console.log('error');
   setTimeout(() => {
      errorModal.classList.remove('show')
      errorModal.classList.add('hidden')
      modalContent.classList.remove('shake')
   }, 650);
}

function correctData() {
   let loadingBody = document.querySelector('.select__loading')
   let loadingItem = document.querySelector('.select__loading-item')
   loadingBody.classList.remove('hidden')
   submitBtn.classList.add('hidden')
   setTimeout(() => {
      loadingItem.innerHTML = 'День успешно добавлен!'
   }, 400);

   setTimeout(() => {
      loadingItem.innerHTML = ''
      loadingBody.classList.add('hidden')
      submitBtn.classList.remove('hidden')
   }, 750);
}
