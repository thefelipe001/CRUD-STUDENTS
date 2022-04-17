//Data
var dataTable;
var StudentID;
var Name;
var Department;
var Semester;
var Age;
var Fees;


$(document).ready(function () {
    dataTable = $("#StudentTable").DataTable({

        "ajax": {

            "url": "/Students/GetData",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data":"studentID"
            },
            {
                "data": "name"
            },
            {
                "data": "department"
            },
            {
                "data": "semester"
            },
            {
                "data": "age"
            },
            {
                "data": "fees"
            },
            {
                "data": "studentID", "render": function (data) {

                    return "<a class='btn btn-warning btn-sm' title='Detail' ><i class='bi bi-journal-medical'></i></a>    <a class='btn btn-success btn-sm' title='Edit' onclick=Edit(" + data + ") ><i class='fa fa-pencil'></i></a> <a class='btn btn-danger btn-sm' style='margin-left:5px' title='Delete' onclick=Delete(" + data + ")><i class='fa fa-trash'></i></a>";
                },

                "orderable": false,
                "searchable": false,
                "width": "150px"
            }
           
          
         
        ],
        "language": {
            "emptyTable": "No data found please click on <b>Add New </b> Button"
        }

      

    });
});

function OpenModal() {
    $('#FormModal').modal('show');
    $("#formNivel")[0].reset();

}

function Save() {
    Validation();
    if ( Validation() == true)
    {
          var data= {
            StudentID,
            Name,
            Department,
            Semester,
            Age,
            Fees
        };


        $.ajax({
            type: "Post",
            url: "Students/ADDSAVE",
            data: data,
            success: function (response) {
                if (response.data == undefined) {
                    $('#FormModal').modal('hide');
                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        text: data.data,
                    });
                    dataTable.ajax.reload();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops Campo Existe',
                        text: response.data,
                    });
                }

               

            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });

    }
}


function Validation() {
    var result = true;
    $("#txtStudentID").prop("disabled", false);

    StudentID = $("#txtStudentID").val();
    Name = $("#txtName").val();
    Department = $("#txtDepartment").val();
    Semester = $("#txtSemester").val();
    Age = $("#txtAge").val();
    Fees = $("#txtFees").val();
    if (StudentID=="") {
        Swal.fire({
            icon: 'error',
            title: 'Oops Campo Vacio',
            text: 'Debe llenar el Campo StudentID!',
        });
        return result = false;
    }
    if (Name == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops Campo Vacio',
            text: 'Debe llenar el Campo Name!',
        });
        return result = false;
    }
    if (Department == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops Campo Vacio',
            text: 'Debe llenar el Campo Department!',
        });
        return result = false;
    }
    if (Semester == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops Campo Vacio',
            text: 'Debe llenar el Campo Semester!',
        });
        return result = false;
    }
    if (Age == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops Campo Vacio',
            text: 'Debe llenar el Campo Age!',
        });
        return result = false;
    }
    if (Fees == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops Campo Vacio',
            text: 'Debe llenar el Campo Fees!',
        });
        return result = false;
    }
    return result;

  


}

function Delete(Id)
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/Students/Delete/'+Id,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data!=null) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been Remove',
                            text: data.data,
                        });
                        dataTable.ajax.reload();
                    } else {
                        Swal.fire(
                            'Cancelado!',
                            'Hubo un Error al Eliminar.',
                            'error'
                        );
                    }
                },
                error: function (error) {
                    console.log(error)
                },
                beforeSend: function () {
                },
            });




          
        }
    })

}

function Edit(Id)
{
    if (Id!=null) {
        $.ajax({
            url: '/Students/Edit/' + Id,
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {

                    var _data = data.Age;
                    $.each(data.data, function (index, value, array) {
                        if (index =="studentID") {
                            $("#txtStudentID").val(value);
                            if (value!="") {
                                $("#txtStudentID").prop('disabled', true);

                            }


                        }
                        if (index == "name") {
                            $("#txtName").val(value);

                        }
                        if (index == "department") {
                            $("#txtDepartment").val(value);

                        }
                        if (index == "semester") {
                            $("#txtSemester").val(value);

                        }
                        if (index == "age") {
                            $("#txtAge").val(value);

                        }
                        $("#txtAge").val(value);
                        $("#txtFees").val(value);
                    });
                 


                    $('#FormModal').modal('show');

                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {
            },
        });
    }

}