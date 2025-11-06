import { useEffect, useState } from "react";
function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    // const[description, setDescription] = useState('');
    // const [amount, setAmount] = useState('')
    async function call_data() {
        const res = await fetch('http://localhost:8000/Display_Expense')
        const data = await res.json();

        if (res.ok){
            setExpenses(data)
        }else
        
    }
    useEffect(() => {
        call_data()
    }, [])
    return(
        <div>
            <h2>My Expenses</h2>
            {expenses?.map(expense => (
                <div key={expense.id}>
                    <p>{expense.description}</p>
                    <p>{expense.amount}</p>
                </div>
            ))}
        </div>
    )
}
export default Dashboard;