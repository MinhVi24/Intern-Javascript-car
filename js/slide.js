

// Lấy tất cả các phần tử slide và nút điều khiển từ DOM
var slide = document.querySelectorAll(".anh ul li");
var nut = document.querySelectorAll(".list-nut li");
var nutPhai1 = document.querySelector(".next");
var nutTrai1 = document.querySelector(".pre");

// Các biến trạng thái và chỉ số hiện tại
var chiSoHienTai = 0;
var soLuongSlice = slide.length - 1;
var trangThai = "dangDungYen";

//click cho nút "Next" và "Previous"
nutPhai1.addEventListener("click", nutPhai);
nutTrai1.addEventListener("click", nutTrai);



// Hàm xử lý khi click vào nút "Next"
function nutPhai() {
  // Kiểm tra trạng thái đang chuyển động
  if (trangThai == "dangChuyenDong") {
    return false;
  }
  trangThai = "dangChuyenDong";
  var trangThai2ChuyenDong = 0;

  // Lấy phần tử hiện tại và nút điều khiển hiện tại
  var ptHienTai = slide[chiSoHienTai];
  var nutHienTai = nut[chiSoHienTai];

  // Tăng chỉ số hiện tại để chuyển đến phần tử tiếp theo
  if (chiSoHienTai < soLuongSlice) {
    chiSoHienTai++;
  } else {
    chiSoHienTai = 0;
  }

  // Lấy phần tử tiếp theo và nút điều khiển tương ứng
  var pTTiepTheo = slide[chiSoHienTai];
  var nutTiepTheo = nut[chiSoHienTai];

  // Thêm/loại bỏ các lớp CSS để thực hiện hiệu ứng chuyển động
  ptHienTai.classList.add("bienMatKhiAnNext");
  pTTiepTheo.classList.add("diVaoKhiAnNext");
  nutTiepTheo.classList.add("nut-do");
  nutHienTai.classList.remove("nut-do");

  // Hàm xử lý khi hiệu ứng chuyển động kết thúc cho phần tử hiện tại
  var chuyenDongHienTai = function () {
    ptHienTai.classList.remove("bienMatKhiAnNext");
    ptHienTai.classList.remove("diVaoKhiAnNext");
    ptHienTai.classList.remove("active");

    trangThai2ChuyenDong++;
    if (trangThai2ChuyenDong == 2) {
      trangThai = "dangDungYen";
    }
  };

  // Hàm xử lý khi hiệu ứng chuyển động kết thúc cho phần tử tiếp theo
  var chuyenDongTiepTheo = function () {
    pTTiepTheo.classList.remove("diVaoKhiAnNext");
    pTTiepTheo.classList.add("active");
    trangThai2ChuyenDong++;
    if (trangThai2ChuyenDong == 2) {
      trangThai = "dangDungYen";
    }
  };

  // Lắng nghe sự kiện kết thúc hiệu ứng chuyển động
  ptHienTai.addEventListener("webkitAnimationEnd", chuyenDongHienTai);
  pTTiepTheo.addEventListener("webkitAnimationEnd", chuyenDongTiepTheo);

  // Gọi hàm để thực hiện thay đổi màu chữ
  mauchu(chiSoHienTai);
}

// Tự động chuyển slide sang phải sau mỗi 5 giây
setInterval(nutPhai, 5000);

// Hàm xử lý khi click vào nút "Previous"
function nutTrai() {
  // Kiểm tra trạng thái đang chuyển động
  if (trangThai == "dangChuyenDong") {
    return false;
  }
  trangThai = "dangChuyenDong";
  var trangThai2ChuyenDong = 0;

  // Lấy phần tử hiện tại và nút điều khiển hiện tại
  var ptHienTaiLeft = slide[chiSoHienTai];
  var nutHienTai = nut[chiSoHienTai];

  // Giảm chỉ số hiện tại để chuyển đến phần tử trước đó
  if (chiSoHienTai > 0) {
    chiSoHienTai--;
  } else {
    chiSoHienTai = soLuongSlice;
  }

  // Lấy phần tử trước đó và nút điều khiển tương ứng
  var pTTiepTheoLeft = slide[chiSoHienTai];
  var nutTiepTheo = nut[chiSoHienTai];

  // Thêm/loại bỏ các lớp CSS để thực hiện hiệu ứng chuyển động
  nutTiepTheo.classList.add("nut-do");
  nutHienTai.classList.remove("nut-do");
  ptHienTaiLeft.addEventListener("webkitAnimationEnd", function () {
    this.classList.remove("active");
    this.classList.remove("bienMatKhiAnNext");

    trangThai2ChuyenDong++;
    if (trangThai2ChuyenDong == 2) {
      trangThai = "dangDungYen";
    }
  });

  pTTiepTheoLeft.addEventListener("webkitAnimationEnd", function () {
    pTTiepTheoLeft.classList.remove("diVaoKhiAnNext");
    pTTiepTheoLeft.classList.add("active");

    trangThai2ChuyenDong++;
    if (trangThai2ChuyenDong == 2) {
      trangThai = "dangDungYen";
    }
  });

  // Thêm/loại bỏ các lớp CSS để thực hiện hiệu ứng chuyển động
  pTTiepTheoLeft.classList.add("active");
  pTTiepTheoLeft.classList.add("diVaoKhiAnNext");
  ptHienTaiLeft.classList.add("bienMatKhiAnNext");

  // Gọi hàm để thực hiện thay đổi màu chữ
  mauchu(chiSoHienTai);
}

// Hàm thay đổi màu chữ dựa trên chỉ số slide
function mauchu(index) {
  var tieude = document.querySelector(".tieu-de");
  if (index == 2) {
    tieude.classList.add("mauChuDen");
  } else {
    tieude.classList.remove("mauChuDen");
  }
}

// Lắng nghe sự kiện click cho các nút điều khiển slide
for (let i = 0; i < nut.length; i++) {
  nut[i].addEventListener("click", function () {
    // Xóa lớp active khỏi tất cả các slide và nút điều khiển
    for (var j = 0; j < nut.length; j++) {
      nut[j].classList.remove("nut-do");
      slide[j].classList.remove("active");
    }

    // Thêm lớp active cho slide và nút điều khiển được click
    nut[i].classList.add("nut-do");
    slide[i].classList.add("active");
    chiSoHienTai = i;
  });
}

function confirmLogout() {
  var confirmation = confirm("Bạn có chắc muốn logout?");
  return confirmation;
}