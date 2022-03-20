import React from "react";
import { IApp, ISubscriptions } from "../data/interfaces/app.interface";

interface IAppItemProps {
  item: IApp;
  onClickCategoryHandler?(category: String): void;
}

const AppItem: React.FunctionComponent<IAppItemProps> = (
  props: IAppItemProps
) => {
  const { item, onClickCategoryHandler } = props;
  return (
    <li className="app-item" key={item.id}>
      <div className="item-inner">
        <div className="main-description">
          <div className="icon-container">
            <img
              src={`https://loremicon.com/poly/50/50/5454${item.id}4/png`}
              alt="icon-app"
            />
          </div>
          <div className="app-description">
            <div className="item-title">{item.name}</div>
            <div className="item-description">{item.description}</div>
          </div>
        </div>
        <div className="more-description">
          <div className="description-item">
            <div className="description-title">
              <span>Categories:</span>
            </div>
            <ul className="categories-list">
              {item &&
                item.categories?.map((cat: string, index: number) => {
                  const keyCat = `category-${index}`;
                  return (
                    <li
                      key={keyCat}
                      className="category"
                      onClick={(e) => {
                        e.preventDefault();
                        onClickCategoryHandler && onClickCategoryHandler(cat);
                      }}
                    >
                      {cat}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="description-item">
            <div className="description-title">
              <span>Subscription Plans:</span>
            </div>
            <ul className="subscription-list">
              {item &&
                item.subscriptions?.map(
                  (sub: ISubscriptions, index: number) => {
                    const keySub = `subscription-${index}`;
                    return (
                      <li
                        key={keySub}
                        className={`item-subscription ${sub.name?.toLocaleLowerCase()}`}
                      >
                        <span className="plan">{sub.name}</span>
                        <span className="price">
                          {sub.price && sub?.price > 0 ? sub.price / 100 : null}
                          <span>
                            {sub.price && sub?.price > 0 ? "€" : null}
                          </span>
                        </span>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AppItem;
