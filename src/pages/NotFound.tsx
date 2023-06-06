import '../style/css/main/notfound.css';
import { Link } from "react-router-dom";
import { Image } from "antd";


const NotFound = () => {
  return (
    <div className="notfound_page">
      <h1 className="notfound_title title--border"> 404 </h1>
      <p className="notfound_text"> Такой страницы не существует! </p>
      <div className="notfound_image">
        <Image
          className="notfound_image_404"
          src={require('../options/images/gifs/404.gif')}
          preview={false}
        />
      </div>
      <div className="notfound_links">
        <p className="notfound_links_text"> Вернуться на: </p>
        <Link className="notfound_links_home" to="/"> Главная </Link>
      </div>
    </div>
  )
};


export default NotFound;