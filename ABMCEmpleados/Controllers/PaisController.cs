using ABMCEmpleados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ABMCEmpleados.Controllers
{
    public class PaisController : Controller
    {
        // GET: Pais
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Obtiene todos los Países cargados en la BD
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAll()
        {
            using (EmpDBEntities obj = new EmpDBEntities())
            {
                List<Pais> paises = obj.Paises.ToList();
                return Json(paises, JsonRequestBehavior.AllowGet);
            }
        }
    }
}