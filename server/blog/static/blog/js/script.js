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


});