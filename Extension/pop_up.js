const cardHolder = document.getElementById("holder");

const lansariAPI = "http:localhost:3000/launches";
var lansari = [];



function getLansari(){
    
    return fetch(lansariAPI).then(res=>res.json()).then(posts=>{
    lansari = posts.data;console.log(lansari);init();
});  
}

function init(){
    console.log(lansari);
    for(var i=0;i<lansari.length;i++){
        let x = lansari[i]["vidURLs"][0] || "";
        let term = x.substr(x.length-11,x.length-1);
        let forecast = (lansari[i].forecast)?lansari[i].forecast.weather[0].main:"Incerta";
        if(x=="")x = "<p>Nici.un video disponibil!</p>"
        else
        x = '<iframe class = "inv" id="fr'+i+'" src="https://www.youtube.com/embed/' + term + '"></iframe><p class="descriere2" >!Live Video!</p> ';
        holder.innerHTML += '<div class="item"><div class="titl"><div class="titl_img"><img id="littleImg" src="'+lansari[i]["imageURL"]+'"/></div><div class="titl_bdy"><p class="titleFont">'+lansari[i]["name"]+'</p><p class="dateFont">'+lansari[i]["windowstart"]+'</p><p class="descFont">'+lansari[i]["missions"][0]["description"].substr(1,290) +'<a href="#" id="link'+i+'"> Read More</a></p></div></div></div></div><div class="bdy" id="bdy'+i+'"><p class="descriere">'+lansari[i]["missions"][0]["description"]+'</p><div id="camp">'+x+'<br /> <p class="titleFont">Probilitate meteo:'+forecast+'</p></div> </div>';
    }
   
        
        for(let i=0;i<lansari.length;i++)
        {
            
    let link = document.getElementById("link"+i);
         link.addEventListener('click',function(){

        let bdy = document.getElementById("bdy"+i);
             bdy.classList.add('expanded');
             

        for(var x=0;x<lansari.length;x++){
             let fr = document.getElementById("fr"+x);

            if(fr)fr.classList = "inv";
        }
              let fr = document.getElementById("fr"+i);
              if(fr)  fr.classList = "vis";
             console.log(fr);
         }); 
            
        }
}


document.addEventListener('DOMContentLoaded', function() {
      getLansari();
    });

document.addEventListener('click', function(){
    
});



