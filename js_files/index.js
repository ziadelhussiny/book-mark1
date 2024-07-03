var bookInput=document.getElementById("nameBook");
var bookURL=document.getElementById("UrlBook");
var searchInput=document.getElementById("searchBook");
var booksContainer=[];
var Index=0;
// console.log(typeof(toString(Index)))
if (localStorage.getItem("bookcont")){
    booksContainer=JSON.parse(localStorage.getItem("bookcont"))
    display();
    Index=Number(localStorage.getItem("globalIndex"));
    
}
function addBook(){
    if(bookInput.classList.contains("is-valid")&&bookURL.classList.contains("is-valid")){
        ++Index;
        var BookProduct={
            index:Index,
            name:bookInput.value,
            link:bookURL.value
    
        }
        booksContainer.push(BookProduct);
        localStorage.setItem("bookcont",JSON.stringify(booksContainer));
        localStorage.setItem("globalIndex",`${Index}`)
        
        clear();
        display()
        bookInput.classList.remove("is-valid");
        bookURL.classList.remove("is-valid");
        
    }
    else{
        Swal.fire({
            title: "Site Name or Url is not valid",
            text: "Site name must contain at least 3 characters and Site URL must be a valid one",
            icon: "error"
          });
          
    }
    
}

function clear(){
    bookInput.value=null;
    bookURL.value=null;
}
function display(){
    var items='';
    for (var i=0;i<booksContainer.length;i++){
        items+=`<tr >
        <td class="py-3 ">${booksContainer[i].index}</td>
        <td>${booksContainer[i].name}</td>
        <td><button onclick="goTo(this,${i});" class="btn1 "><i class="fa-solid fa-eye text-white me-2"></i>Visit</button></td>
        <td><button onclick="deleteBook(${i});" class="btn2 "><i class="fa-solid fa-trash text-white me-2"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById("My-rows").innerHTML=items;
}

function search(){
    if (searchInput.value==null){
        display();
    }
var items='';
    for (var i=0;i<booksContainer.length;i++){
        if (booksContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            items+=`<tr >
            <td class="py-3 ">${booksContainer[i].index}</td>
            <td>${booksContainer[i].name}</td>
            <td><button onclick="goTo(this,${i});" class="btn1 "><i class="fa-solid fa-eye text-white me-2"></i>Visit</button></td>
            <td><button onclick="deleteBook(${i});" class="btn2 "><i class="fa-solid fa-trash text-white me-2"></i>Delete</button></td>
        </tr>`
        }
    }
    document.getElementById("My-rows").innerHTML=items;

}



function deleteBook(ind){


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            booksContainer.splice(ind,1);
            for (i=ind;i<booksContainer.length;i++){
                booksContainer[i].index-=1;
            }
        
        
            localStorage.setItem("bookcont",JSON.stringify(booksContainer));
            display()
            Index--;
            localStorage.setItem("globalIndex",`${Index}`)

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });








   
}
function goTo(allInput,i){
    
allInput.value=booksContainer[i].link;
window.open(allInput.value)
}

function validation(allinput){
    var validateCollection={
        nameBook:/^[A-za-z ]{4,18}$/,
        UrlBook:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    if (validateCollection[allinput.id].test(allinput.value)){
        document.getElementById(`${allinput.id}`).classList.add("is-valid")
        document.getElementById(`${allinput.id}`).classList.remove("is-invalid")
    }
    else{
        document.getElementById(`${allinput.id}`).classList.remove("is-valid")
        document.getElementById(`${allinput.id}`).classList.add("is-invalid")
    }
}