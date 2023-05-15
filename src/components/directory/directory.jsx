import CategotyItem from "../category-item/categotyItem";
import "./directory.scss";

const Directory = (props) => {
  return (
    <div className="directory-container">
      {props.categories.map((category) => {
        return <CategotyItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
