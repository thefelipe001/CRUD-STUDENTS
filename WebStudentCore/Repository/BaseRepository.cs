using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WebStudentCore.Interfaces;
using WebStudentCore.Models;

namespace WebStudentCore.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly ApplicationDBContext _applicationDBContext;
        public DbSet<T> dbSet;
        protected List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        public BaseRepository(ApplicationDBContext applicationDB)
        {
            _applicationDBContext = applicationDB;
            dbSet = _applicationDBContext.Set<T>();

        }

        public async Task Add(T entity)
        {
            try
            {
                await _applicationDBContext.Set<T>().AddAsync(entity);
                await _applicationDBContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw new Exception("Error al Guardar"+ex.Message);
            }
         
        }

        public async Task Filter(Expression<Func<bool, int>> expression)
        {
            try
            {
                 await _applicationDBContext.Set<T>().FindAsync(expression);

            }
            catch (Exception ex)
            {

                throw new Exception("Filtrar informacion" + ex.Message);
            }
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            try
            {
                return await _applicationDBContext.Set<T>().ToListAsync();

            }
            catch (Exception ex)
            {
                throw new Exception("Error al Buscar" + ex.Message);
            }
        }

        public virtual T GetFirst(Expression<Func<T, bool>> query)
        {
            IQueryable<T> currentQuery = ImplementIncludes(dbSet);
            return currentQuery.FirstOrDefault(query);
        }

        public IQueryable<T> ImplementIncludes(IQueryable<T> IncludedQuery)
        {
            IQueryable<T> currentQuery = IncludedQuery;
            foreach (var include in Includes)
                currentQuery = currentQuery.Include(include);
           
            return currentQuery;
        }

        public  void Delete(T entity)
        {
          _applicationDBContext.Set<T>().Remove(entity);
         _applicationDBContext.SaveChanges();
        }

        public void Update(T entity)
        {
            try
            {
                _applicationDBContext.Set<T>().Update(entity);
                _applicationDBContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw new Exception("Error al Actualizar"+ex.Message);
            }
        }
    }
}