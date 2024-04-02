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
            ViewData["nombreUsuario"] = usuarioLogeado.Nombre;

            return View();
        }
    }
}