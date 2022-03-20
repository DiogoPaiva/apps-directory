import React from "react";

interface ICategoriesProps {
  data: String[];
  onClickCallBack(item: String): void;
}

const Categories: React.FunctionComponent<ICategoriesProps> = (
  props: ICategoriesProps
) => {
  const { data, onClickCallBack } = props;

  return (
    <div className="category-container">
      <ul>
        {data &&
          data.map((item: String, index: number) => {
            const key = `id-${index}`;
            return (
              <li
                className="item-category"
                key={key}
                onClick={(e) => {
                  e.preventDefault();
                  onClickCallBack && onClickCallBack(item);
                }}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Categories;
