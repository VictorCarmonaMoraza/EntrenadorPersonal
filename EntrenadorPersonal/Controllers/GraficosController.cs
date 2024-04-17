using EntrenadorPersonal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EntrenadorPersonal.Controllers
{
    public class GraficosController : Controller
    {
        // GET: Graficos
        public ActionResult Index()
        {
            return View();
        }

        //Obtener grafica por idCliente
        public JsonResult GetGraficaPorCliente(int clienteId)
            
        {
            clienteId = 1;
            var db = new Models.BDEntrenadorPersonalDataContextDataContext();

            var listar = from evolucion in db.EvolucionClientes
                         where evolucion.ClienteID == clienteId
                         select new
                         {
                             Nombre =evolucion.Clientes.Nombre,
                             FechaInicio = evolucion.Fecha.HasValue
                               ? evolucion.Fecha.Value.ToShortDateString()
                               : null,
                             Peso= evolucion.Peso,
                             Grasa_Corporal = evolucion.GrasaCorporal,
                             Musculo =evolucion.Musculo,
                         };

            return Json(listar, JsonRequestBehavior.AllowGet);
        }

    }
}