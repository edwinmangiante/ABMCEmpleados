﻿using ABMCEmpleados.Models;
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
                obj.Configuration.LazyLoadingEnabled = false;
                List<Pais> paises = obj.Paises.OrderBy(x => x.pai_codigo).ToList();
                return Json(paises, JsonRequestBehavior.AllowGet);
            }
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