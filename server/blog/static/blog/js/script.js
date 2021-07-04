$(document).ready(function(){
    $('#submit').on('click', function(){
        $firstname = $('#firstname').val();
        $lastname = $('#lastname').val();
        $address = $('#address').val();

        if($firstname == "" || $lastname == "" || $address == ""){
            alert("Please complete field");
        }else{
            $.ajax({
                type: "POST",
                url: "insert",
                data:{
                    firstname: $firstname,
                    lastname: $lastname,
                    address: $address,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(){
                    alert('Save Data');
                    $('#firstname').val('');
                    $('#lastname').val('');
                    $('#address').val('');
                    window.location = "/";
                }
            });
        }
    });
    // Branch
    $('#bsubmit').on('click', function(){
        $bname = $('#bname').val();
        
        if($bname == ""){
            alert("Please insert branch field");
        }else{
            $.ajax({
                type: "POST",
                url: "insertbranch",
                data:{
                    name: $bname,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(){
                    alert('Save Data');
                    $('#bname').val('');
                    window.location = "newbranch";
                }
            });
        }
    });

    // Subject
    $('#ssubmit').on('click', function(){
        $sname = $('#sname').val();
        $bname = $('#bname').val();
        
        if($bname == "" || $sname == ""){
            alert("Please insert branch field");
        }else{
            $.ajax({
                type: "POST",
                url: "insertsubject",
                data:{
                    name: $sname,
                    bname: $bname,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(){
                    alert('Save Data');
                    $('#bname').val('');
                    $('#sname').val('');
                    window.location = "newsubject";
                }
            });
        }
    });

    // Fetch Subject
    $('#branch').on('change', function(){
        $bname = $('#branch').val();
        if($bname == "" ){
            alert("Please insert branch field");
        }else{
            $.ajax({
                type: "GET",
                url: "fetchsubject",
                data:{
                    bname: $bname,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(models){
                    var obj = JSON.parse(models);
                    var options = '<option value="">Select a model</option>';
                    
                    for (var i = 0; i < obj.length; i++) {
                        options += '<option value="' + obj[i].pk + '">' +obj[i].fields['name'] + '</option>';
                        }
                        $("select#sname").html(options);
                        $("select#sname option:first").attr('selected', 'selected');
                        
                }
            });
        }
    });


    //Aditi Anand Code

    $('#mname').on('keyup', function(){
        $mname = $('#mname').val();
        if($mname == "" ){
            window.location = "/";
        }else{
            $.ajax({
                type: "GET",
                url: "/",
                data:{
                    mname: $mname,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(models){
                    var obj = JSON.parse(models);
                    var table = "";
                    for (var i = 0; i < obj.length; i++) {
                        table += '<tr><td>' +obj[i].fields['firstname'] + '</td>'+
                        '<td>'+obj[i].fields['lastname'] + '</td>'+
                        '<td>'+obj[i].fields['address'] + '</td>'+
                        '</tr>';
                        }
                        $("tbody").html("");
                        $("tbody").html(table);
                        $("tbodyoption:first").attr('selected', 'selected');   
                }
            });
        }
    });


    // Anj Code

    $('#ssubmit').on('click', function(){
        $bname = $('#branch').val();
        $sname = $('#sem').val();
        $subname = $('#sname').val();
        if($bname == "" || $sname == "" ){
            alert("select branch and semester");
        }else{
            $.ajax({
                type: "GET",
                url: "fetchstudent",
                data:{
                    bname: $bname,
                    sname: $sname,
                    subname: $subname,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(models){
                    var obj = JSON.parse(models);
                    var table = "";
                    for (var i = 0; i < obj.length; i++) {
                        table += '<tr id="' + obj[i].pk + '" onchange="Mark(this.id);"><td>' +(i+1)+ '</td>'+
                        '<td>'+obj[i].fields['name'] + '</td>'+
                        '<td>'+obj[i].fields['enrolment'] + '</td>'+
                        // '<td><input type="checkbox" style="zoom:1.5;" name="status" id="status'+i+'" data-student-id="'+obj[i].pk+'"></td></tr>'
                        '<td data-student-id="'+obj[i].pk+'"><input class="'+obj[i].pk+'" type="radio" name="status'+i+'" value="Present">Present<br><input class="'+obj[i].pk+'" type="radio" name="status'+i+'" value="Absent">Absent<br><input class="'+obj[i].pk+'" type="radio" name="status'+i+'" value="Leave">Leave</td></tr>'
                        }
                        $("tbody").html(table);
                        $("tbodyoption:first").attr('selected', 'selected');   
                }
            });
        }
    });
    
    $('#udetails').on('click', function(){
        $bname = $('#branch').val();
        $sname = $('#sem').val();
        $subname = $('#sname').val();
        $date = $('#ldate').val();
        if($bname == "" || $sname == "" ){
            alert("select branch and semester");
        }else{
            $.ajax({
                type: "GET",
                url: "editattendance",
                data:{
                    bname: $bname,
                    sname: $sname,
                    subname: $subname,
                    date: $date,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(models){
                    var obj = JSON.parse(models);
                    var table = "";
                    $("thead").empty();
                    var thead = "<tr><td>Id</td><td>Student</td><td>Marked Attendance</td><td>Update Attendance</td></tr>";
                    $("thead").html(thead);
                    var tcol = "<td></td>";
                    $("thead#head").html(table);
                    for (var i = 0; i < obj.length; i++) {
                        table += '<tr id="' + obj[i].pk + '" onchange="UpdateAttendance(this.id);"><td>' +(i+1)+ '</td>'+
                        '<td data-sid="'+obj[i].fields['student_id']+'">'+obj[i].fields['student_id'] + '</td>'+
                        '<td>'+obj[i].fields['status']+'</td>'+
                        '<td data-student-id="'+obj[i].pk+'"><input class="'+obj[i].pk+'" type="radio" name="status'+i+'" value="Present">Present<br><input class="'+obj[i].pk+'" type="radio" name="status'+i+'" value="Absent">Absent<br><input class="'+obj[i].pk+'" type="radio" name="status'+i+'" value="Leave">Leave</td></tr>'
                        }
                        $("tbody").html(table);
                        $("tbodyoption:first").attr('selected', 'selected');   
                }
            });
        }
    });

   
    

});
function Mark(id){
    let status = "leave";
    let ldate = $('#ldate').val();
    let element = document.getElementsByClassName(id);
    
    for (let i = 0; i < element.length; i++) {
        if (element[i].checked) {
            status = element[i].value;
        }
    }
    $.ajax({
                type: "GET",
                url: "mark",
                data:{
                    sid: id,
                    bname : $('#branch').val(),
                    subname : $('#sname').val(),
                    sename: $('#sem').val(),
                    status : status,
                    date: $('#ldate').val(),
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(models){
                }
            });
}


function UpdateAttendance(id){
    let status = "leave";
    let ldate = $('#ldate').val();
    let element = document.getElementsByClassName(id);
    alert(element.item(0));
    for (let i = 0; i < element.length; i++) {
        if (element[i].checked) {
            status = element[i].value;
        }
    }
    $.ajax({
                type: "GET",
                url: "Updateattendance",
                data:{
                    aid:id,
                    sid: $(this).attr('data-sid'),
                    bname : $('#branch').val(),
                    subname : $('#sname').val(),
                    sname: $('#sem').val(),
                    status : status,
                    date: $('#ldate').val(),
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(models){
                }
            });
}
// $(document).on("click", "[id^='status-']", function(){
// alert('asdjasjdhaksjh');
//     if (!$(this).is(':checked')) {
//         alert("Absent student");

//         $.ajax({
//             type: "GET",
//             url: "mark",
//             data:{
//                 sname: $(this).attr('data-student-id'),
//                 bname : $('#branch').val(),
//                 subname : $('#sname').val(),
//                 sename: $('#sem').val(),
//                 status : 'Absent',
//                 date: $('#ldate').val(),
//                 csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
//             },
//             success: function(models){
//             }
//         });
//     }
//      else {
//          alert("Present student"+$('#ldate').val());

//         $.ajax({
//             type: "GET",
//             url: "mark",
//             data:{
//                 sname: $(this).attr('data-student'),
//                 sename: $(this).attr('data-semester'),
//                 status : 'Present',
//                 subname : $('#sname').val(),
//                 bname : $('#branch').val(),
//                 date: $('#ldate').val(),
                
//                 csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
//             },
//             success: function(models){
//                 alert("Succes");
//             }
//         });
//     }
// });