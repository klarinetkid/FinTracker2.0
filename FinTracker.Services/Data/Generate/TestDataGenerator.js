
/*
    This is a shitty little script to generate some demo data, one month at a time.
    This data can also be used for a demo.
*/
const fs = require('fs')


const year = 2022
const month = 1
const monthCount = 38

const categories = [
    {
        categoryId: null,
        count: () => 3,
        amount: () => getRandomNum(100, 1000) / -100,
        memo: () => "Unknown transaction"
    },
    {
        categoryId: 1,
        count: () => 2,
        amount: () => 1482.64,
        memo: () => "Payroll Deposit"
    },
    {
        categoryId: 8,
        count: () => 1,
        amount: () => getRandomNum(300, 650) / 100,
        memo: () => "Interest deposited"
    },
    {
        categoryId: 2,
        count: () => 1,
        amount: () => -1300,
        memo: () => "Rent payment"
    },
    {
        categoryId: 3,
        count: () => getRandomNum(5, 9),
        amount: () => getRandomNum(4000, 7000) / -100,
        memo: () => getRandomElement(["Interact Purchase: Superstore", "Interact Purchase: Safeway"])
    },
    {
        categoryId: 4,
        count: () => getRandomNum(5, 10),
        amount: () => getRandomNum(1200, 2400) / -100,
        memo: () => getRandomElement(["The Codfather Fish & Chips", "The Galactic Donut", "Unicorn Udon Noodle House", "Bacon Me Crazy Diner"])
    },
    {
        categoryId: 5,
        count: () => getRandomNum(3, 6),
        amount: () => getRandomNum(1200, 3000) / -100,
        memo: () => getRandomElement(["Netflix", "Disney Plus"])
    },
    {
        categoryId: 6,
        count: () => getRandomNum(3, 6),
        amount: () => getRandomNum(1200, 3000) / -100,
        memo: () => getRandomElement(["Uber", "STM Bus Fare"])
    },
    {
        categoryId: 7,
        count: () => getRandomNum(1, 3),
        amount: () => getRandomNum(3000, 5000) / -100,
        memo: () => getRandomElement(["Thread Zeppelin", "Pants Labyrinth", "The Wacky Wardrobe Wonderland"])
    },
    {
        categoryId: 9,
        count: () => getRandomNum(4, 6),
        amount: () => getRandomNum(1250, 3200) / -100,
        memo: () => getRandomElement(["Diese Onze", "Upstairs Jazz Bar and Grill"])
    },
    {
        categoryId: 10,
        count: () => getRandomNum(0, 2),
        amount: () => getRandomNum(2000, 4500) / -100,
        memo: () => getRandomElement(["Bed Bath & Beyond", "Linen Chest"])
    },
    {
        categoryId: 11,
        count: () => getRandomElement([0, 0, 1]),
        amount: () => getRandomNum(20000, 30000) / -100,
        memo: () => getRandomElement(["Best Buy", "Canada Computers"])
    },
    {
        categoryId: 12,
        count: () => getRandomNum(0, 3),
        amount: () => getRandomNum(500, 1500) / -100,
        memo: () => getRandomElement(["Jean Coutu", "Pharmaprix"])
    },
]


// export single month
// const transactions = generateMonthTransactions(year, month)
// writeTransactionsToCsv(transactions, `results\\${year}-${pad(month)}.csv`)
// writeTransactionsToSql(transactions, `results\\${year}-${pad(month)}.sql`)

const transactions = []
for (let i = 0;i < monthCount;i ++) {
    const y = year + Math.floor(i / 12)
    const m = month + (i % 12)
    transactions.push(...generateMonthTransactions(y, m))
}
writeTransactionsToCsv(transactions, `results\\${year}-${pad(month)}-${monthCount}.csv`)
writeTransactionsToSql(transactions, `results\\${year}-${pad(month)}-${monthCount}.sql`)
console.info("success")




function getRandomElement(items) {
    return items[Math.floor(Math.random()*items.length)]
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomDate(year, month) {
    return `${year}-${pad(month)}-${pad(getRandomNum(1, 28))}`
}

function generateMonthTransactions(year, month) {
    const output = []
    for (const category of categories) {
        const count = category.count()
        for (let i = 0;i < count;i++) {
            output.push({
                categoryId: category.categoryId,
                amount: category.amount(),
                date: getRandomDate(year, month),
                memo: category.memo()
            })
        }
    }
    return output
}

function pad(value) {
    return value.toString().padStart(2, '0')
}

function writeTransactionsToCsv(output, fileName) {
    const csvLines = output.map(t => [t.date, t.memo, t.amount])
    const csvOutput = [["Date,Memo,Amount"], ...csvLines].join("\n")
    fs.writeFileSync(fileName, csvOutput)
}

function writeTransactionsToSql(output, fileName) {
    const sqlOutput = output.map(t => 
        `insert into dbo.TblTransaction (Date, Memo, Amount, CategoryId) values ('${t.date}', '${t.memo}', ${Math.floor(t.amount * 100)}, ${t.categoryId});`).join("\n")
    fs.writeFileSync(fileName, sqlOutput)
}