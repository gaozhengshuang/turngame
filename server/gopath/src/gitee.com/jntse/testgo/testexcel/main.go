
package main

import (
	"fmt"
	"math"
	"github.com/tealeg/xlsx"
)

func main() {
	var file  *xlsx.File
	var sheet *xlsx.Sheet
	var row   *xlsx.Row
	var cell  *xlsx.Cell
	var err	error

	file = xlsx.NewFile()
	sheet, err = file.AddSheet("Sheet1")
	if err != nil {
		fmt.Printf(err.Error())
	}
	row = sheet.AddRow()
	cell = row.AddCell()
	cell.Value = "id"
	cell = row.AddCell()
	cell.Value = "name"
	cell = row.AddCell()
	cell.Value = "uuid"
	cell = row.AddCell()
	cell.Value = "rate"

	row = sheet.AddRow()
	cell = row.AddCell()
	cell.SetInt(1)
	cell = row.AddCell()
	cell.SetString("jntse")
	cell = row.AddCell()
	cell.SetInt64(math.MaxInt64)
	cell = row.AddCell()
	cell.SetFloat(math.Pi)


	err = file.Save("MyXLSXFile.xlsx")
	if err != nil {
		fmt.Printf(err.Error())
	}
} 


