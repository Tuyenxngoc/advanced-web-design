$(document).ready(function () {
    $('#logout-button').click(function () {
        // Xóa trạng thái đăng nhập khỏi localStorage
        localStorage.removeItem('loggedIn');
        // Chuyển hướng người dùng về trang đăng nhập
        window.location.href = 'login.html';
    });
});
