import React from 'react'

const Table = ({ list }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Carbohydrate</th>
          <th>Weight</th>
        </tr>
        {list.map((elem) => {
          return (
            <tr key={elem._id}>
              <td>{elem?.name}</td>
              <td>{elem?.calories}</td>
              <td>{elem?.fat}</td>
              <td>{elem?.carbohydrate}</td>
              <td>{elem?.protein}</td>
              <td>{elem?.weight}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
