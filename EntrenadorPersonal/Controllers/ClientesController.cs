using EntrenadorPersonal.Models;
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
                             clientes.Telefono,
                             FechaInicio = clientes.FechaInicio.HasValue
                                ? clientes.FechaInicio.Value.ToShortDateString()
                                : null
                         };

            return Json(listar, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FiltrarClientes(string nombreCliente)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();

            // Directamente realizamos la consulta LINQ, utilizando la condición dentro de la consulta
            var listar = from clientes in db.Clientes
                         where
                         (nombreCliente == "" || clientes.Nombre.Contains(nombreCliente))
                         select new
                         {
                             clientes.Nombre,
                             clientes.Apellido,
                             clientes.Email,
                             clientes.EntrenadorID,
                             clientes.Telefono,
                             FechaInicio = clientes.FechaInicio.HasValue
                               ? clientes.FechaInicio.Value.ToShortDateString()
                               : null
                         };

            return Json(listar, JsonRequestBehavior.AllowGet);
        }

        //Obtener los clientes por el id del entrenador

    }
}