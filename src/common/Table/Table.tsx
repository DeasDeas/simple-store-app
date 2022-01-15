import React from "react";
import { Product, Category } from "../../app/App";

export function Table({
  products,
  category,
}: {
  products: Product[] | undefined;
  category: Category | undefined;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={5}>{category?.name}</th>
        </tr>
        <tr>
          <th className={"table-cell"}>Id</th>
          <th className={"table-cell"}>Название товара</th>
          <th className={"table-cell"}>Цена</th>
          <th className={"table-cell"}>Количество</th>
          <th className={"table-cell"}>Сумма</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => {
          return (
            <tr>
              <td className={"table-cell"}>{product.id}</td>
              <td className={"table-cell"}>{product.name}</td>
              <td className={"table-cell"}>{product.price}</td>
              <td className={"table-cell"}>
                <input type="text" />
              </td>
              <td className={"table-cell"}>{0}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
