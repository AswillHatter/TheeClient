/*
function reqwest(){
    var Rez;

    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://test.site/Test/branch/', true);
    xhr.responseType = 'json';

    console.log("xhr created");
    xhr.send();

    xhr.onload = function() {
        Rez = xhr.response;

        console.log(Rez);
        return Rez;
    }

}
 */

let lastClickedId;

function reqwest(){
     return new Promise(resolve => {
             let Rez;
             let xhr = new XMLHttpRequest();
             xhr.open('GET', 'http://test.site/Test/branch/', true);
             xhr.responseType = 'json';

             console.log("xhr created");
             xhr.send();

             xhr.onload = function () {
                 Rez = xhr.response;
                 console.log("1Rez = ", Rez);
                 resolve(Rez);
             }
     });
}

async function f1(globalDiv) {
    let rez;
    rez = await reqwest();
    try {
        console.log("rez = ", rez);
        for (let i in rez) {
            let elemMarg = rez[i]['level'] * 25;
            let div = document.createElement("div");
            div.id = rez[i]['id'];
            div.className = "Contant";
            div.ondblclick = "updateBranch(" + div.id + ")";
            div.style.marginLeft = elemMarg + "px";
            div.innerHTML =  rez[i]['name'] + "   <button onclick='remBranch(this.parentNode.id)'> - </button>  <button onclick='addBranch(this.parentNode.id)'> + </button>";
            globalDiv.appendChild(div);
        }
    }
    catch (e)
     {
        let div = document.createElement("div");
        div.innerHTML = "<button onclick='addBranch(0)'> Create Root </button>";
    }
}

function remBranch(thisid){
    this.lastClickedId = thisid;
    location.href = '#openModal2';
    console.log("remBranch ",thisid)
    let elem = document.getElementById(thisid);


}

function delNodeQ(){
    console.log("im in delete method ");
    let thisId = this.lastClickedId;
    let xhr = new XMLHttpRequest();
    let url = "http://test.site/Test/branch/" + thisId;
    console.log("url", url);

    xhr.open('DELETE', url, true);
    try{
        xhr.send();
    }
    catch (e){
        console.log("ErrorCode = ", e);
    }

    xhr.onload = function () {
        let Rez = xhr.response;
        console.log("NewNodeQRez = ", Rez);
    }
}

function updateBranch(thisid){
    this.lastClickedId = thisid;
    location.href = '#openModal3';
}

function renameNodeQ(){

}


function addBranch(thisid){
    this.lastClickedId = thisid;
    location.href = '#openModal1';
}

function newNodeQ(){
    let parentId = lastClickedId;
    let textData = document.getElementById('newNodeName').value;
    let formData = new FormData();

    formData.append("name", textData);
    formData.append("parent_id", parentId);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://test.site/Test/branch/', true);
    xhr.send(formData);

    xhr.onload = function () {
        let Rez = xhr.response;
        console.log("NewNodeQRez = ", Rez);
        //resolve(Rez);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const globalDiv = document.querySelector('.globalDiv');
    console.log("in EventListener");
    console.log("its globalDiv", globalDiv);
    f1(globalDiv);
});