$('.txtdata input').on({
    focus: function () {
        $(this).addClass('focusClass');
    },
    blur: function () {
        if ($(this).val() == "") {
            $(this).removeClass('focusClass');
        }
    }
})

$('.iconss').on("click", function () {
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