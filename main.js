//!Ay Dizisi
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


//!Html'den gelen elemanlar
const addBox=document.querySelector(".add-box");
const popupBoxContainer=document.querySelector(".popup-box");
const popupBox=document.querySelector(".popup")
//*console.log(popupBoxContainer);
//*console.log(popupBox);
const closeBtn=document.querySelector("header i");
//*console.log(closeBtn)
const form = document.querySelector("form");
//*console.log(form);
const wrapper=document.querySelector(".wrapper");
//onsole.log(wrapper)
const popuTitle=document.querySelector("header p");
const submitBtn=document.querySelector("#submit-btn");



//!localstorage'dan notları al
 let notes=JSON.parse(localStorage.getItem("notes")) || [] ;
//console.log(notes);

//Güncelleme için gereken değişkenler
let isUpdate=false;
letupdateId=null;

                     //!!FONSİYONLAR VE OLAY İZLEYİCİLERİ
//AddBox'a Tıklandıgında oluşur
addBox.addEventListener("click",()=>{
   //PopupBox ve popupboxconatinert class ekle
   popupBox.classList.add("show");
   popupBoxContainer.classList.add("show");
   
   //Arka plandaki sayfa kaydırılmasını engeller
   document.querySelector("body").style.overflow="hidden";
});

//CloseBtn'e tıklayınca popupBoxContainer ve popup'a eklenen classları kaldır.
closeBtn.addEventListener("click",()=>{
    popupBox.classList.remove("show");
    popupBoxContainer.classList.remove("show");
    document.querySelector("body").style.overflow="auto";
});

//Menu ksımını ayarlayan fonsiyon
function showMenu(elem){//parentElement bir elemanın kapsam elemanına erişmek için kullanılır

//Tıklanılan elemanın kapsamına eriştikten sonra buna bir class ekledik
elem.parentElement.classList.add("show");

//Tıklanan yer menu kısmı haricindeyse show clasını kaldır
document.addEventListener("click",(e)=>{
    //Tıklanan kısım i etiketi değilse yada kapsam dışarısındaysa show clasını kaldır
    if(e.target.tagName !="I" || e.target != elem) {
        elem.parentElement.classList.remove("show");
}
});
}

//Wrapper kısmındaki tıklanmaları izle
wrapper.addEventListener("click",(e)=>{
   
    //Eğer üç noktaya tıklanıldığında
    if(e.target.classList.contains("bx-dots-horizontal-rounded")){
        showMenu(e.target);
    }

    //Eğer sil ikona tıklanıldıgında
    else if(e.target.classList.contains("deletIcon")){
        const res=confirm ("Bu notu silmek silmek istediğinize eminmisiniz?");
        if(res){
            //Tıklanan note elemannına eriş
            const note=e.target.closest(".note");
            //notun idsine eriş
            const noteId=note.dataset.id;
            // Notes dizisini dön ve id'si noteId'ye eşit olan elemanı diziden kaldır
           notes = notes.filter((note) => note.id != noteId);
          
           // localStorage'ı güncelle
      localStorage.setItem("notes", JSON.stringify(notes));

      // renderNotes fonksiyonunu çalıştır
      renderNotes();
        }
    }
    // Eğer güncelle ikonuna tıklanıldıysa
 else if (e.target.classList.contains("updateIcon")) {
    // Tıklanılan note elemanına eriş
    const note = e.target.closest(".note");
    // Note elemanının idsine eriş
    const noteId = parseInt(note.dataset.id);
    // Note dizisi içerisinde id'si bilinen elemanı bul
    const foundedNote = notes.find((note) => note.id == noteId);

    // Popup içerisindeki elemanlara note değerlerini ata
    form[0].value = foundedNote.title;
    form[1].value = foundedNote.description;

    // Güncelleme modunu aktif et
    isUpdate = true;
    updateId = noteId;

    // Popup'ı aç
    popupBoxContainer.classList.add("show");
    popupBox.classList.add("show");

    // Popup içerisindeki gerekli alanları update e göre düzenle
    popupTitle.textContent = "Update Note";
    submitBtn.textContent = "Update";
  }

});

 //Form'a bir olay izleyici ekle ve form icerisindeki verilere eriş
form.addEventListener("submit",(e)=>{
    
    //form gönderildiğinde sayfa yenilemesini engeller
    e.preventDefault();
    
    //form gönderildiğinde form içerindeki verileri eriş
    let titleInput=e.target[0];
   let descriptioInput= e.target[1];
   
   //form icerisindeki değerleri eriş///Elemanın başındaki boslukları kaldırma TRİM
   let title=titleInput.value.trim();
   let description = descriptioInput.value.trim();
    
   //Eğer title ve description değeri yoksa uyarı ver
   if(!title && !description){
    alert("Lütfen formdaki gerekli kısımları doldurunuz.");
   }
    
   //Tarih yazma
    const date= new Date();
    //console.log(date);
    let day=date.getDate();
    let year=date.getFullYear();
    let month=months[date.getMonth()];
    console.log(day);
    console.log(year);
    console.log[date.getMonth()];
    
  // Eğer güncelleme modundaysa
  if (isUpdate) {
    // Güncelleme yapılacak elemanın dizi içerisindeki indexini bul
    const noteIndex = notes.findIndex((note) => {
      return note.id == updateId;
    });
   
// Elde edilen verileri bir note objesi alında topla
 let noteInfo={
    title,
    description,
    date:"${month} ${day},${year}",
    
 };
 // Güncelleme modunu kapat ve popup içerisindeki elemanları eskiye çevir
 isUpdate = false;
 updateId = null;
 popupTitle.textContent = "New Note";
 submitBtn.textContent = "Add Note";
} else {
 // Elde edilen verileri bir note objesi altında topla
 let noteInfo = {
   title,
   description,
   date: `${month} ${day},${year}`,
   
 };
// noteInfo objesini notes dizisine ekle
 notes.push(noteInfo);
}

 //Note objesini localstorage ekle
localStorage.setItem("notes",JSON.stringify(notes));
 
 //Formu icerisindeki elemanları temzile
  titleInput.value="";
  descriptioInput.value="";
 
  //Popup kapat 
 popupBoxContainer.classList.remove("show");
 popupBox.classList.remove("show");
  
 //Arka plandaki sayfa kaydırılmasını engeller
 document.querySelector("body").style.overflow="auto";

 //Not eklendikten sonra render et
 renderNotes();
 });

//localStorage'daki verilere göre ekrana  note kartları render eden fonksiyon

function renderNotes(){
    
    //Eğer localstorage'da not verisi yoksa fonksiyonu durdur
    if(!notes)
     return;
    
    //Önce mevcut noteları kaldır
    document.querySelectorAll(".note").forEach((li) =>li.remove());
    
    //note dizisindeki her bir eleman için ekrana bir not kartı render et
    notes.forEach((note)=>{
        
// data-id'yi  elemanlara id vermek için kullandık
    let liTag = `<li class="note" data-id='${note.id}'>
    <div class="details">
      <p class="title">${note.title}</p>
      <p class="description">
     ${note.description}
      </p>
    </div>
 
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings ">
        <i class="bx bx-dots-horizontal-rounded"></i>
        <ul class="menu">
          <li class='updateIcon'><i class="bx bx-edit"></i> Düzenle</li>
          <li class='deleteIcon'><i class="bx bx-trash"></i> Sil</li>
        </ul>
      </div>
    </div>
  </li>`;

  //insertAdjacentHTML metodu belirli bir öğeyi bir Html elemanına göre sıralı şekilde eklemek için kullanılır.Bu metot hangi konuma ekleme yapılacak ve hangi eleman eklenecek bunu belirtmemizi ister
addBox.insertAdjacentHTML("afterend", liTag);
    });
}
// Sayfa yüklendiğinde renderNotes fonksiyonunu çalıştır
document.addEventListener("DOMContentLoaded",()=>showNotes());