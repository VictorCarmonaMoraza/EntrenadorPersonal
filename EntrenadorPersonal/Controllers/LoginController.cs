﻿using System;
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

            }
            catch (Exception ex)
            {
                return  respuesta = 0;
            }

            return respuesta;
        }
    }
}