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
    public class ProvinciaController : Controller
    {
        // GET: Provincia
        public ActionResult Index()
        {
            if (Usuario.IsUserLog(Session["usuario"].ToString(), Session["password"].ToString()))
                return View();
            else
                return RedirectToAction("Index", "Ingresar");
        }

        /// <summary>
        /// Obtiene todas las provincias cargadas en la BD.
        /// </summary>
        /// <returns>JsonResult</returns>
        public JsonResult GetAll()
        {
            using (EmpDBEntities obj = new EmpDBEntities())
            {
                obj.Configuration.LazyLoadingEnabled = false;
                List<Provincia> provincias = obj.Provincias.OrderBy(x => x.pro_pai_codigo).ThenBy(x => x.pro_codigo).ToList();
                return Json(provincias, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Obtiene todos los países cargados en la BD.
        /// </summary>
        /// <returns>JsonResultv</returns>
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
        /// Obtiene todas las provincias por país cargadas en la BD,
        /// si el parámetro no viene vacío se compara contra la columna pro_nombre.
        /// </summary>
        /// <param name="codigoPais">El código de país.</param>
        /// <param name="filterNombre">Palabra o letra para comparar con la columna nombre dentro de la lista.</param>
        /// <returns>JsonResult</returns>
        public JsonResult GetAllByPais(string codigoPais, string filterNombre)
        {
            if (!string.IsNullOrEmpty(codigoPais))
                using (EmpDBEntities obj = new EmpDBEntities())
                {
                    obj.Configuration.LazyLoadingEnabled = false;
                    IQueryable<Provincia> provincias = obj.Provincias.Where(x => x.pro_pai_codigo == codigoPais).AsQueryable();
                    if (!string.IsNullOrWhiteSpace(filterNombre))
                        provincias = provincias.Where(x => x.pro_nombre.Contains(filterNombre));
                    return Json(provincias.OrderBy(x => x.pro_pai_codigo).ThenBy(x => x.pro_codigo).ToList(), JsonRequestBehavior.AllowGet);
                }
            else
                return Json(null, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Obtiene una provincia por clave primaria.
        /// </summary>
        /// <param name="codigoPais">El código del país que se quiere obtener.</param>
        /// <param name="codigoProvincia">El código de la provincia que se quiere obtener.</param>
        /// <returns>JsonResult</returns>
        public JsonResult GetByKey(string codigoPais, string codigoProvincia)
        {
            if (!string.IsNullOrWhiteSpace(codigoPais) && !string.IsNullOrWhiteSpace(codigoProvincia))
            {
                using (EmpDBEntities obj = new EmpDBEntities())
                {
                    obj.Configuration.LazyLoadingEnabled = false;
                    IQueryable<Provincia> provincias = obj.Provincias.AsQueryable();
                    Provincia provincia = provincias.Where(x => x.pro_pai_codigo == codigoPais && x.pro_codigo == codigoProvincia).FirstOrDefault();
                    if (provincia != null && !string.IsNullOrWhiteSpace(provincia.pro_pai_codigo) && !string.IsNullOrWhiteSpace(provincia.pro_codigo))
                        return Json(new { existe = true }, JsonRequestBehavior.AllowGet);
                    else
                        return Json(new { existe = false }, JsonRequestBehavior.AllowGet);
                }
            }
            else
                return Json(new { existe = false }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>  
        /// Crea una provincia  
        /// </summary>  
        /// <param name="Provincia">El objeto provincia a crear.</param>  
        /// <returns>string</returns>  
        public string Insert(Provincia Provincia)
        {
            if (Provincia != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    Obj.Provincias.Add(Provincia);
                    Obj.SaveChanges();
                    return "Se agregó la provincia satisfactoriamente.";
                }
            else
                return "No se pudo agregar la provincia, intente nuevamente.";
        }

        /// <summary>  
        /// Elimina una provincia  
        /// </summary>  
        /// <param name="Provincia">El objeto provincia a eliminar.</param>  
        /// <returns>string</returns>  
        public string Delete(Provincia Provincia)
        {
            if (Provincia != null)
                if (VerificaCiudadXProvincia(Provincia))
                    using (EmpDBEntities Obj = new EmpDBEntities())
                    {
                        var Provincia_ = Obj.Entry(Provincia);
                        if (Provincia_.State == System.Data.Entity.EntityState.Detached)
                        {
                            Obj.Provincias.Attach(Provincia);
                            Obj.Provincias.Remove(Provincia);
                        }
                        Obj.SaveChanges();
                        return "Se eliminó la provincia satisfactoriamente.";
                    }
                else
                    return "La provincia que quiere eliminar posee al menos una ciudad cargada. Elimine la/s ciudad/es y luego elimine la provincia.";
            else
                return "No se pudo eliminar la provincia, intente nuevamente.";
        }

        /// <summary>  
        /// Edita una provincia  
        /// </summary>  
        /// <param name="Provincia">El objeto provincia a editar.</param>  
        /// <returns>string</returns>  
        public string Update(Provincia Provincia)
        {
            if (Provincia != null)
                using (EmpDBEntities Obj = new EmpDBEntities())
                {
                    var Provincia_ = Obj.Entry(Provincia);
                    Provincia ProvinciaObj = Obj.Provincias.Where(x => x.pro_pai_codigo == Provincia.pro_pai_codigo && x.pro_codigo == Provincia.pro_codigo).FirstOrDefault();
                    ProvinciaObj.pro_nombre = Provincia.pro_nombre;
                    Obj.SaveChanges();
                    return "Se actualizó la provincia satisfactoriamente.";
                }
            else
                return "No se pudo actualizar la provincia, intente nuevamente.";
        }

        /// <summary>
        /// Exporta la lista de provincias a excel.
        /// </summary>
        /// <param name="provincias">Las provincias a exportar</param>
        /// <returns>El resultado de la acción.</returns>
        public string ExportToExcel(List<Provincia> provincias)
        {
            try
            {
                string codigoPais = provincias.First().pro_pai_codigo;
                Pais pais = null;
                using (EmpDBEntities db = new EmpDBEntities())
                    pais = db.Paises.Find(codigoPais);

                string sFileName = @"D:\Dedwin\Downloads\provincias.xlsx";
                FileInfo file = new FileInfo(sFileName);
                if (file.Exists)
                {
                    file.Delete();
                    file = new FileInfo(sFileName);
                }

                using (ExcelPackage package = new ExcelPackage(file))
                {
                    ExcelWorksheet workSheet = package.Workbook.Worksheets.Add("Provincias");
                    workSheet.Cells[1, 1].Value = "Código País";
                    workSheet.Cells[1, 1].Style.Font.Bold = true;
                    workSheet.Cells[1, 1].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    workSheet.Cells[1, 2].Value = "Nombre País";
                    workSheet.Cells[1, 2].Style.Font.Bold = true;
                    workSheet.Cells[1, 2].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    workSheet.Cells[1, 3].Value = "Código";
                    workSheet.Cells[1, 3].Style.Font.Bold = true;
                    workSheet.Cells[1, 3].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    workSheet.Cells[1, 4].Value = "Nombre";
                    workSheet.Cells[1, 4].Style.Font.Bold = true;
                    workSheet.Cells[1, 4].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);

                    int c = 1;
                    foreach (Provincia item in provincias)
                    {
                        c++;
                        workSheet.Cells[c, 1].Value = pais.pai_codigo;
                        workSheet.Cells[c, 1].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        workSheet.Cells[c, 2].Value = pais.pai_nombre;
                        workSheet.Cells[c, 2].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        workSheet.Cells[c, 3].Value = item.pro_codigo;
                        workSheet.Cells[c, 3].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        workSheet.Cells[c, 4].Value = item.pro_nombre;
                        workSheet.Cells[c, 4].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    }

                    workSheet.Column(1).AutoFit();
                    workSheet.Column(2).AutoFit();
                    workSheet.Column(3).AutoFit();
                    workSheet.Column(4).AutoFit();

                    package.Save();

                    return "Se creó el excel correctamente en el directorio " + sFileName + ".";
                }
            }
            catch (Exception ex)
            {
                return "Ocurrió un error al intentar crear el excel, intente nuevamente. (" + ex.Message + ")";
            }
        }

        private bool VerificaCiudadXProvincia(Provincia provincia)
        {
            using (EmpDBEntities Obj = new EmpDBEntities())
            {
                List<Ciudad> ciudades = Obj.Ciudades.Where(x => x.ciu_pro_pai_codigo == provincia.pro_pai_codigo && x.ciu_pro_codigo == provincia.pro_codigo).ToList();
                if (ciudades != null && ciudades.Count > 0)
                    return false;
                else
                    return true;
            }
        }
    }
}