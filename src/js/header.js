$(document).ready(function () {
    // Lấy tên người dùng từ localStorage
    var username = localStorage.getItem('username');

    // Kiểm tra nếu có tên người dùng trong localStorage thì cập nhật nội dung của phần tử #username
    if (username) {
        $('#username').text(username);
    }
});
