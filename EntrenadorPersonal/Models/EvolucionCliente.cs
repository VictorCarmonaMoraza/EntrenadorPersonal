using System;

namespace EntrenadorPersonal.Models
{
    public class EvolucionCliente
    {
        public int ClienteID { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Peso { get; set; }
        public decimal GrasaCorporal { get; set; }
        public decimal Musculo { get; set; }
        public string Comentarios { get; set; }
    }
}