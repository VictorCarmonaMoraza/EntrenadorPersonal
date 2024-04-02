using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EntrenadorPersonal.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public int ingresarLogin(string usuario,  string password)
        {
            var respuesta = 0;
            try
            {
                //Accedemos a bbdd con usuario y contraseña
                var db = new Models.BDEntrenadorPersonalDataContextDataContext();
                var registro = (from entrenador in db.Entrenadores
                               where entrenador.habilitado == 1
                               && entrenador.Usuario == usuario && entrenador.Contraseña == password
                               select entrenador).Count();

                if (registro ==1)
                {
                    var usuarioLogeado = (from entrenador in db.Entrenadores
                                         where entrenador.habilitado == 1
                                         && entrenador.Usuario == usuario && entrenador.Contraseña == password
                                         select entrenador).First();

                    //Guardamos en session el usuario loegeado
                    Session["Usuario"] = usuarioLogeado;


                }
                return registro;

            }
            catch (Exception ex)
            {
                return  respuesta = 0;
            }

            return respuesta;
        }
    }
}