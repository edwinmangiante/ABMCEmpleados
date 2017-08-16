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
        public JsonResult GetAll(string filterNombre)
        {
            using (EmpDBEntities obj = new EmpDBEntities())
            {
                obj.Configuration.LazyLoadingEnabled = false;
                IQueryable<Pais> paises = obj.Paises.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filterNombre))
                    paises = paises.Where(x => x.pai_nombre.Contains(filterNombre));

                return Json(paises.ToList(), JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Obtiene un país por código.
        /// </summary>
        /// <returns></returns>
        public JsonResult GetByKey(string codigoPais)
        {
            //return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            if (!string.IsNullOrWhiteSpace(codigoPais))
            {
                using (EmpDBEntities obj = new EmpDBEntities())
                {
                    obj.Configuration.LazyLoadingEnabled = false;
                    IQueryable<Pais> paises = obj.Paises.AsQueryable();
                    Pais pais = paises.Where(x => x.pai_codigo == codigoPais).FirstOrDefault();
                    if (pais != null && !string.IsNullOrWhiteSpace(pais.pai_codigo))
                        return Json(new { existe = true }, JsonRequestBehavior.AllowGet);
                    else
                        return Json(new { existe = false }, JsonRequestBehavior.AllowGet);
                }
            }
            else
                return Json(new { existe = false }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>  
        /// Insert New Pais  
        /// </summary>  
        /// <param name="Pais"></param>  
        /// <returns></returns>  
        public string Insert(Pais Pais)
        {
            if (Pais != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    Obj.Paises.Add(Pais);
                    Obj.SaveChanges();
                    return "Se agregó el país satisfactoriamente.";
                }
            else
                return "No se pudo agregar el país, intente nuevamente.";
        }

        /// <summary>  
        /// Delete Pais
        /// </summary>  
        /// <param name="Pais"></param>  
        /// <returns></returns>  
        public string Delete(Pais Pais)
        {
            if (Pais != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    var Pais_ = Obj.Entry(Pais);
                    if (Pais_.State == System.Data.Entity.EntityState.Detached)
                    {
                        Obj.Paises.Attach(Pais);
                        Obj.Paises.Remove(Pais);
                    }
                    Obj.SaveChanges();
                    return "Se eliminó el país satisfactoriamente.";
                }
            else
                return "No se pudo eliminar el país, intente nuevamente.";
        }

        /// <summary>  
        /// Update Pais  
        /// </summary>  
        /// <param name="Pais"></param>  
        /// <returns></returns>  
        public string Update(Pais Pais)
        {
            if (Pais != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    var Pais_ = Obj.Entry(Pais);
                    Pais PaisObj = Obj.Paises.Where(x => x.pai_codigo == Pais.pai_codigo).FirstOrDefault();
                    PaisObj.pai_nombre = Pais.pai_nombre;
                    Obj.SaveChanges();
                    return "Se actualizó el país satisfactoriamente.";
                }
            else
                return "No se pudo actualizar el país, intente nuevamente.";
        }
    }
}