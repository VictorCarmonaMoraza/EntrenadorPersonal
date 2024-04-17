using EntrenadorPersonal.Models;
using System;

namespace EntrenadorPersonal.Controllers
{
    public class Cliente
    {
        // Si ClienteID es un campo de identidad en la base de datos, entonces no necesitamos establecerlo aquí,
        // ya que la base de datos lo generará automáticamente.
        public int ClienteID { get; set; } // asumiendo que es autoincremental y la llave primaria

        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaInicio { get; set; } // Tipo DateTime para coincidir con date en SQL
        public int? EntrenadorID { get; set; } // nullable int, ya que parece que permite nulos
    }

}