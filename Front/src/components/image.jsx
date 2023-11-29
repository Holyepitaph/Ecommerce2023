


export const ImagesViewer = ({info,change}) =>{
    const baseUrl = "http://localhost:3001/images/"
    const image = baseUrl + info 
    return(
      <>
        <img className={change} src={image}/>
      </>
    )
  }