using EntrenadorPersonal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EntrenadorPersonal.Controllers
{
    public class MainController : Controller
    {
        // GET: Main
        public ActionResult Index()
        {
            Entrenadores usuarioLogeado = (Entrenadores)Session["Usuario"];
            if ( Session["Usuario"]!=null)
            {
                ViewData["nombreUsuario"] = usuarioLogeado.Nombre;
                ViewData["idEntrenador"] = usuarioLogeado.EntrenadorID;
                ViewData["TipoEntrenador"] = ObtenerTipoEntrenador(usuarioLogeado.EntrenadorID);

                return View();
            }
              return RedirectToAction("Index", "Login");
        }
   

    //Obtener tipo entrenador por su id
    public string ObtenerTipoEntrenador(int id)
    {
        // Asumiendo que Entrenadores y el objeto Session están correctamente configurados
        Entrenadores usuarioLogeado = (Entrenadores)Session["Usuario"];
        ViewData["nombreUsuario"] = usuarioLogeado.Nombre;

        var db = new Models.BDEntrenadorPersonalDataContextDataContext();

        // Corrección de la consulta LINQ
        var descripcionTipoEntrenador = (from e in db.Entrenadores
                                         join t in db.TipoEntrenador on e.TipoEntrenadorID equals t.TipoEntrenadorID
                                         where e.habilitado == 1 && e.EntrenadorID == id
                                         select t.Descripcion).FirstOrDefault();

        // Verifica si se encontró una descripción y retorna el resultado adecuado
        return descripcionTipoEntrenador ?? "No disponible";
    }

        public JsonResult GetClientesPorEntrenador(int entrenadorId)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            var listar = from clientes in db.Clientes
                         join entrenadores in db.Entrenadores
                             on clientes.EntrenadorID equals entrenadores.EntrenadorID
                         where entrenadores.habilitado == 1 && clientes.EntrenadorID == entrenadorId
                         select new
                         {
                             clientes.ClienteID,
                             clientes.Nombre,
                             clientes.Apellido,
                             clientes.Email,
                             clientes.Telefono,
                             FechaInicio= clientes.FechaInicio.HasValue
                                ? clientes.FechaInicio.Value.ToShortDateString()
                                : null
                         };

            return Json(listar, JsonRequestBehavior.AllowGet);
        }

        //Obtener el tipo de entrenador por su id
        public string ObtenerTipoEntrenadorPorId(int idEntrenador)
        {
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();
            var descripcion = (from entrenador in db.Entrenadores
                               join tipoEntrenador in db.TipoEntrenador
                                   on entrenador.TipoEntrenadorID equals tipoEntrenador.TipoEntrenadorID
                               where entrenador.EntrenadorID == idEntrenador
                               select tipoEntrenador.Descripcion)
                              .FirstOrDefault(); // Esto devolverá la descripción o null si no hay coincidencias

            return descripcion; // Descripción es ya un string o null
        }

    }
}