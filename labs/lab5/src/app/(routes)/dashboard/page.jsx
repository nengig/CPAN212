'use client'
import { React, useState, useEffect } from "react"
import { UserButton, useUser } from "@clerk/nextjs"
import CardInfo from "./_components/CardInfo"
import { db } from "../../../../utils/dbConfig"
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard"
import ExpenseListTable from "./expenses/_components/ExpenseListTable"
import BudgetItem from "./budgets/_components/BudgetItem"
function Dashboard() {
    const { user } = useUser()
    const [budgetList, setBudgetList] = useState([])
    const [incomeList, setIncomeList] = useState([])
    const [expenseList, setExpenseList] = useState([])

    useEffect(() => {
        user && getBudgetList()
    }, [user])

    const getBudgetList = async () => {
        const result = await db
            .select({
                ...getTableColumns(Budgets),

                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${Expenses.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));
        setBudgetList(result);
        getAllExpenses();
        getIncomeList();
    }
    const getAllExpenses = async () => {
        const result = await db
            .select({
                id: Expenses.id,
                name: Expenses.name,
                amount: Expenses.amount,
                createdAt: Expenses.createdAt,
            })
            .from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(Expenses.id));
        setExpenseList(result);
    };
    const getIncomeList = async () => {
        try {
            const result = await db
                .select({
                    ...getTableColumns(Incomes),
                    totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
                        Number
                    ),
                })
                .from(Incomes)
                .groupBy(Incomes.id); // Assuming you want to group by ID or any other relevant column

            setIncomeList(result);
        } catch (error) {
            console.error("Error fetching income list:", error);
        }
    };
    return (
        <div className='p-8'>
            <h2 className="font-bold text-4xl">Hi, {user?.fullName} </h2>
            <p className="text-gray-500">Here is what is happening with your money. Lets manage your expense</p>
            <CardInfo budgetList={budgetList} incomeList={incomeList} />
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
                <div className="lg:col-span-2">
                    <BarChartDashboard budgetList={budgetList} />

                    <ExpenseListTable
                        expensesList={expenseList}
                        refreshData={() => getBudgetList()}
                    />
                </div>
                <div className="grid gap-5">
                    <h2 className="font-bold text-lg">Latest Budgets</h2>
                    {budgetList?.length > 0 ?
                        (
                            budgetList.map((budget, index) => (
                                <BudgetItem budget={budget} key={index} />
                            ))
                        ) : (
                            [1, 2, 3, 4].map((items, index) => (
                                <div  key={index} className="h-[180px] w-full bg-slate-200 lg amimate-pulse" ></div>
                            ))
                        )}
                </div>
            </div>
        </div>
    )
}
export default Dashboard