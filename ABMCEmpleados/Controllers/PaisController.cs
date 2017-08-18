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
        /// Obtiene todos los países cargados en la BD, si el parámetro no viene vacío se compara contra la 
        /// columna pai_nombre.
        /// </summary>
        /// <param name="filterNombre">Palabra o letra para comparar con la columna nombre dentro de la lista.</param>
        /// <returns>JsonResult</returns>
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
        /// Obtiene una país por clave primaria.
        /// </summary>
        /// <param name="codigoPais">El código del país que se quiere obtener.</param>
        /// <returns>JsonResult</returns>
        public JsonResult GetByKey(string codigoPais)
        {
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
        /// Crea un nuevo país  
        /// </summary>  
        /// <param name="Pais">El objeto país a crear.</param>  
        /// <returns>string</returns>  
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
        /// Elimina un nuevo país  
        /// </summary>  
        /// <param name="Pais">El objeto país a eliminar.</param>  
        /// <returns>string</returns>  
        public string Delete(Pais Pais)
        {
            if (Pais != null)
                if (VerificaProvinciaXPais(Pais))
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
                    return "El país que quiere eliminar posee al menos una provincia cargada. Elimine la/s provincia/s y luego elimine el país.";
            else
                return "No se pudo eliminar el país, intente nuevamente.";
        }

        /// <summary>  
        /// Edita un nuevo país  
        /// </summary>  
        /// <param name="Pais">El objeto país a editar.</param>  
        /// <returns>string</returns>  
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

        private bool VerificaProvinciaXPais(Pais pais)
        {
            using (EmpDBEntities Obj = new EmpDBEntities())
            {
                List<Provincia> provincias = Obj.Provincias.Where(x => x.pro_pai_codigo == pais.pai_codigo).ToList();
                if (provincias != null && provincias.Count > 0)
                    return false;
                else
                    return true;
            }
        }
    }
}