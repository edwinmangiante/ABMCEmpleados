//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ABMCEmpleados.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ciudades
    {
        public string ciu_codigo { get; set; }
        public string ciu_pro_codigo { get; set; }
        public string ciu_pro_pai_codigo { get; set; }
        public string ciu_nombre { get; set; }
    
        public virtual provincias provincias { get; set; }
    }
}
