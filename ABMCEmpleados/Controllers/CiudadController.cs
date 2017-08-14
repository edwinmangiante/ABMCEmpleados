using ABMCEmpleados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ABMCEmpleados.Controllers
{
    public class CiudadController : Controller
    {
        // GET: Ciudad
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Obtiene todas las ciudades cargadas en la BD
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAll()
        {
            using (EmpDBEntities obj = new EmpDBEntities())
            {
                obj.Configuration.LazyLoadingEnabled = false;
                List<Ciudad> ciudades = obj.Ciudades.OrderBy(x => x.ciu_pro_pai_codigo).ThenBy(x => x.ciu_pro_codigo).ThenBy(x => x.ciu_codigo).ToList();
                return Json(ciudades, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Obtiene todos los países cargados en la BD
        /// </summary>
        /// <returns></returns>
        public JsonResult GetPaises()
        {
            using (EmpDBEntities obj = new EmpDBEntities())
            {
                obj.Configuration.LazyLoadingEnabled = false;
                List<Pais> paises = obj.Paises.OrderBy(x => x.pai_codigo).ToList();
                return Json(paises, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Obtiene todos las provincias por paises cargadas en la BD
        /// </summary>
        /// <returns></returns>
        public JsonResult GetProvincias(string codigoPais)
        {
            if (!string.IsNullOrEmpty(codigoPais))
                using (EmpDBEntities obj = new EmpDBEntities())
                {
                    obj.Configuration.LazyLoadingEnabled = false;
                    List<Provincia> provincias = obj.Provincias.Where(x => x.pro_pai_codigo == codigoPais).OrderBy(x => x.pro_pai_codigo).ThenBy(x => x.pro_codigo).ToList();
                    return Json(provincias, JsonRequestBehavior.AllowGet);
                }
            else
                return Json(null, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Obtiene todas las Provincias por País
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllByPaisAndProvincia(string codigoPais, string codigoProvincia)
        {
            if (!string.IsNullOrEmpty(codigoPais) && !string.IsNullOrEmpty(codigoProvincia))
                using (EmpDBEntities obj = new EmpDBEntities())
                {
                    obj.Configuration.LazyLoadingEnabled = false;
                    List<Ciudad> ciudades = obj.Ciudades.Where(x => x.ciu_pro_pai_codigo == codigoPais && x.ciu_pro_codigo == codigoProvincia).OrderBy(x => x.ciu_pro_pai_codigo).ThenBy(x => x.ciu_pro_codigo).ThenBy(x => x.ciu_codigo).ToList();
                    return Json(ciudades, JsonRequestBehavior.AllowGet);
                }
            else
                return Json(null, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Obtiene una ciudad por clave primaria.
        /// </summary>
        /// <returns></returns>
        public JsonResult GetByKey(string codigoPais, string codigoProvincia, string codigoCiudad)
        {
            if (!string.IsNullOrWhiteSpace(codigoPais) && !string.IsNullOrWhiteSpace(codigoProvincia) && !string.IsNullOrWhiteSpace(codigoCiudad))
            {
                using (EmpDBEntities obj = new EmpDBEntities())
                {
                    obj.Configuration.LazyLoadingEnabled = false;
                    IQueryable<Ciudad> ciudades = obj.Ciudades.AsQueryable();
                    Ciudad ciudad = ciudades.Where(x => x.ciu_pro_pai_codigo == codigoPais && x.ciu_pro_codigo == codigoProvincia && x.ciu_codigo == codigoCiudad).FirstOrDefault();
                    if (ciudad != null && !string.IsNullOrWhiteSpace(ciudad.ciu_pro_pai_codigo) && !string.IsNullOrWhiteSpace(ciudad.ciu_pro_codigo) && !string.IsNullOrWhiteSpace(ciudad.ciu_codigo))
                        return Json(new { existe = true }, JsonRequestBehavior.AllowGet);
                    else
                        return Json(new { existe = false }, JsonRequestBehavior.AllowGet);
                }
            }
            else
                return Json(new { existe = false }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>  
        /// Insert New Ciudad  
        /// </summary>  
        /// <param name="Ciudad"></param>  
        /// <returns></returns>  
        public string Insert(Ciudad Ciudad)
        {
            if (Ciudad != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    Obj.Ciudades.Add(Ciudad);
                    Obj.SaveChanges();
                    return "Se agregó la ciudad satisfactoriamente.";
                }
            else
                return "No se pudo agregar la ciudad, intente nuevamente.";
        }

        /// <summary>  
        /// Delete Ciudad
        /// </summary>  
        /// <param name="Ciudad"></param>  
        /// <returns></returns>  
        public string Delete(Ciudad Ciudad)
        {
            if (Ciudad != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    var Ciudad_ = Obj.Entry(Ciudad);
                    if (Ciudad_.State == System.Data.Entity.EntityState.Detached)
                    {
                        Obj.Ciudades.Attach(Ciudad);
                        Obj.Ciudades.Remove(Ciudad);
                    }
                    Obj.SaveChanges();
                    return "Se eliminó la ciudad satisfactoriamente.";
                }
            else
                return "No se pudo eliminar la ciudad, intente nuevamente.";
        }

        /// <summary>  
        /// Update Ciudad  
        /// </summary>  
        /// <param name="Ciudad"></param>  
        /// <returns></returns>  
        public string Update(Ciudad Ciudad)
        {
            if (Ciudad != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    var Ciudad_ = Obj.Entry(Ciudad);
                    Ciudad CiudadObj = Obj.Ciudades.Where(x => x.ciu_pro_pai_codigo == Ciudad.ciu_pro_pai_codigo && x.ciu_pro_codigo == Ciudad.ciu_pro_codigo && x.ciu_codigo == Ciudad.ciu_codigo).FirstOrDefault();
                    CiudadObj.ciu_nombre = Ciudad.ciu_nombre;
                    Obj.SaveChanges();
                    return "Se actualizó la ciudad satisfactoriamente.";
                }
            else
                return "No se pudo actualizar la ciudad, intente nuevamente.";
        }
    }
}