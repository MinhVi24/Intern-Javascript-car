const submit = document.getElementById("submit");
const password = document.getElementById("password");
const email = document.getElementById("email");

const togglePassword = document.querySelector('#togglePassword');
const lookPassword = document.querySelector('#fa-solid fa-eye-slash');


submit.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm()) {
        alert('Đã đăng nhập thành công');
        window.location.href = "homelogin.html";
    } else {
        return;
    }
});

function validateForm() {
    let check = [];
    let flag = true;
    check.push(checkemail(email));
    check.push(checkpassword(password));
    check.forEach(element => {
        console.log(element);
        if (element == false) {
            flag = false;
        }
    });
    return flag;
}

function checkemail(object) {
 
    let value = object.value;
    let id = object.id + "E";
    
    if (value === "intern@gmail.com") {
        document.getElementById(id).style.display = "none";
        return true;
    }
    
    document.getElementById(id).style.display = "block";
    return false;
}

function checkpassword(object) {
 
    let value = object.value;
    let id = object.id + "E";
    
    if (value === "@1helloworlD") {
        document.getElementById(id).style.display = "none";
        return true;
    }
    
    document.getElementById(id).style.display = "block";
    return false;
}



  

document.getElementById('togglePassword').addEventListener('click', function() {
    
    var toggleIcon = document.getElementById('togglePassword');
  
    if (password.type === 'password') {
      password.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      password.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  });
  