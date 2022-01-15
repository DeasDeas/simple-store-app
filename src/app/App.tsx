import React, { useEffect, useState } from "react";
import "normalize.css";
import "./App.css";
import { Table } from "../common/Table/Table";
import { Route, Routes, Link } from "react-router-dom";

type Nullable<T> = T | null;
type Undefined<T> = T | undefined;

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
};

export type Store = {
  categories: Category[];
  products: Product[];
};

function App() {
  const [store, setStore] = useState<Undefined<Store>>(undefined);

  useEffect(() => {
    fetch("https://datainlife.ru/junior_task/get_products.php")
      .then((response) => response.json())
      .then((data) => {
        const categories = data.map(
          (category: { rid: string; rname: string }) => {
            return {
              id: category.rid,
              name: category.rname,
            };
          }
        );
        const products = data.reduce(
          (
            prev: Product[],
            category: { rid: string; rname: string; goods: [] }
          ) => {
            const goods = category.goods.map(
              (good: { gid: string; gname: string; gprice: string }) => {
                return {
                  id: good.gid,
                  name: good.gname,
                  price: good.gprice,
                  categoryId: category.rid,
                };
              }
            );

            return [...prev, ...goods];
          },
          []
        );

        setStore({ categories, products });
      });
  }, []);

  return (
    <div className="main">
      <div className="links">
        {store?.categories.map((category) => {
          return <Link to={`/${category.id}`}>{category.name}</Link>;
        })}
      </div>
      <Routes>
        {store?.categories.map((category) => {
          const products = store?.products.filter((prd: Product) => {
            return prd.categoryId === category?.id;
          });

          return (
            <Route
              path={`/${category.id}`}
              element={<Table products={products} category={category} />}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
