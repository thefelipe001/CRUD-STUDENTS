using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace WebStudentCore.Interfaces
{
    public interface IBaseRepository<T> where T:class
    {
        Task<IEnumerable<T>> GetAll();
        Task Add(T entity);
        T GetFirst(Expression<Func<T, bool>> query);
        void Delete(T entity);
        void Update(T entity);

    }
}
