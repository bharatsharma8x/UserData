//register script start 
document.getElementById("register")?.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cPassword = document.getElementById("cPassword").value;

    let emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
    let passReg  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/ ;

    if(passReg.test(password)){
        document.getElementById("passwordv").innerHTML = "";
    }
    else{
        document.getElementById("passwordv").innerHTML = "***Length should be 8-15 include atleast one small ,capital and special character";
        return false;        
    }
    
    if(emailReg.test(email)){
        document.getElementById("emailv").innerHTML = "";
    }
    else{
        document.getElementById("emailv").innerHTML = "*** Please enter valid email";
        return false;        
    }

    if(password==cPassword){
        document.getElementById("cPasswordv").innerHTML = "";
    }
    else{
        document.getElementById("cPasswordv").innerHTML = "*** Doesn't match with password.";
        return false;        
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    window.location.href = "login.html";
})
//register script end 


//login script start 
document.getElementById("login")?.addEventListener('submit',(e)=>{

    e.preventDefault();
    let remail = localStorage.getItem("email");
    let rpassword = localStorage.getItem("password");

    let pass = document.getElementById("password").value;
    let em = document.getElementById("email").value;

    if(remail == em && rpassword == pass ){
        // alert("Login successfully...");
        window.location.href = "Dashboard.html";
    }
    else(
        alert("Wrong details !")
    )
})
//login script end 


//Dasboard script Start
let UserData;
let currentPage = 1;
let userPerPage ;
let indexOfFirstUser;
let indexOfLastUser;
let currentUsers;
let pageNumber = [];

//fetch Data
async function fetchUser() {
  UserData = await fetch("https://dummyjson.com/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.users;
    });
}

//print all data
  async function fetchData(){
  await fetchUser();
  await paginating();
  console.log("printing all data " + UserData);
  print(currentUsers);
  pageNumbers(pageNumber);
}

//pagintion functioning
function paginating(){
  console.log("paginating");
 userPerPage = 5   ;

 indexOfLastUser = currentPage * userPerPage;
 indexOfFirstUser = indexOfLastUser - userPerPage;
 currentUsers = UserData.slice(indexOfFirstUser,indexOfLastUser);

 for(let i = 1 ; i<=Math.ceil(UserData.length/ userPerPage ); i++){
  pageNumber.push(i);
 } 
}

//paginate
function paginate(num){
  console.log("paginate");
  currentPage = num
  paginating();
  print(currentUsers)  
}

//printing number of pagination
function pageNumbers(pageNumber){
  document.getElementById("pageNum").innerHTML =`<ul>
  ${pageNumber.map((num)=>`
  <li>
  <button class="Dashcss" onclick="paginate(${num})">${num}</button>
  </li>
  `).join("")}`
}

//print data on search username
document.getElementById("fetchUserBySearch").addEventListener("click", async () => {
    await fetchUser();
    let searchbar = await document.getElementById("searchUser").value.trim();
    let dataName = await UserData.filter(
      (user) => user.username == searchbar
    ).map((user) => {
      return user;
    });
    console.log("printing searched data " + dataName);
    print(dataName);
  });

//print expected Data
function print(data) {
  document.getElementById("containerr").innerHTML = `<table id="userTable">
  <tr>
  <th>ID <i id="sID" class="fa fa-arrow-up"></i></th>
  <th>Name <i id="sName" class="fa fa-arrow-up" aria-hidden="true"></i></th>
  <th>age <i id="sAge" class="fa fa-arrow-up"></i></th>
  <th>Email <i id="sEmail" class="fa fa-arrow-up"></i></th>
  <th>Username <i id="sUsername" class="fa fa-arrow-up"></i></th>
  <th>Password <i id="sPassword" class="fa fa-arrow-up"></i></th>
  <th>DOB <i id="sDOB" class="fa fa-arrow-up"></i></th>
  <th>Address <i id="sAddress" class="fa fa-arrow-up"></i></th>
  </tr>
  ${data.map(
    (UserData) =>`
    <tr>
    <td >${UserData.id}  </td>
    <td>${UserData.firstName} </td>
    <td>${UserData.age}</td>
    <td>${UserData.email}</td>
    <td>${UserData.username}</td>
    <td>${UserData.password}</td>
    <td>${UserData.birthDate}</td>
    <td>${UserData.address.city}</td>
    </tr>
    `
    ).join("")}
    </table>`;

document.getElementById("sID")?.addEventListener("click", async () => {
      await fetchUser();
      let sortData =  UserData.sort((a, b) => {
        let x = a.id;
        let y = b.id;
        if (x < y) {
          return -1;
        }
        return 0;;
      });
      print(sortData);
      myfunction=(icon)=>icon.classList.toggle('fa-arrow-down');
});

document.getElementById("sName")?.addEventListener("click", async () => {
  await fetchUser();
  let sortData =  UserData.sort((a, b) => {
    let x = a.firstName.toUpperCase();
    let y = b.firstName.toUpperCase();
    if (x < y) {
      return -1;
  }
  return 0;
});
print(sortData);
});

document.getElementById("sAge")?.addEventListener("click", async () => {
    await fetchUser();
    let sortData =  UserData.sort((a, b) => {
      let x = a.age;
      let y = b.age;
      if (x < y) {
        return -1;
      }
      return 0;;
    });
    print(sortData);
  });

  document.getElementById("sEmail")?.addEventListener("click", async () => {
    await fetchUser();
    let sortData =  UserData.sort((a, b) => {
      let x = a.email.toUpperCase();
      let y = b.email.toUpperCase();
      if (x < y) {
        return -1;
    }
    return 0;
  });
  print(sortData);
});

  document.getElementById("sUsername")?.addEventListener("click", async () => {
    await fetchUser();
    let sortData =  UserData.sort((a, b) => {
      let x = a.username.toUpperCase();
      let y = b.username.toUpperCase();
      if (x < y) {
        return -1;
    }
    return 0;
  });
  print(sortData);
});

document.getElementById("sPassword")?.addEventListener("click", async () => {
  await fetchUser();
  let sortData =  UserData.sort((a, b) => {
    let x = a.password.toUpperCase();
    let y = b.password.toUpperCase();
    if (x < y) {
      return -1;
  }
  return 0;
});
print(sortData);
});

document.getElementById("sDOB")?.addEventListener("click", async () => {
  await fetchUser();
  let sortData =  UserData.sort((a, b) => {
    let x = a.birthDate;
    let y = b.birthDate;
    if (x < y) {
      return -1;
    }
    return 0;;
  });
  print(sortData);
});

document.getElementById("sAddress")?.addEventListener("click", async () => {
  await fetchUser();
  let sortData =  UserData.sort((a, b) => {
    let x = a.address.city.toUpperCase();
    let y = b.address.city.toUpperCase();
    if (x < y) {
      return -1;
  }
  return 0;
});

print(sortData);
});
}
//print expected Data end
 
//Dasboard script End
