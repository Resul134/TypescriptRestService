import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"; // Don't worry



interface ICoins { //Erstat med hvad der er relevant, og ændrer properties
    // attributes from http://jsonplaceholder.typicode.com/posts
    id : number;
    genstand : string;
    bud : number;
    navn : string;
}








//GetAll
 let getAllButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
 getAllButton.addEventListener("click", getAllCoins)

 let resetButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("resetButton");
resetButton.addEventListener("click", resetGetAll)

 let getAllOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("getAll");

 let url : string = "http://cars-rest.azurewebsites.net/api/Coins";

//FilterBud

let searchBid : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getSpecificCoin");
searchBid.addEventListener("click", budRange)

//FilterName
let searchnameButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("søgNavnButton");
searchnameButton.addEventListener("click", searchbyName)

//GetOne
let inputGetone : HTMLInputElement = <HTMLInputElement>document.getElementById("getoneInput");
let getoneButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getoneButton");
getoneButton.addEventListener("click" , getOneCoin);
let getoneOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("getOne");


//Post
let postButton : HTMLButtonElement = <HTMLInputElement>document.getElementById("addButton");
postButton.addEventListener("click", addCoin)


//Put
let updateButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("updateButton");
updateButton.addEventListener("click", updateBid);

//Delete
let deleteButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteCoin)


function getAllCoins(): void{
    axios.get<ICoins[]>(url)
    .then((response: AxiosResponse<ICoins[]>) => {
        let data: ICoins[] = response.data;
        let longHtml: string = "<ol>";
        getAllOutput.innerHTML = JSON.stringify(data);
        
        data.forEach( (coins : ICoins) => {
            console.log(coins.id, coins.genstand, coins.bud, coins.navn)
            longHtml += "<li>" + "Id: "+ coins.id + " - " +  "Genstand: "+ coins.genstand + " - " + "Bud: " + coins.bud + " - " + "Navn: " + coins.navn +
            "</li>"; 
        });
        longHtml += "</ol>";
        getAllOutput.innerHTML = longHtml;
    })
    .catch((error: AxiosError) => {
        console.log(error);
        getAllOutput.innerHTML = error.message;
    });
}

function resetGetAll(): void{

    getAllOutput.innerHTML = " ";
}


function getOneCoin() : void {
    let id = inputGetone.value;
   
       if (id.length > 0)
       {
           axios.get<ICoins>(url + "/" + id)
               .then((response: AxiosResponse<ICoins>) =>{
               let dataOne : ICoins = response.data;
               let longHtml2: string = "<ol>";
   
               console.log(dataOne);
   
               getoneOutput.innerHTML = JSON.stringify(dataOne);
   
           
               console.log(dataOne.id, dataOne.genstand, dataOne.bud, dataOne.navn);
               
               longHtml2 += "<li>" + "Id: " + dataOne.id + " - "+ " Genstand: " + dataOne.genstand + " - " +" Bud: " +  dataOne.bud + " - "+ "Navn: " + dataOne.navn + "</li>";
               
          
               longHtml2 += "</ol>";
               getoneOutput.innerHTML = longHtml2; 
           });
       }      
       getoneOutput.innerHTML = "Type something dude";
       
   }


function addCoin(): void{

    let idinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addID");
    let genstandinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addGenstand");
    let budinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addBud");
    let navninputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addNavn");
    let addoutputElement : HTMLDivElement = <HTMLDivElement>document.getElementById("postOutput");


    let myID = Number(idinputElement.value);
    let myGenstand = genstandinputElement.value;
    let myBud = Number(budinputElement.value);
    let myNavn = navninputElement.value;


    axios.post<ICoins[]>(url, {Id : myID, Genstand: myGenstand, Bud : myBud, Navn : myNavn})
        .then((response : AxiosResponse<ICoins[]>) => {
            let message =  "<h6 id='responseMessage'>" + response.status + " " + response.statusText + "</h6>"; 
            
        addoutputElement.innerHTML = message;
        console.log(message);
    })

    .catch(function (error) {
    addoutputElement.innerHTML = error.message;
    console.log(error);

    });

}


function deleteCoin(): void{

    let inputId : HTMLInputElement = <HTMLInputElement>document.getElementById("deleteID");
    
    let id : string = inputId.value;
    
    let output : HTMLDivElement = <HTMLDivElement>document.getElementById("deletedCoinOutput");
    
    
    let urlDelete = url + "/" + id;
    if(id.length > 0)
    {
        axios.delete<ICoins>(urlDelete)
        .then(function (response: AxiosResponse<ICoins>): void {
            
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
        if (error.response) {
                
            output.innerHTML = error.message;
        } else { // something went wrong in the .then block?
            output.innerHTML = error.message;
        }
        });
    
    }
    output.innerHTML = "The field needs an ID";
}


function budRange(): void{

    let filterElementoutput : HTMLDivElement = <HTMLDivElement>document.getElementById("filterOutput");
    let inputFirstRange : HTMLInputElement = <HTMLInputElement>document.getElementById("MinBud");
    let inputSecondRange : HTMLInputElement = <HTMLInputElement>document.getElementById("MaxBud");

    let myMinYear = inputFirstRange.value;
    let myMaxYear = inputSecondRange.value;
    let urlFilterYear : string = url + "/" + "search?MinBud=" + myMinYear + "&&MaxBud=" + myMaxYear; 

    
    axios.get<ICoins[]>(urlFilterYear)
    .then((response: AxiosResponse<ICoins[]>) => {
        let data: ICoins[] = response.data;
        let longHtml3: string = "<ol>";
        filterElementoutput.innerHTML = JSON.stringify(data);
        data.forEach(filterCoin => {
            console.log(filterCoin.id, filterCoin.genstand, filterCoin.bud, filterCoin.navn);
            longHtml3 += "<li>" + "Auction ID: "+ filterCoin.id + " - " +  "Genstand: "+ filterCoin.genstand + " - " + "Bud: " + filterCoin.bud + " - " + "Navn: " + filterCoin.navn
            "</li>"; 
        })
        longHtml3 += "</ol>";
        filterElementoutput.innerHTML = longHtml3;

    })
    .catch((error: AxiosError) => {
        console.log(error);
        filterElementoutput.innerHTML = error.message;
    });
        

}


function searchbyName(): void{

    let inputName : HTMLInputElement = <HTMLInputElement>document.getElementById("nameSearch");

    let MyName = inputName.value;

    let outputName : HTMLDivElement = <HTMLDivElement>document.getElementById("filterName");

    let urlfilterName : string = url + "/" + "Name" + "/" + MyName;
    
    
    if (MyName.length > 0)
       {
        axios.get<ICoins[]>(urlfilterName)
        .then((response: AxiosResponse<ICoins[]>) => {
            let data: ICoins[] = response.data;
            let longHtml3: string = "<ol>";
            outputName.innerHTML = JSON.stringify(data);
            data.forEach(name => {
                console.log(name.id, name.genstand, name.bud, name.navn);
                longHtml3 += "<li>" + "Auction ID: "+ name.id + " - " +  "Genstand: "+ name.genstand + " - " + "Bud: " + name.bud + " - " + "Navn: " + name.navn
                "</li>"; 
            })
            longHtml3 += "</ol>";
            outputName.innerHTML = longHtml3;
    
        })
        .catch((error: AxiosError) => {
            console.log(error);
            outputName.innerHTML = error.message;
        });
            
    
    }
}



function updateBid(): void{

    let updateBud : HTMLInputElement = <HTMLInputElement>document.getElementById("updateBud");
    let updateNavn : HTMLInputElement = <HTMLInputElement>document.getElementById("updateNavn");
    let id : HTMLInputElement = <HTMLInputElement>document.getElementById("IDtoUpdate");
    let updatedOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("updateOutput");


    let chooseID = id.value;

    let updatedBud = updateBud.value;
    let updatedNavn = updateNavn.value;

    axios.put<ICoins[]>(url + "/" + chooseID,{Bud : updatedBud, Navn: updatedNavn} )
    .then((response : AxiosResponse<ICoins[]>) => {
        let message = "response" + response.status + " " + response.statusText;
    updatedOutput.innerHTML = message;
    console.log(message);
})

.catch(function (error) {
updatedOutput.innerHTML = error.message;
console.log(error);




});

}