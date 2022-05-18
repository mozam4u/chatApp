// client will find socket
// create socket here
// io is got from server
// 

const socket = io("http://localhost:8000")
// client will wrte the name
const name = prompt("Enter Your Name :  ")
// then evet will be called 
// ye ek event ko emit karega ,jisne join kiya naam pass krdo
socket.emit('new-user-joined',name)
// 
const form = document.getElementById("myform")
// we got message
const message = document.getElementById("msg")
// meassgage will go in mid section with id
const midsection = document.getElementById("midsection")
// wrte funtion append
// taje two parameter meaasge or possition


function append(message,position){
    // create paragragph
    const p = document.createElement("p")
    // create text ---pass message here
    const text = document.createTextNode(message)
    // now append in p
    p.append(text)
    // also add class
    p.classList.add(position)
    // now append the child
    midsection.appendChild(p)
}
// that will acceted by serevr
// evts wich will be acceted here
socket.on("user-joined",name=>{
    // calling append function here
    append(`${name} Joined the Chat`,'mid')
})
socket.on("receive",data=>{
    append(`${data.name} : ${data.message}`,'left')
})
// serevr is sending user joined
socket.on("user-left",name=>{
    append(`${name} left the Chat`,"mid");
})

// crreate form wi add event listener
// agr submit event hua to ..to evet milaega 
// 
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    // ek message milaega
    const message = msg.value
    // jo bhi meeage ha ...aapne mesgae bgeja ha
    append(`${message}:You`,"right")
    // ek event krdege
    // 
    socket.emit("send",message)
    // msh ko balnk krdo
    msg.value=""
})
