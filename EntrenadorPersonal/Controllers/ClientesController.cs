using EntrenadorPersonal.Models;
using System;
using System.Linq;
using System.Web.Helpers;
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

        //Crear clientes nuevos por el id del entrenador
        public JsonResult CrearCliente(string nombre, string apellido, string email, string telefono,DateTime fechaInicio, int entrenadorID)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            try
            {
                var cliente = new EntrenadorPersonal.Models.Clientes
                {
                    Nombre = nombre,
                    Apellido = apellido,
                    Email = email,
                    Telefono = telefono,
                    FechaInicio = fechaInicio,
                    EntrenadorID = entrenadorID
                };

                db.Clientes.InsertOnSubmit(cliente);
                db.SubmitChanges();

                // Devuelve 1 si se creó correctamente el cliente
                return Json(new { success = 1 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // En caso de error, devuelve 0
                return Json(new { success = 0, errorMessage = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult ActualizarCliente(int clienteID, string nombre, string apellido, string email, string telefono)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            var cliente = db.Clientes.FirstOrDefault(x => x.ClienteID == clienteID);

            if (cliente != null)
            {
                cliente.Nombre = nombre;
                cliente.Apellido = apellido;
                cliente.Email = email;
                cliente.Telefono = telefono;

                db.SubmitChanges();
            }

            return Json(new { cliente.ClienteID }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarCliente(int clienteID)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            var cliente = db.Clientes.FirstOrDefault(x => x.ClienteID == clienteID);

            if (cliente != null)
            {
                db.Clientes.DeleteOnSubmit(cliente);
                db.SubmitChanges();
            }

            return Json(new { cliente.ClienteID }, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult AddEvolucionCliente(int clienteID, DateTime fechaEvolucion, double peso, double grasaCorporal, double musculo, string comentarios)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            try
            {
                var nuevaEvolucionCliente = new EntrenadorPersonal.Models.EvolucionClientes
                {
                    ClienteID = clienteID,
                    Fecha = fechaEvolucion,
                    Peso = Convert.ToDecimal(peso),
                    GrasaCorporal = Convert.ToDecimal(grasaCorporal),
                    Musculo = Convert.ToDecimal(musculo),
                    Comentarios = comentarios,
                };
                

                db.EvolucionClientes.InsertOnSubmit(nuevaEvolucionCliente);
                db.SubmitChanges();

                // Devuelve 1 si se creó correctamente el cliente
                return Json(new { success = 1 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // En caso de error, devuelve 0
                return Json(new { success = 0, errorMessage = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}