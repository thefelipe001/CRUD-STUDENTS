using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebStudentCore.Interfaces;
using WebStudentCore.Models;

namespace WebStudents.Controllers
{
    public class StudentsController : Controller
    {
        private readonly IBaseRepository<Student> _Studentrepository;
        public StudentsController(IBaseRepository<Student> Studentrepository)
        {
            _Studentrepository = Studentrepository;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetData()
        {
            var data = await _Studentrepository.GetAll();
            return Json(new {data=data });
        }

        [HttpPost]
        public async Task<IActionResult>ADDSAVE(Student student)
        {
            if (student!=null)
            {
                if (_Studentrepository.GetFirst(x => x.StudentID == student.StudentID) == null)
                {
                    await _Studentrepository.Add(student);

                }
                else
                {
                    _Studentrepository.Update(student);
                    //string msg = "El ID " + student.StudentID + " existe";
                    //return Json(new { data = msg });
                }
            }
             return Ok();


        }
        public  IActionResult Delete(int Id)
        {
            if (Id>0)
            {
                var data =  _Studentrepository.GetFirst(x => x.StudentID==Id);
                _Studentrepository.Delete(data);
                string msg = "Se elimino Correctamente";
                return Json(new { data = msg });

            }
            return Ok();
        }

        public IActionResult Edit(int? Id)
        {
            if (Id>0)
            {
                var data = _Studentrepository.GetFirst(x => x.StudentID == Id);
                return Ok(new { data = data });

            }
            return Ok();

        }
    }
}
