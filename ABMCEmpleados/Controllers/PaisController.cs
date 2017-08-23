using ABMCEmpleados.Models;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
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
            if (Usuario.IsUserLog(Session["usuario"].ToString(), Session["password"].ToString()))
                return View();
            else
                return RedirectToAction("Index", "Ingresar");
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
        /// <returns>JsonResult</returns>  
        public JsonResult Insert(Pais Pais)
        {
            if (Pais != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    Obj.Paises.Add(Pais);
                    Obj.SaveChanges();
                    return Json(new { rta = 0 }, JsonRequestBehavior.AllowGet);
                }
            else
                return Json(new { rta = 1 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>  
        /// Elimina un nuevo país  
        /// </summary>  
        /// <param name="Pais">El objeto país a eliminar.</param>  
        /// <returns>JsonResult</returns>  
        public JsonResult Delete(Pais Pais)
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
                        return Json(new { rta = 0 }, JsonRequestBehavior.AllowGet);
                    }
                else
                    return Json(new { rta = 1 }, JsonRequestBehavior.AllowGet);
            else
                return Json(new { rta = 2 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>  
        /// Edita un nuevo país  
        /// </summary>  
        /// <param name="Pais">El objeto país a editar.</param>  
        /// <returns>JsonResult</returns>  
        public JsonResult Update(Pais Pais)
        {
            if (Pais != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    var Pais_ = Obj.Entry(Pais);
                    Pais PaisObj = Obj.Paises.Where(x => x.pai_codigo == Pais.pai_codigo).FirstOrDefault();
                    PaisObj.pai_nombre = Pais.pai_nombre;
                    Obj.SaveChanges();
                    return Json(new { rta = 0 }, JsonRequestBehavior.AllowGet);
                }
            else
                return Json(new { rta = 1 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Exporta la lista de países a excel.
        /// </summary>
        /// <param name="paises">Los países a exportar</param>
        /// <returns>El resultado de la acción.</returns>
        public JsonResult ExportToExcel(List<Pais> paises)
        {
            try
            {
                string sFileName = @"D:\Dedwin\Downloads\paises.xlsx";
                FileInfo file = new FileInfo(sFileName);
                if (file.Exists)
                {
                    file.Delete();
                    file = new FileInfo(sFileName);
                }

                using (ExcelPackage package = new ExcelPackage(file))
                {
                    ExcelWorksheet workSheet = package.Workbook.Worksheets.Add("Países");
                    workSheet.Cells[1, 1].Value = "Código";
                    workSheet.Cells[1, 1].Style.Font.Bold = true;
                    workSheet.Cells[1, 1].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    workSheet.Cells[1, 2].Value = "Nombre";
                    workSheet.Cells[1, 2].Style.Font.Bold = true;
                    workSheet.Cells[1, 2].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);

                    int c = 1;
                    foreach (Pais item in paises)
                    {
                        c++;
                        workSheet.Cells[c, 1].Value = item.pai_codigo;
                        workSheet.Cells[c, 1].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        workSheet.Cells[c, 2].Value = item.pai_nombre;
                        workSheet.Cells[c, 2].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    }

                    workSheet.Column(1).AutoFit();
                    workSheet.Column(2).AutoFit();

                    package.Save();

                    return Json(new { rta = 0, dir = sFileName }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { rta = 0, exMsg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
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