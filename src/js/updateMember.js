var uploadedImage = "";

// Handle change event of input file
$('#avatar-input').change(function() {
    var input = this;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result;
            $('#avatar-preview').attr('src', uploadedImage);
        }
        reader.readAsDataURL(input.files[0]);
    }
});

$.getJSON("../data/members.json", function(data) {
    var selectBox = $("#nameBox");
    $.each(data.members, function(index, member) {
        // Tạo một tùy chọn mới và thêm vào trường select
        var option = $("<option>").text(member.fullname);
        var opt = $("<option>").text(member.fullname + ' - ' + member.id);
        selectBox.append(opt);
    });
});

$('#nameBox').change(function() {
    var opt = $(this).find('option:selected').text();
    var id = opt.split(' - ')[1];
    var maDD = $("#maDD");
    maDD.empty();
    $.getJSON("../data/members.json", function(data) {
        $.each(data.members, function(index, member) {
            if (member.id == id) {
                var option = $("<option>").text(member.id);
                maDD.append(option);

                $("#ngaySinh").val(member.dob);
                $("#gioiTinh").val(member.gender);
                $("#danToc").val(member.nation);
                $("#CMND").val(member["identification-card"]["card-id"]);
                $("#ngayCap").val(member["identification-card"]["dated"]);
                $("#noiCap").val(member["identification-card"]["issued-by"]);
                if (member["identification-card"]["religion"] == '') {
                    $("#tonGiao").val('Không');
                } else {
                    $("#tonGiao").val(member["identification-card"]["religion"]);
                }
                $("#tdPT").val(member.qualification);
                $("#tdCM").val(member['edu-lvl']);
                $('#llct').val(member['political-theory']);
                $("#queT").val(member["permanent_address"]["province"]);
                $("#queH").val(member["permanent_address"]["district"]);
                $("#queX").val(member["permanent_address"]["commune"]);
                $("#truT").val(member["permanent_address"]["province"]);
                $("#truH").val(member["permanent_address"]["district"]);
                $("#truX").val(member["permanent_address"]["commune"]);
                $("#infoNganh").val(member.major);
                $("#infoCD").val(member.branch);
                $("#ttnn").val(member["eng-lvl"]);
                $("#NgheNghiep").val(member["cur-job"]);
            }
        });
    });
});