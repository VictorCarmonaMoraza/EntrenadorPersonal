using System.Linq;
using System.Web.Mvc;

namespace EntrenadorPersonal.Controllers
{
    public class ClientesController : Controller
    {
        // GET: Clientes
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Obtener listado de clientes
        /// </summary>
        /// <returns></returns>
        public JsonResult GetClientes()
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            var listar = from clientes in db.Clientes
                         select new
                         {
                             clientes.Nombre,
                             clientes.Apellido,
                             clientes.Email,
                             clientes.EntrenadorID,
                             clientes.Telefono
                         };

            return Json(listar, JsonRequestBehavior.AllowGet);
        }
    }
}