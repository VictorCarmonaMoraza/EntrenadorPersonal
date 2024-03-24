using System.Linq;
using System.Web.Mvc;

namespace EntrenadorPersonal.Controllers
{
    public class EntrenadoresController : Controller
    {
        // GET: Entrenadores
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetEntrenadores()
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            var listar = from entrenadoresHabilitados in db.Entrenadores
                          where entrenadoresHabilitados.habilitado == 1
                          select new
                          {
                              entrenadoresHabilitados.EntrenadorID,
                              entrenadoresHabilitados.Nombre,
                              entrenadoresHabilitados.Apellido,
                              entrenadoresHabilitados.Email,
                              entrenadoresHabilitados.Especialidad,
                              entrenadoresHabilitados.Telefono
                          };

            return Json(listar, JsonRequestBehavior.AllowGet);
        }
    }
}