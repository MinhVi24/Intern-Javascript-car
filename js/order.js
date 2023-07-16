
// Khai báo biến và các phần tử DOM cần sử dụng
let record = [];
let form = document.forms;
let form1 = form[0];
let form2 = form[1];
console.log(form2);
let self = form2.self;
let hire = form2.hire;
let saveBtn = form2.saveBtn;
let result = document.getElementById("result")
let searchCar = document.getElementById("searchCar");
let carTable = document.getElementById("carTable")
let code;


$("#traThem").hide();
$("#updateBtn").hide();
// Danh sách xe
var xe = [
	{ carID: 83712, rowID: 8293718, carName: "Kia Morning", carType: 4, carPrice: 500000, carStatus: 1, carImage: "image/1.jpg" },
	{ carID: 837121, rowID: 82937184, carName: "Huyndai I10", carType: 4, carPrice: 700000, carStatus: 1, carImage: "image/2.jpg" },
	{ carID: 837122, rowID: 82937182, carName: "Kia K3", carType: 4, carPrice: 900000, carStatus: 1, carImage: "image/3.jpg" },
	{ carID: 837123, rowID: 82937181, carName: "Kia Rondo", carType: 4, carPrice: 900000, carStatus: 1, carImage: "image/4.jpg" },
	{ carID: 837124, rowID: 82937183, carName: "Toyota Fortuner", carType: 7, carPrice: 1100000, carStatus: 2, carImage: "image/5.jpg" },
	{ carID: 837125, rowID: 82937186, carName: "Kia Sportage", carType: 7, carPrice: 1500000, carStatus: 2, carImage: "image/6.jpg" },
	{ carID: 8371263, rowID: 829371876, carName: "Chevroler Camaro", carType: 7, carPrice: 1500000, carStatus: 2, carImage: "image/7.jpg" },
	{ carID: 8371264, rowID: 829371877, carName: "Chevroler Captiva", carType: 4, carPrice: 1500000, carStatus: 2, carImage: "image/8.jpg" },
	{ carID: 8371265, rowID: 829371878, carName: "Chevroler Spark", carType: 7, carPrice: 1500000, carStatus: 1, carImage: "image/9.jpg" },
]
// Event khi chọn tự lái
self.addEventListener("change", function (event) {
	if (this.checked == true) {
		hire.checked = false;
		$("#traThem").hide();
	} else {
		$("#traThem").hide();
	}
});

// Event khi chọn thuê tài xế
hire.addEventListener("change", function (event) {
	if (this.checked == true) {
		self.checked = false;
		$("#traThem").show();
	} else {
		$("#traThem").hide();
	}
});
// Event khi click đăng ký
saveBtn.addEventListener("click", function (event) {
	event.preventDefault();
	event.stopPropagation()
	if (!validateForm()) {
		return;
	};
	let name = form2.fullName.value;
	let cName = form2.carName.value;
	let cType = form2.carType1.value;
	let cPrice = form2.carPrice.value;
	let address = form2.address.value;
	let hDate = new Date(form2.rentDate.value);
	let rDate = new Date(form2.returnDate.value);
	let phone = form2.phone.value;
	let self = form2.self;
	let hire = form2.hire;
	let diffTime = rDate.getTime() - hDate.getTime()
	let diffDays = parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
	let money = 0;
	let status
	if (self.checked == true) {
		money += diffDays * parseInt(cPrice);
		status = "Tự lái";
	} else if (hire.checked == true) {
		status = "Có thuê tài xê";
		if (cType == "4 chỗ") {
			money += diffDays * parseInt(cPrice) + diffDays * 500000
		} else if (cType == "7 chỗ") {
			money += diffDays * parseInt(cPrice) + diffDays * 500000
		} else {
			console.log("loi");
		}
	}
	let x = {
		fullName: name,
		phone: phone,
		carName: cName,
		carType: cType,
		carPrice: cPrice,
		rentDate: form2.rentDate.value,
		returnDate: form2.returnDate.value,
		day: diffDays,
		status: status,
		total: money
	}
	record.push(x);
	displayAll(record)
	xe.forEach(car => {
		if (car.carID == code) {
			car.status = 2;
			let cartd = document.getElementsByClassName(code);
			console.log(car.carID);
			cartd[0].innerHTML = "<td class=\"" + car.carID + "\">Đang được thuê</td>"
			cartd[1].outerHTML = "<td class=\"" + car.carID + "\"><i id=\"" + car.rowID + "\"class=\"fa-solid fa-circle-info\"></i></td>"
		}

	})
	resetForm();
})

function displayArr(arr) {
	carTable.innerHTML = "";
	for (let i = 0; i < arr.length; i++) {
		carTable.innerHTML += appendRow(arr[i], i)
	}

	addEvent1(arr);
}

function displayAll(arr) {
	result.innerHTML = "";
	for (let i = 0; i < arr.length; i++) {
		result.innerHTML += appendRent(arr[i], i);
	}
}
// Kiểm tra và validate form
searchCar.addEventListener("click", function (event) {
	event.preventDefault();
	let carType = $("#carType").val()
	let carStatus = $("#carStatus").val()
	console.log(carType);
	console.log(carStatus);
	let table = [];
	if (carType == 0) {
		if (carStatus == 0) {
			displayArr(xe)
		} else {
			table = xe.filter(checkCarStatus);
			displayArr(table);
		}
	} else if (carStatus == 0 && carType != 0) {
		table = xe.filter(checkCarType);
		displayArr(table);
	} else {
		table = xe.filter(checkCarType);
		table = table.filter(checkCarStatus);
		displayArr(table);
	}

})
// Kiểm tra loại xe
function checkCarType(car) {
	return car.carType == $("#carType").val();
}
// Kiểm tra trạng thái xe
function checkCarStatus(car) {
	return car.carStatus == $("#carStatus").val();
}
// hiển thị list
function appendRent(object, number) {
	let html = "<tr><td>" + (number + 1) + "</td>"
		+ "<td>" + object.fullName + "</td>"
		+ "<td>" + object.phone + "</td>"
		+ "<td>" + object.carName + "</td>"
		+ "<td>" + object.carType + "</td>"
		+ "<td>" + object.carPrice + " VND </td>"
		+ "<td>" + object.rentDate + "</td>"
		+ "<td>" + object.returnDate + "</td>"
		+ "<td>" + object.day + "</td>"
		+ "<td>" + object.status + "</td>"
		+ "<td>" + object.total + "</td>"
		+ "<td><button class=\"editBtn btn btn-outline-warning far fa-edit\" data-index=\"" + number + "\"></button><button class=\"deleteBtn btn btn-outline-danger far fa-trash-alt\" data-index=\"" + number + "\"></button></td>";

	html += "<tr>";
	return html;
}
// Thêm một hàng vào bảng xe
function appendRow(object, number) {
	let html = "<tr><td>" + number + "</td>"
		+ "<td>" + "<img src=\"" + object.carImage + "\"</td>"
		+ "<td>" + object.carName + "</td>"
		+ "<td>" + object.carType + "</td>"
		+ "<td>" + object.carPrice + " VNĐ </td>"
	if (object.carStatus == 1) {
		html += "<td class=\"" + object.carID + "\">Có sẵn</td>"
		html += "<td class=\"" + object.carID + "\"><i id=\"" + object.rowID + "\" class=\"fa-solid fa-pen-to-square\"></i></td>"
	}
	if (object.carStatus == 2) {
		html += "<td class=\"" + object.carID + "\">Đang được thuê</td>"
		html += "<td class=\"" + object.carID + "\"><i id=\"" + object.rowID + "\" class=\"fa-solid fa-circle-info\"></i></td>"
	}
	html += "<tr>";
	return html;
}


function addEvent1(arr) {
	for (let i = 0; i < arr.length; i++) {
		let idButton = arr[i].rowID
		let status = arr[i].carStatus
		let carName = form2.carName
		let carType = form2.carType1
		let carPrice = form2.carPrice
		if (status == 1) {
			$("#" + idButton).click(function (event) {
				event.preventDefault();
				event.stopPropagation()
				carName.value = arr[i].carName
				carType.value = arr[i].carType + " chỗ"
				carPrice.value = arr[i].carPrice
				code = arr[i].carID;
			})
		} else if (status == 2) {
			$("#" + idButton).click(function (event) {
				event.preventDefault();
				event.stopPropagation()
				alert("Hãng xe :" + arr[i].carName + ", Loại xe: " + arr[i].carType + ", Giá xe/Ngày: " + arr[i].carPrice)
			})
		}
	}
}

// Kiểm tra và validate form
function validateForm() {
	let check = [];
	let flag = true;
	let carName = form2.carName;

	let carType = form2.carType1;
	let carPrice = form2.carPrice;
	let fullNames = form2.fullName;
	let address = form2.address;
	let phonenumber = form2.phone;
	let rentDate = form2.rentDate;
	let returnDate = form2.returnDate;
	let hDate = new Date(form2.rentDate.value);
	let rDate = new Date(form2.returnDate.value);
	let diffTime = rDate.getTime() - hDate.getTime()
	let diffDays = parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
	let diff = true
	if (diffDays <= 1) {
		alert("ngày trả xe phải lớn hơn ngày nhận xe 2 ngày");
		diff = false
	}
	check.push(diff);
	check.push(checkObject(carName))
	check.push(checkObject(carType))
	check.push(checkObject(carPrice))
	check.push(checkPrice(carPrice));
	check.push(checkString(fullNames));
	check.push(checkPhone(phonenumber));
	check.push(checkString(address));
	check.push(checkDate(rentDate));
	check.push(checkDate(returnDate));
	check.forEach(element => {
		if (element == false) {
			flag = false;
		}
	})
	return flag;
}

// khi nhấm submit thì sẽ reset
function resetForm() {
	fullName.value = "";
	carName.value = "";

	carType1.value = "";
	carPrice.value = "";
	address.value = "";
	rentDate.value = "";
	returnDate.value = "";
	phone.value = "";
	self.checked = true;
	hire.checked = false;
	$("#traThem").hide();
}
// hàm check date
function checkDate(object) {
	let id = object.id + "E";
	if (object.value == "") {
		$("#" + id).attr("style", "display:block");
		return false;
	}
	let date = Date.parse(object.value);
	let today = Date.now();
	if (date < today) {
		$("#" + id).attr("style", "display:block");
		return false;
	}
	$("#" + id).attr("style", "display:none");
	return true;
}


function checkString(object) {
	let regex = /^[a-zA-Z0-9\s\u00C0-\u017F]+$/;
	let value = object.value;
	let id = object.id + "E";
	
	if (regex.test(value) && value != "") {
	  $("#" + id).attr("style", "display:none");
	  return true;
	}
	
	$("#" + id).attr("style", "display:block");
	return false;
  }


function checkPrice(object) {
	regex = /^[0-9]+$/
	let value = object.value;
	let id = object.id + "E";
	if (regex.test(value) && value != 0) {
		$("#" + id).attr("style", "display:none");
		return true;
	}
	$("#" + id).attr("style", "display:block");
	return false;
}
// hàm check số điện thoại
function checkPhone(object) {
	regex = /^[0-9]{9}$/
	let value = object.value;
	let id = object.id + "E";
	if (regex.test(value)) {
		$("#" + id).attr("style", "display:none");
		return true;
	}
	$("#" + id).attr("style", "display:block");
	return false;
}
//ham check ssoois tượng
function checkObject(object) {
	let value = object.value;
	let id = object.id + "E";
	if (value == "") {
		$("#" + id).attr("style", "display:block");
		return false;
	}
	$("#" + id).attr("style", "display:none");
	return true;
}

//edit
$(document).on("click", ".editBtn", function (event) {
	event.preventDefault();
	event.stopPropagation();
	document.getElementById("address").disabled = true;

	let index = $(this).data("index");
	if (index !== undefined) {
		let data = record[index];

		form2.fullName.value = data.fullName;
		form2.phone.value = data.phone;
		form2.carName.value = data.carName;
		form2.carType1.value = data.carType;
		form2.carPrice.value = data.carPrice;
		form2.rentDate.value = data.rentDate;
		form2.returnDate.value = data.returnDate;

		if (data.status === "Tự lái") {
			form2.self.checked = true;
			form2.hire.checked = false;
			$("#traThem").hide();
			
		} else if (data.status === "Có thuê tài xế") {
			form2.self.checked = false;
			form2.hire.checked = true;
			$("#traThem").show();
			
		}

		$("#updateBtn").show().data("index", index);
		$("#saveBtn").hide();
	}
});




// Event khi click update
$("#updateBtn").on("click", function (event) {
	event.preventDefault();
	event.stopPropagation();
	let index = $(this).data("index");
	if (index !== undefined) {
		let name = form2.fullName.value;
		let cName = form2.carName.value;
		let cType = form2.carType1.value;
		let cPrice = form2.carPrice.value;
		let hDate = new Date(form2.rentDate.value);
		let rDate = new Date(form2.returnDate.value);
		let phone = form2.phone.value;
		let self = form2.self;
		let hire = form2.hire;
		let diffTime = rDate.getTime() - hDate.getTime();
		let diffDays = parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
		let money = 0;
		let status;
		if (self.checked == true) {
			money += diffDays * parseInt(cPrice);
			status = "Tự lái";
		} else if (hire.checked == true) {
			status = "Có thuê tài xế";
			if (cType == "4 chỗ") {
				money += diffDays * (parseInt(cPrice) + 500000);
			} else if (cType == "7 chỗ") {
				money += diffDays * (parseInt(cPrice) + 550000);
			} else {
				console.log("loi");
			}
		}
		record[index].fullName = name;
		record[index].carName = cName;
		record[index].carType = cType;
		record[index].carPrice = cPrice;
		record[index].phone = phone;
		record[index].rentDate = form2.rentDate.value;
		record[index].returnDate = form2.returnDate.value;
		record[index].day = diffDays;
		record[index].status = status;
		record[index].total = money;
		displayAll(record);
		resetForm();
		$("#updateBtn").hide();
		$("#saveBtn").show();


		document.getElementById("address").disabled = false;
	}

});





// Event khi click delete
$(document).on("click", ".deleteBtn", function (event) {
	event.preventDefault();
	event.stopPropagation();
	let index = $(this).data("index");
	if (index !== undefined) {
		let customerName = record[index].fullName;
		let confirmation = confirm("Bạn có chắc muốn xóa khách hàng: " + customerName + "?");
		if (confirmation) {
			record.splice(index, 1);
			displayAll(record);
		}
	}
});



function confirmLogout() {
	var confirmation = confirm("Bạn có chắc muốn logout?");
	return confirmation;
  }