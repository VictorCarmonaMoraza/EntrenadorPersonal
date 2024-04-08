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

        public JsonResult FiltrarEntrenador(string nombreEntrenador)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();

            // Directamente realizamos la consulta LINQ, utilizando la condición dentro de la consulta
            var listar = from entrenadoresHabilitados in db.Entrenadores
                         where entrenadoresHabilitados.habilitado == 1 &&
                         (nombreEntrenador == "" || entrenadoresHabilitados.Nombre.Contains(nombreEntrenador))
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