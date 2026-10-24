"use strict";
const slides = [
 {src:"images/banner.jpg",alt:"The welcoming exterior of our coffee shop",caption:"Welcome To Our Coffee Shop"},
 {src:"images/coffee1.png",alt:"A cup of coffee in the sunshine",caption:"Bringing you the best coffee flavors from around the world"},
 {src:"images/coffee3.jpg",alt:"Inside Somewhere Coffee Shop",caption:"We are conveniently located in lower manhattan with plans to expand into Brooklyn in 2013\n292 Union Square West at 13th St. New York, New York 10003\nTelephone: 212.555.5555"}
];
let slide = 0;
let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let slideTimer;
const pauseButton = document.querySelector(".pause");
function showSlide(index){
 slide=(index+slides.length)%slides.length;
 const item=slides[slide], image=document.querySelector("#slide-image");
 image.src=item.src;image.alt=item.alt;
 document.querySelector("#slide-caption").textContent=item.caption;
 document.querySelector("#slide-count").textContent=`${slide+1} / ${slides.length}`;
 document.querySelectorAll(".dot").forEach((dot,i)=>dot.setAttribute("aria-current",String(i===slide)));
}
function updatePause(){pauseButton.textContent=paused?"Play":"Pause";pauseButton.setAttribute("aria-label",paused?"Play slideshow":"Pause slideshow");}
function restartSlideshow(){
 clearInterval(slideTimer);
 if(!paused)slideTimer=setInterval(()=>{if(!document.hidden)showSlide(slide+1);},6000);
}
function selectSlide(index){showSlide(index);restartSlideshow();}
showSlide(slide);
updatePause();
restartSlideshow();
document.querySelector(".prev").addEventListener("click",()=>selectSlide(slide-1));
document.querySelector(".next").addEventListener("click",()=>selectSlide(slide+1));
document.querySelectorAll(".dot").forEach(dot=>dot.addEventListener("click",()=>selectSlide(Number(dot.dataset.slide))));
pauseButton.addEventListener("click",()=>{paused=!paused;updatePause();restartSlideshow();});
const contact=document.querySelector(".contact-form");
if(contact)contact.addEventListener("submit",event=>{
 event.preventDefault();
 if(!contact.reportValidity())return;
 document.querySelector("#contact-status").textContent="Thank you, "+contact.elements.firstName.value.trim()+". Your form is valid. This is a classroom demo: no message has been sent and no newsletter subscription has been created.";
});
const drinks={black:{name:"Black Coffee",prices:[2,2.5,3]},chocolate:{name:"Hot Chocolate",prices:[2.5,3,3.5]},breve:{name:"Cafe Breve",prices:[2.5,3,3.5]},milk:{name:"Milk Coffee",prices:[1.5,2,2.5]},espresso:{name:"Espresso",prices:[2,2.5,3]},cappuccino:{name:"Cappuccino",prices:[2.5,3,3.5]}};
const order=document.querySelector(".order-form");
if(order){
 const requested=new URLSearchParams(location.search).get("drink");
 const key=Object.hasOwn(drinks,requested)?requested:"black";
 const drink=drinks[key];
 document.querySelector("h1").textContent=drink.name;
 document.title=drink.name+" | Somewhere Coffee Shop";
 if(key!=="black"){
  const thumbnails=document.querySelector(".thumbs");
  const thumbnail=thumbnails.querySelector(".thumb");
  thumbnail.dataset.photo=key;
  thumbnail.setAttribute("aria-label","View "+drink.name);
  thumbnail.querySelector(".product-photo").className="product-photo "+key;
  thumbnails.replaceChildren(thumbnail);
 }
 function photo(name){const image=document.querySelector("#product-photo");image.className="product-photo large "+name;image.setAttribute("aria-label",drinks[name].name);document.querySelectorAll(".thumb").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.photo===name)));}
 photo(key);
 document.querySelectorAll(".thumb").forEach(button=>button.addEventListener("click",()=>photo(button.dataset.photo)));
 const size=order.elements.size;
 drink.prices.forEach((price,i)=>{size.options[i].value=price;size.options[i].textContent=`$${price.toFixed(1)} (${"SML"[i]})`;});
 function total(){const n=Number(order.elements.quantity.value);document.querySelector("#total").textContent=Number.isInteger(n)&&n>=1&&n<=99?"$"+(n*Number(size.value)).toFixed(2):"--";}
 order.addEventListener("input",total);order.addEventListener("change",total);total();
 order.addEventListener("submit",event=>{event.preventDefault();if(!order.reportValidity())return;document.querySelector("#order-status").textContent=`Demo order: ${order.elements.quantity.value} ${drink.name}, size ${"SML"[size.selectedIndex]}, total ${document.querySelector("#total").textContent}. No payment was taken and no order was sent.`;});
 if(key!=="black"){
  const section=document.querySelector("main > section");section.querySelector("h2").textContent="About "+drink.name;
  section.querySelectorAll("p").forEach(p=>p.remove());
  const text=document.createElement("p");text.textContent="Enjoy a freshly prepared "+drink.name+" at Somewhere Coffee Shop. Choose your cup size and quantity above.";section.append(text);
 }
}
