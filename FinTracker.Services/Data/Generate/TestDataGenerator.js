
/*
    This is a shitty little script to generate some demo data, one month at a time.
    This data can also be used for a demo.
*/


const year = "2025"
const month = "01"

const transactionMemos = ["Superstore", "Restaurant", "Wicked Threads", "Bus fare", "Concert"]
const memoToCategoryId = {
    "Payroll": 1,
    "Rent payment": 2,
    "Superstore": 3,
    "Restaurant": 4,
    "Concert": 5,
    "Bus fare": 6,
    "Wicked Threads": 7,
}

// spending
const output = []
for (let i = 0; i < 30; i++) output.push([
    `${year}-${month}-${getRandomNum(1, 28).toString().padStart('0', 2)}`,
    getRandomElement(transactionMemos),
    -getRandomNum(4000, 7000) / 100
])

// add income, bills
output.push([`${year}-${month}-04`, "Payroll", 1500])
output.push([`${year}-${month}-18`, "Payroll", 1500])
output.push([`${year}-${month}-28`, "Rent payment", -1300])



const fs = require('fs')

// write csv output
const csvOutput = [["Date,Memo,Amount"], ...output].join("\n")
fs.writeFileSync(`results\\${year}-${month}.csv`, csvOutput)

// write sql output
const sqlOutput = output.map(t => `insert into dbo.TblTransaction (Date, Memo, Amount, CategoryId) values ('${t[0]}', '${t[1]}', ${Math.floor(t[2] * 100)}, ${memoToCategoryId[t[1]]});`).join("\n")
fs.writeFileSync(`results\\${year}-${month}.sql`, sqlOutput)


function getRandomElement(items) {
    return items[Math.floor(Math.random()*items.length)]
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}