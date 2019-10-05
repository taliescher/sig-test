import React, { useState } from 'react'
import Icon from './Icon'

const formatTitle = (title) =>
  title === 'Number' ? '#' : title.replace(/in\s\$$/g, () => '(in $)')

const formatDate = (date) =>
  date
    .split('-')
    .map(el => el.replace(/^0+/, ''))
    .join('/')

const formatCurrency = (currency) =>
  currency > -1 ? [...currency.toString()]
    .reduce((ac, el, i) => (i % 3 === 0) ? ac.concat(`,${el}`) : ac.concat(el))
    : 'Unknown'

const orderRows = (order, id, rows) => {
  if (id === 'releaseDate') {
    return order
      ? rows.sort((a, b) => b.releaseDate === 'Unknown' ? -1 : new Date([...b.releaseDate.split('-').reverse()]) - new Date([...a.releaseDate.split('-').reverse()]))
      : rows.sort((a, b) => b.releaseDate === 'Unknown' ? -1 : new Date([...a.releaseDate.split('-').reverse()]) - new Date([...b.releaseDate.split('-').reverse()]))
  }
  return order
    ? rows.sort((a, b) => a[id] < b[id] ? 1 : a[id] > b[id] ? -1 : 0)
    : rows.sort((a, b) => a[id] > b[id] ? 1 : a[id] < b[id] ? -1 : 0)
  // On the long term, checking the order before execution
  // of the sort reduces the processing count.
  // each line has O(n), doing .reverse() instead of this
  // would double the procedures required.
}

const Table = ({ tableData }) => {
  const { columns, rows } = tableData
  const [order, updateOrder] = useState({ id: '', asc: true })
  const [formatedRows, updateRows] = useState(rows)

  const formatRows = id => {
    updateOrder({ id: id, asc: order.id === id ? !order.asc : false })
    updateRows(orderRows(order.asc, id, rows.slice()))
  }

  const filter = (e, id) =>
    updateRows(rows.filter(el => el[id].toString().toLowerCase().includes(e.target.value.toLowerCase())))

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          {columns.map(column => (
            <th
              className="cell"
              key={ `column-${ column.id }` }
            >
              { formatTitle(column.title) }
              <button
                className="table__button"
                onClick={ () => formatRows(column.id) }
              >
                <Icon asc={order.id === column.id && order.asc} />
              </button>
              <input
                onInput={e => filter(e, column.id)}
                className="table__filter"
                placeholder={`e.g. ${formatedRows[0][column.id] || 0}`}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {formatedRows.map(( row ) => (
          <tr className="table__row" key={`row-${ row.number }`}>
            <td className="cell">{ row.number }</td>
            <td className="cell">{ row.title }</td>
            {/* Here i'm aware there are formal ways of handling data
                (e.g.: value.toLocaleString(). I am using a pure function
                in order to show my skills in the matter. */}
            <td className="cell">{ formatDate(row.releaseDate) }</td>
            {/* Same thing below. I'm aware of formal ways of resolving
                currency, but i'm using a pure function to brag */}
            <td className="cell" align="right">{ formatCurrency(row.productionBudget) }</td>
            <td className="cell" align="right">{ formatCurrency(row.worldwideBoxOffice) }</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
