let colorBtn=document.querySelectorAll(".filter-color");
let plusButton=document.querySelector(".plus-box");
let secondContainer=document.querySelector(".second-part");
let allColors=["pink","blue","green","black"]; 
let crossButton=document.querySelector(".cross-box");

let deleteState=false;

let taskArr=[];

if(localStorage.getItem("tasks")){
    taskArr=JSON.parse(localStorage.getItem("tasks"));
    for(let i=0;i<taskArr.length;++i){
        
        createLocalStorageCard(taskArr[i].id,taskArr[i].color,taskArr[i].text);
    }
}

let body=document.body;

crossButton.addEventListener("click",function(e){
    if(deleteState){
        deleteState=false;
        crossButton.classList.remove("active");
    }
    else{
        deleteState=true;
        crossButton.classList.add("active");
    }
})  

body=document.body;

plusButton.addEventListener("click",function(e){
    let data=document.querySelector(".second-container");
    plusButton.classList.add("active");
    if(data!=null) return ;
    let newDiv=document.createElement("div");
    newDiv.setAttribute("class","second-container");
    newDiv.innerHTML=`<div class="text-container">
    <textarea class="text" placeholder="Type Task Here"></textarea>
</div>
<div class="color-container">
    <div class="priority-box-wrapper">
        <div class="pink priority-box"></div>
        <div class="blue priority-box"></div>
        <div class="green priority-box"></div>
        <div class="black priority-box"></div>
</div>
</div> `;
    body.appendChild(newDiv);
    let textArea=document.querySelector(".text");
    let priorityBoxes=document.querySelectorAll(".priority-box");
    let obj={
        color:"pink"
    }
    getColorCode(priorityBoxes,obj);
    fun(textArea,newDiv,obj);
})

function fun(textArea,newDiv,obj){
    textArea.addEventListener("keydown",function(e){
        if(e.key=='Enter' && textArea.value!=""){
            // console.log("inside");
            let textData=textArea.value;
            let card=createCard(obj,textData)
            plusButton.classList.remove("active");
            newDiv.remove();

            AddToLocalStoage(card); //! adds to local storage
            
            secondContainer.appendChild(card);      
            card.addEventListener("click",function(e){
                if(deleteState && e.target.classList[0]!='priority-color') {
                    
                    removeFromLocalStorage(card); //! removes from local storage
                    
                    card.remove() ;
                }
            });
        }
    })
}

function createCard(obj,text){
    let div=document.createElement("div");
    div.setAttribute("class","card");
    
    let id=new ShortUniqueId();
    let uniqueId=id();
    div.innerHTML=`
    <div class="priority-color ${obj.color}" ></div>
    <h4 class="uid">${uniqueId}</h4>
    <div class="card-content" contenteditable="true">${text}</div>`;
    
    let childCard=div.querySelector(".priority-color");
    childCard.addEventListener("click",function(){
        
        let currColor=childCard.classList[1];
        
        let idx=allColors.indexOf(currColor);
        let newColorStripOnCard=allColors[(idx+1)%allColors.length];
        childCard.classList.remove(currColor);
        childCard.classList.add(newColorStripOnCard);

        updateLocalStorage(card);  //! updates local storage

    }) 

    // div.querySelector(".card-content").addEventListener("keydown",function(){
        
    // })

    return div;
}


function getColorCode(priorityBoxes,obj){
    for(let i=0;i<priorityBoxes.length;++i){
        priorityBoxes[i].addEventListener("click",function(e){
            
            for(let j=0;j<priorityBoxes.length;++j)
                priorityBoxes[j].classList.remove("border");
            
            priorityBoxes[i].classList.add("border");
            obj.color=priorityBoxes[i].classList[0];
        });
    }
}

function AddToLocalStoage(card){
    let priorityColor=card.querySelector(".priority-color").classList[1];
    let id=card.querySelector(".uid").textContent;
    let text=card.querySelector(".card-content").textContent;
    let obj={
        "id":id,
        "color":priorityColor,
        "text":text
    };
    console.log("adding = ",obj);
    taskArr.push(obj);
    localStorage.setItem("tasks",JSON.stringify(taskArr));
}
    
function removeFromLocalStorage(card){
    let id=card.querySelector(".uid").textContent;
    let newArr=taskArr.filter(ele => ele.id!=id);
    taskArr=newArr;
    localStorage.setItem("tasks",JSON.stringify(taskArr));
}

function updateLocalStorage(card){
    let priorityColor=card.querySelector(".priority-color").classList[1];
    let id=card.querySelector(".uid").textContent;
    let text=card.querySelector(".card-content").textContent;
    for(let i=0;i<taskArr.length;++i){
        if(taskArr[i].id==id){
            taskArr[i].text=text;
            taskArr[i].color=priorityColor;
        }
    }
    localStorage.setItem("tasks",JSON.stringify(taskArr));
} 

function createLocalStorageCard(id,color,text){
    let div=document.createElement("div");
    div.setAttribute("class","card");
    
    div.innerHTML=`
    <div class="priority-color ${color}" ></div>
    <h4 class="uid">${id}</h4>
    <div class="card-content" contenteditable="true">${text}</div>`;

    let body=document.body;
    secondContainer.appendChild(div);
    console.log("card created ",div);
    div.addEventListener("click",function(e){
        if(deleteState && e.target.classList[0]!='priority-color') {
            div.remove() ;
        }
    });


    let childCard=div.querySelector(".priority-color");
    childCard.addEventListener("click",function(){
        
        let currColor=childCard.classList[1];
        
        let idx=allColors.indexOf(currColor);
        let newColorStripOnCard=allColors[(idx+1)%allColors.length];
        childCard.classList.remove(currColor);
        childCard.classList.add(newColorStripOnCard);

        updateLocalStorage(card);  //! updates local storage

    })

}