using ABMCEmpleados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ABMCEmpleados.Controllers
{
    public class IngresarController : Controller
    {
        private Usuario usuarioLog = null;
        // GET: Ingresar
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Login(Usuario user)
        {
            usuarioLog = Usuario.LogIn(user);
            if (usuarioLog != null)
            {
                Session["usuario"] = usuarioLog.usu_user_name;
                Session["password"] = usuarioLog.usu_password;
                Session["email"] = usuarioLog.usu_user_email;
                Session["nombre"] = usuarioLog.usu_nom_ape;
                return Json(new { existe = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Session["usuario"] = "";
                Session["password"] = "";
                return Json(new { existe = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Logout()
        {
            usuarioLog = new Usuario();
            usuarioLog.usu_user_name = Session["usuario"].ToString();
            usuarioLog.usu_user_email = Session["email"].ToString();
            usuarioLog.usu_password = Session["password"].ToString();
            usuarioLog.usu_user_domain = AppDomain.CurrentDomain.ToString();

            Usuario usr = Usuario.LogOut(usuarioLog);

            if (usr != null)
            {
                Session["usuario"] = "";
                Session["password"] = "";
                Session["email"] = "";
                Session["nombre"] = "";
                return RedirectToAction("Index");
            }
            else
                return RedirectToAction("Error");
        }
    }
}