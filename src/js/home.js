$(document).ready(function () {
    var name = localStorage.getItem('username');

    if (name) {
        $('.nameDisplay').text(name);
    }
    $.get('http://localhost:3000/members', function (data) {
        var userCount = data.length;
        const majors = [
            'Công nghệ thông tin',
            'Khoa học máy tính',
            'Kỹ thuật phần mềm',
            'Hệ thống thông tin',
            'Công nghệ đa phương tiện',
        ];

        // Đếm số lượng đoàn viên và lớp học trong từng chuyên ngành
        var majorData = {};

        $.each(data, function (index, member) {
            if (majors.includes(member.major)) {
                if (!majorData[member.major]) {
                    majorData[member.major] = {
                        memberCount: 0,
                        branches: new Set(),
                    };
                }
                majorData[member.major].memberCount++;
                majorData[member.major].branches.add(member.branch);
            }
        });

        // Hiển thị kết quả trên trang web
        $.each(majorData, function (major, info) {
            const branchCount = info.branches.size;
            const memberCount = info.memberCount;
            if (branchCount !== 0) {
                const $satisItem = $('<div>').addClass('col-3 satis-item');
                const $satisContent = $('<div>').addClass('satis-content');
                const $majorDiv = $('<div>').addClass('major').text(major);
                const $satisBranch = $('<div>')
                    .addClass('satis-branch ')
                    .text(branchCount + ' chi đoàn ');
                const $satisMember = $('<div>')
                    .addClass('satis-member ')
                    .text(memberCount + ' đoàn viên');

                const $iconDiv = $('<div>').addClass('icon').html('<i class="fa-solid fa-users"></i>');
                $satisContent.append($majorDiv, $satisBranch, $satisMember);

                // Thêm $satisContent vào $satisItem
                $satisItem.append($iconDiv);
                $satisItem.append($satisContent);

                // Thêm $satisItem vào .satis-componets
                $('.satis-componets').append($satisItem);
            }
        });

        $('#satis-common').text(userCount + ' đoàn viên');
    }).fail(function (xhr, status, error) {
        console.error('Error:', status, error);
        // $('#satis-common').text('Error occurred while fetching data.');
    });
});
var swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});
