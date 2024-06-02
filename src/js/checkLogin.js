$(document).ready(function () {
    // Kiểm tra trạng thái đăng nhập
    var isLoggedIn = localStorage.getItem('loggedIn');

    // Nếu chưa đăng nhập, chuyển hướng tới trang đăng nhập
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
});
