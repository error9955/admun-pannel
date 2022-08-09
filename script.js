let url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
let tbody = document.querySelector("tbody")
let details = document.getElementById("info-wrapper")
let input = document.querySelector("input")

function renderTableData(tableData) {
    for (let i = 0; i < tableData.length; i++) {
        let currentTableData = tableData[i]
        let tr = document.createElement("tr")
        tr.classList.add("data-row")
        tr.innerHTML = ` <td class="column1">${currentTableData.id}</td>
                  <td class="column2">${currentTableData.firstName}</td>
                  <td class="column3">${currentTableData.lastName}</td>
                  <td class="column4">${currentTableData.email}</td>
                  <td class="column5">${currentTableData.phone}</td>`
        tbody.append(tr)
    }


    function onclickHandler(e) {
        details.lastChild.innerHTML = '';

        for (let i = 0; i < tableData.length; i++) {
            let currentTableData = tableData[i]
            if (currentTableData.id == e.target.parentNode.children[0].innerHTML) {

                console.log(currentTableData)
                let infocontent = document.createElement("div")
                infocontent.id = "info-content"
                infocontent.innerHTML = ` 
                <div><b>User selected:</b> ${currentTableData.firstName} ${currentTableData.lastName}</div>
                <div> <b>Description: </b>
                 <textarea cols="50" rows="5" readonly> ${currentTableData.description}</textarea>
                </div>
               <div><b>Address:</b> ${currentTableData.address.streetAddress}</div>
                <div><b>City:</b> ${currentTableData.address.city}</div>
                <div><b>State:</b> ${currentTableData.address.state}</div>
                <div><b>Zip:</b> ${currentTableData.address.zip}</div>`
                details.append(infocontent)

                let allRows = document.querySelectorAll("tr")
                for (let i = 0; i < allRows.length; i++) {
                    allRows[i].classList.remove("active")
                }
                e.target.parentNode.classList.add("active")
            }
        }
    }

   function renderTableDataaftersearch(searchTableData){
        let tr = document.createElement('tr');
        tr.classList.add('data-row');
        tr.innerHTML = `<td class="column1">${searchTableData.id}</td>
                        <td class="column2">${searchTableData.firstName}</td>
                        <td class="column3">${searchTableData.lastName}</td>
                        <td class="column4">${searchTableData.email}</td>
                        <td class="column5">${searchTableData.phone}</td>`
        return tr;
   }

    function oninputHandler(e) {
     
        let searchLetter = e.target.value
        console.log(searchLetter)
        tbody.innerHTML = ""

        if (searchLetter.length > 1) {
            for (let i = 0; i < tableData.length; i++) {
      
                let searchTableData = tableData[i]
                if (searchTableData.firstName.toUpperCase().includes(searchLetter.toUpperCase()) || searchTableData.lastName.toUpperCase().includes(searchLetter.toUpperCase()) || searchTableData.email.toUpperCase().includes(searchLetter.toUpperCase())) {
                    console.log(searchTableData)
              let tr =  renderTableDataaftersearch(searchTableData)
              tbody.append(tr)
                }
            }
        }
    }
    tbody.addEventListener('click', onclickHandler)
    input.addEventListener("keyup", oninputHandler)
}

let tableData = []


$.ajax({
    method: 'GET',
    url: "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
    success: function (data) {
        console.log(data)
        tableData = data,
            renderTableData(tableData)
    },
    error: function (error) {
        console.log(error)
    }
})