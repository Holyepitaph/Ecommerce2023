export const Ratings = ({info, change}) =>{
    const reducedFirst = info.map(x=>x.rating)
    const reduced = reducedFirst.reduce((x,i)=>x+i, 0)
    const rating = reduced/reducedFirst.length
      return(
        <div className={change}>
          Average Rating: {isNaN(reduced/reducedFirst.length) ? "???" : rating}
        </div>
      )
    }