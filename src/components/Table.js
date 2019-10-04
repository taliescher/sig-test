import React, { useState } from "react"
import descending from './icons/order-descending';
import ascending from './icons/order-ascending';

const formatTitle = (title) =>
  title === 'Number' ? '#' : title.replace(/in\s\$$/g, () => '(in $)')

const formatDate = (date) =>
  date
    .split('-')
    .map(el => el.replace(/^0+/, ''))
    .join('/')

const formatCurrency = (currency) =>
  currency && [...currency.toString()]
    .reverse()
    .reduceRight((ac, el, i) => ((i+1) % 3 === 0) ? ac.concat(`,${el}`) : ac.concat(el))

const Table = ({ tableData }) => {
  const { columns, rows } = tableData
  const [formatedRows, formatRows] = useState(rows)

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          {columns.map(column => (
            <th
              className="cell"
              key={`column-${column.id}`}
            >
              {formatTitle(column.title)}
              <button
                className="table__button"
              >
                {/* {isDescending ? ascending : descending} */}
                {descending}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(( row ) => (
          <tr className="table__row" key={`row-${row.number}`}>
            <td className="cell">{row.number}</td>
            <td className="cell">{row.title}</td>
            {/* Here i'm aware there are formal ways of handling data
            (e.g.: value.toLocaleString(). I am using a pure function
            in order to show my skills in the matter. */}
            <td className="cell">{formatDate(row.releaseDate)}</td>
            <td className="cell" align="right">{formatCurrency(row.productionBudget)}</td>
            <td className="cell" align="right">{formatCurrency(row.worldwideBoxOffice)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
