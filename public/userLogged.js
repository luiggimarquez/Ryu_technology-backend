let showOrders = document.getElementById("allOrders")
let showMessages = document.getElementById("allMessages")
let userMail = document.getElementById("userMail").value

console.log("correo: ",userMail)

function orders()  {
   
    if (showOrders.style.display === "none") {
      showOrders.style.display = "flex"
      showMessages.style.display = "none";
    } else {
      showOrders.style.display = "none";
    } 
}
function messages()  {
   
    if (showMessages.style.display === "none") {
      showMessages.style.display = "flex";
      showOrders.style.display = "none"
    } else {
      showMessages.style.display = "none";
    } 
}

let getOrders = document.getElementById("buttonOrders")
getOrders.addEventListener(("click"),()=>{

    console.log("entre")
    fetch('/orden').then(response => {
		return response.text()
	}).then(data => {

		
		const json = JSON.parse(data)
		console.log(json)

        loadOrders(json).then(ordersToPrint => {
            document.getElementById('allOrders').innerHTML = []
            document.getElementById('allOrders').innerHTML = ordersToPrint
        })
       
        console.log("hecho")

	}).catch(err=>{
		console.log(err)
	}); 

})

let getMessages = document.getElementById("buttonMessages")
getMessages.addEventListener("click",()=>{

    let email=[]
    console.log("entre msg")
    fetch(`/chat/${userMail}`).then(response => {
		return response.text()
	}).then(data => {

		
		const json = JSON.parse(data)
		console.log(json)

        loadMessages(json).then(messagesToPrint => {
            document.getElementById('allMessages').innerHTML = []
            document.getElementById('allMessages').innerHTML = messagesToPrint
        })

	}).catch(err=>{
		console.log(err)
	});

})




async function  loadOrders(result) {

    const response = await fetch('views/ejs/allOrders.ejs');
    const templateOrders = await response.text();
    const template = ejs.compile(templateOrders);
    const tableOrders = template({ result });
    return tableOrders;  
}

async function  loadMessages(result) {

    const response = await fetch('views/ejs/userMessages.ejs');
    const templateMessages = await response.text();
    const template = ejs.compile(templateMessages);
    const tableMessages = template({ result });
    return tableMessages;  
}