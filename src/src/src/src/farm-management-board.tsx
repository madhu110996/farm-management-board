import { useState } from 'react'
import { Button } from "@shadcn/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shadcn/ui/card"
import { Input } from "@shadcn/ui/input"
import { Label } from "@shadcn/ui/label"
import { RadioGroup, RadioGroupItem } from "@shadcn/ui/radio-group"
import { Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/ui/select"
import { format, getDaysInMonth } from 'date-fns'

export default function FarmManagementBoard() {
  const [items, setItems] = useState<{
    category: string,
    subcategory: string,
    plantType?: string,
    labor?: { name: string, month: string, year: string, attendance: { [key: string]: boolean } },
    irrigation?: { timeOfWaterApply: string, nextDueToWater: string },
    manure?: { typeOfManure: string, dateOfApplication: string, description: string, nextDueToApplyManure: string },
    expense?: { amount: string, description: string }
  }[]>([])

  const [category, setCategory] = useState('Expense')
  const [subcategory, setSubcategory] = useState('Irrigation Expenses')
  const [plantType, setPlantType] = useState('')
  const [laborName, setLaborName] = useState('')
  const [laborMonth, setLaborMonth] = useState(format(new Date(), 'MM'))
  const [laborYear, setLaborYear] = useState(format(new Date(), 'yyyy'))
  const [laborAttendance, setLaborAttendance] = useState<{ [key: string]: boolean }>({})
  const [timeOfWaterApply, setTimeOfWaterApply] = useState('')
  const [nextDueToWater, setNextDueToWater] = useState('')
  const [typeOfManure, setTypeOfManure] = useState('')
  const [dateOfApplication, setDateOfApplication] = useState('')
  const [manureDescription, setManureDescription] = useState('')
  const [manureNextDueToApplyManure, setManureNextDueToApplyManure] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseDescription, setExpenseDescription] = useState('')

  const daysInMonth = getDaysInMonth(new Date(parseInt(laborYear), parseInt(laborMonth) - 1))

  const addItem = () => {
    if (category === 'Expense') {
      setItems([...items, { category, subcategory, expense: { amount: expenseAmount, description: expenseDescription } }])
    } else if (category === 'Labor') {
      setItems([...items, { category, subcategory, labor: { name: laborName, month: laborMonth, year: laborYear, attendance: laborAttendance } }])
    } else if (category === 'Irrigation') {
      setItems([...items, { category, subcategory, irrigation: { timeOfWaterApply, nextDueToWater } }])
    } else if (category === 'Manure') {
      setItems([...items, { category, subcategory, manure: { typeOfManure, dateOfApplication, description: manureDescription, nextDueToApplyManure: manureNextDueToApplyManure } }])
    }
    resetForm()
  }

  const deleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const resetForm = () => {
    setPlantType('')
    setLaborName('')
    setLaborMonth(format(new Date(), 'MM'))
    setLaborYear(format(new Date(), 'yyyy'))
    setLaborAttendance({})
    setTimeOfWaterApply('')
    setNextDueToWater('')
    setTypeOfManure('')
    setDateOfApplication('')
    setManureDescription('')
    setManureNextDueToApplyManure('')
    setExpenseAmount('')
    setExpenseDescription('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">FARM MANAGEMENT BOARD</h1>
      </div>

      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg mb-8">
        <Card className="bg-blue-50">
          <CardContent>
            <div className="mt-4">
              <Label>Category</Label>
              <RadioGroup value={category} onValueChange={setCategory} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Expense" id="expense" />
                  <Label htmlFor="expense">Expense</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Labor" id="labor" />
                  <Label htmlFor="labor">Labor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Irrigation" id="irrigation" />
                  <Label htmlFor="irrigation">Irrigation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Manure" id="manure" />
                  <Label htmlFor="manure">Manure</Label>
                </div>
              </RadioGroup>
            </div>
            {category === 'Expense' && (
              <div className="mt-4">
                <Label>Subcategory</Label>
                <RadioGroup value={subcategory} onValueChange={setSubcategory} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Irrigation Expenses" id="irrigation-expenses" />
                    <Label htmlFor="irrigation-expenses">Irrigation Expenses</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Manures Expenses" id="manures-expenses" />
                    <Label htmlFor="manures-expenses">Manures Expenses</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other Expenses" id="other-expenses" />
                    <Label htmlFor="other-expenses">Other Expenses</Label>
                  </div>
                </RadioGroup>
                <div className="mt-4">
                  <Label htmlFor="expenseAmount">Amount</Label>
                  <Input id="expenseAmount" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} className="mt-2" />
                </div>
                <div className="mt-4">
                  <Label htmlFor="expenseDescription">Description</Label>
                  <Input id="expenseDescription" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} className="mt-2" />
                </div>
              </div>
            )}
            {category === 'Labor' && (
              <div className="mt-4">
                <Label htmlFor="laborName">Labor Name</Label>
                <Input id="laborName" value={laborName} onChange={(e) => setLaborName(e.target.value)} className="mt-2" />
                <div className="mt-4">
                  <Label>Month</Label>
                  <Select value={laborMonth} onValueChange={setLaborMonth} className="mt-2">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {format(new Date(2023, i), 'MMMM')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4">
                  <Label>Year</Label>
                  <Select value={laborYear} onValueChange={setLaborYear} className="mt-2">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={2023 + i} value={String(2023 + i)}>
                          {2023 + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4">
                  <Label>Attendance</Label>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mt-2">
                    {Array.from({ length: daysInMonth }, (_, i) => (
                      <div key={i + 1} className="flex items-center space-x-2">
                        <Label htmlFor={`day-${i + 1}`}>{i + 1}</Label>
                        <input
                          id={`day-${i + 1}`}
                          type="checkbox"
                          checked={laborAttendance[i + 1] || false}
                          onChange={(e) => setLaborAttendance({ ...laborAttendance, [i + 1]: e.target.checked })}
                          className="mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {category === 'Irrigation' && (
              <div className="mt-4">
                <Label htmlFor="plantType">Plant Type</Label>
                <Input id="plantType" value={plantType} onChange={(e) => setPlantType(e.target.value)} className="mt-2" />
                <div className="mt-4">
                  <Label htmlFor="timeOfWaterApply">Time of Water Apply</Label>
                  <Input id="timeOfWaterApply" type="datetime-local" value={timeOfWaterApply} onChange={(e) => setTimeOfWaterApply(e.target.value)} className="mt-2" />
                </div>
                <div className="mt-4">
                  <Label htmlFor="nextDueToWater">Next Due to Water</Label>
                  <Input id="nextDueToWater" type="datetime-local" value={nextDueToWater} onChange={(e) => setNextDueToWater(e.target.value)} className="mt-2" />
                </div>
              </div>
            )}
            {category === 'Manure' && (
              <div className="mt-4">
                <Label htmlFor="plantType">Plant Type</Label>
                <Input id="plantType" value={plantType} onChange={(e) => setPlantType(e.target.value)} className="mt-2" />
                <div className="mt-4">
                  <Label htmlFor="typeOfManure">Type of Manure</Label>
                  <Input id="typeOfManure" value={typeOfManure} onChange={(e) => setTypeOfManure(e.target.value)} className="mt-2" />
                </div>
                <div className="mt-4">
                  <Label htmlFor="dateOfApplication">Date of Application</Label>
                  <Input id="dateOfApplication" type="datetime-local" value={dateOfApplication} onChange={(e) => setDateOfApplication(e.target.value)} className="mt-2" />
                </div>
                <div className="mt-4">
                  <Label htmlFor="manureDescription">Description</Label>
                  <Input id="manureDescription" value={manureDescription} onChange={(e) => setManureDescription(e.target.value)} className="mt-2" />
                </div>
                <div className="mt-4">
                  <Label htmlFor="manureNextDueToApplyManure">Next Due to Apply Manure</Label>
                  <Input id="manureNextDueToApplyManure" type="datetime-local" value={manureNextDueToApplyManure} onChange={(e) => setManureNextDueToApplyManure(e.target.value)} className="mt-2" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={addItem} className="bg-blue-600 hover:bg-blue-700">Add Item</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Irrigation Expenses', 'Manures Expenses', 'Other Expenses', 'Labor', 'Irrigation', 'Manure'].map((cat) => (
            <Card key={cat} className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-800">{cat}</CardTitle>
              </CardHeader>
              <CardContent>
                {items.filter(item => item.subcategory === cat).map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center p-2 border-b last:border-b-0">
                      <div>
                        {cat === 'Irrigation Expenses' && (
                          <div>
                            <p className="text-sm text-gray-600">Amount: {item.expense?.amount}</p>
                            <p className="text-sm text-gray-600">Description: {item.expense?.description}</p>
                          </div>
                        )}
                        {cat === 'Manures Expenses' && (
                          <div>
                            <p className="text-sm text-gray-600">Amount: {item.expense?.amount}</p>
                            <p className="text-sm text-gray-600">Description: {item.expense?.description}</p>
                          </div>
                        )}
                        {cat === 'Other Expenses' && (
                          <div>
                            <p className="text-sm text-gray-600">Amount: {item.expense?.amount}</p>
                            <p className="text-sm text-gray-600">Description: {item.expense?.description}</p>
                          </div>
                        )}
                        {cat === 'Labor' && (
                          <div>
                            <p className="text-sm text-gray-600">Labor Name: {item.labor?.name}</p>
                            <p className="text-sm text-gray-600">Month: {format(new Date(parseInt(item.labor?.year || '2023'), parseInt(item.labor?.month || '01') - 1), 'MMMM yyyy')}</p>
                            <div className="mt-2">
                              {Object.keys(item.labor?.attendance || {}).map(day => (
                                <div key={day} className="flex items-center space-x-2">
                                  <p className="text-sm text-gray-600">Day {day}: {item.labor?.attendance[day] ? 'Present' : 'Absent'}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {cat === 'Irrigation' && (
                          <div>
                            <p className="text-sm text-gray-600">Plant Type: {item.plantType}</p>
                            <p className="text-sm text-gray-600">Time of Water Apply: {item.irrigation?.timeOfWaterApply ? format(new Date(item.irrigation.timeOfWaterApply), 'yyyy-MM-dd HH:mm') : ''}</p>
                            <p className="text-sm text-gray-600">Next Due to Water: {item.irrigation?.nextDueToWater ? format(new Date(item.irrigation.nextDueToWater), 'yyyy-MM-dd HH:mm') : ''}</p>
                            <p className="text-sm text-red-500">Next Application: {item.irrigation?.nextDueToWater ? format(new Date(item.irrigation.nextDueToWater), 'yyyy-MM-dd HH:mm') : ''}</p>
                          </div>
                        )}
                        {cat === 'Manure' && (
                          <div>
                            <p className="text-sm text-gray-600">Plant Type: {item.plantType}</p>
                            <p className="text-sm text-gray-600">Type of Manure: {item.manure?.typeOfManure}</p>
                            <p className="text-sm text-gray-600">Date of Application: {item.manure?.dateOfApplication ? format(new Date(item.manure.dateOfApplication), 'yyyy-MM-dd HH:mm') : ''}</p>
                            <p className="text-sm text-gray-600">Description: {item.manure?.description}</p>
                            <p className="text-sm text-red-500">Next Due to Apply Manure: {item.manure?.nextDueToApplyManure ? format(new Date(item.manure.nextDueToApplyManure), 'yyyy-MM-dd HH:mm') : ''}</p>
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" onClick={() => deleteItem(index)} className="text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
