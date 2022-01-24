import React from 'react'
import { useSelector } from 'react-redux'

const Table = () => {
  const { productList, totalNutrients } = useSelector((s) => s.products)

  const totalWeightPerElement = (elementWeight = 0, weight = 0) => {
    return +(elementWeight * (weight / 100)).toFixed(2)
  }

  const nutrientsPer100grams = (total = 0, weight = 0) => {
    const multi = weight / 100
    if (multi < 1) {
      return 0
    }
    return +(total / multi).toFixed(2)
  }

  return (
    <div className="overflow-hidden shadow rounded-lg m-2">
      <table className="min-w-full">
        <thead>
          <tr className="bg-blue-200">
            <th className="py-1">Name</th>
            <th>Calories</th>
            <th>Proteins</th>
            <th>Fats</th>
            <th>Carbo</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((element, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={`${element._id}${index}`} className="even:bg-blue-100 text-center">
                <td className="py-1">{element?.name}</td>
                <td>{totalWeightPerElement(element?.calories, element?.weight)}</td>
                <td>{totalWeightPerElement(element?.protein, element?.weight)}</td>
                <td>{totalWeightPerElement(element?.fat, element?.weight)}</td>
                <td>{totalWeightPerElement(element?.carbohydrate, element?.weight)}</td>
                <td>{element?.weight} g.</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="text-center border-t">
            <td className="font-bold py-1 max-w-xs">Total:</td>
            <td>{totalNutrients.calories}</td>
            <td>{totalNutrients.protein}</td>
            <td>{totalNutrients.fat}</td>
            <td>{totalNutrients.carbohydrate}</td>
            <td>{totalNutrients.weight} g.</td>
          </tr>
          <tr className="text-center border-t">
            <td className="font-bold py-1 max-w-xs">Per 100 grams:</td>
            <td>{nutrientsPer100grams(totalNutrients.calories, totalNutrients.weight)}</td>
            <td>{nutrientsPer100grams(totalNutrients.protein, totalNutrients.weight)}</td>
            <td>{nutrientsPer100grams(totalNutrients.fat, totalNutrients.weight)}</td>
            <td>{nutrientsPer100grams(totalNutrients.carbohydrate, totalNutrients.weight)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table
