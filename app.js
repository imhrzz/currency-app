const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns= document.querySelectorAll(".dropdown select");
const bttn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
// if we want to perform this events at the very first time 
window.addEventListener("load", ()=>{
    UpdateExchangeRate();

})

for(let select of dropdowns){
    for( currency_code in countryList){
        //after accessing each currency code and  country code 
        //adding a newoption bar to reflect this available options
        let newOption=document.createElement("option");
        newOption.innerText=currency_code;
        newOption.value=currency_code;
        //adding a logic to add USD and INR default;
        if(select.name === "from" && currency_code==="USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && currency_code==="INR"){
            newOption.selected="selected";
        }
        //adding these new option in select 

        select.append(newOption);
    }
    // adding a event listener to reflect the change in the select 
    // then calling a function to change flag accordingly
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}
//function to update flag dynamically
 const updateFlag=(element)=>{

    let currency_code= element.value;
    let countryCode=countryList[currency_code];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;

    let img =element.parentElement.querySelector("img");
    img.src=newSrc;
 }

 

 bttn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    UpdateExchangeRate();

 });

 const UpdateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if (amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1" //setting the amount value to the string;
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    //to get exhchange rate also given api works in lower case hence
    // making evt functon async to use await-async
    let response=await(fetch (URL));
    // 
    let data = await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=amount * rate;
    msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`
 }

