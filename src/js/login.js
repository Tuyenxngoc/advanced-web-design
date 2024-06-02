$('.txtdata input').on({
    focus: function () {
        $(this).addClass('focusClass');
    },
    blur: function () {
        if ($(this).val() == '') {
            $(this).removeClass('focusClass');
        }
    },
});

$('.iconss').on('click', function () {
    var passwordField = $('#passwordField');
    var fieldType = passwordField.attr('type');

    // Toggle between password and text
    if (fieldType === 'password') {
        passwordField.attr('type', 'text');
        $('.iconss').removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
        passwordField.attr('type', 'password');
        $('.iconss').removeClass('fa-eye-slash').addClass('fa-eye');
    }
});

// Danh sách các tài khoản hợp lệ
const validAccounts = [
    { username: 'tuyen', password: 'abc123!@#' },
    { username: 'tu', password: 'abc123!@#' },
    { username: 'tuan', password: 'abc123!@#' },
];

$('#login-form').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    var username = $('#username').val();
    var password = $('#passwordField').val();

    // Kiểm tra thông tin đăng nhập
    var isValid = validAccounts.some(function (account) {
        return account.username === username && account.password === password;
    });

    if (isValid) {
        window.location.href = 'index.html';
    } else {
        var toastElement = new bootstrap.Toast(document.getElementById('loginToast'));
        toastElement.show();
    }
});
