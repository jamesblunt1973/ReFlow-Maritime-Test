using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReflowMaritimeTest.Utils
{
    public static class Extentions
    {
        public static string GetExceptionMessage(this Exception ex)
        {
            while (ex.InnerException != null)
                ex = ex.InnerException;
            return ex.Message;
        }
    }
}
