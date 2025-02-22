namespace FinTracker.Api.Models
{
    public class Grouping<T, I>
    {
        public T Group {  get; private set; }
        public I[] Items { get; private set; }

        public Grouping(T group, IEnumerable<I> items)
        {
            Group = group;
            Items = items.ToArray();
        }
    }
}
