import { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin:10px;
font-family:Montserrat;
width:100%;
`;
const BalanceBox = styled.div`
font-size:18px;
width:100%;
font-weight:bold;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`;

const AddTransaction = styled.div`
background:black;
color:white;
padding:5px 10px;
border-radius:4px;
text-align:center;
cursor:pointer;
font-weight:bold;
font-size:15px;
`;
const AddTransactionContainer = styled.div`
 display:flex;
 flex-direction:column;
 border:1px solid #e6e8e9;
 gap:10px;
 width:100%;
 padding:15px 20px;
 margin:20px;
 &input{
  outline:none;
  padding:10px 12px;
  border-radius:4px;
  border:1px solid #e6e8e9;
 }
`;
const RadioBox = styled.div`
display:flex;
flex-direction:row;
width:100%;
align-items:center;
&input{
width:unset;
margin:0 10px;
}

`;

const AddTransactionView = (props) => {
    const [amount, setAmount] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState("EXPENSE");

    const addTransaction = () => {
        const transaction = {
            amount: Number(amount),
            desc,
            type,
            id: Date.now()
        };//Transaction object
        props.addTransaction(transaction);
        console.log(transaction);
        props.toggleAddTxn()
    }

    return (<AddTransactionContainer>
        <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}></input>
        <RadioBox>
            <input type="radio" id="expense" name="type" value='EXPENSE' checked={type === "EXPENSE"} onChange={(e) => setType(e.target.value)} />
            <label htmlFor="expense">Expense</label>
            <input type="radio" id="income" name="type" value='INCOME' checked={type === "INCOME"} onChange={(e) => setType(e.target.value)} />
            <label htmlFor="income">Income</label>
        </RadioBox>
        <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
    </AddTransactionContainer>)
}

const ExpenseContainer = styled.div`
display:flex;
flex-direction:row;
gap:12px;
margin:20px;

`;
const ExpenseBox = styled.div`
display:flex;
flex-direction:column;
border-radius:4px;
border:1px solid #e6e8e9;
padding:15px 20px;
width:135px;
font-size:14px;

& span{
font-weight:bold;
font-size:20px;
color:${(props) => (props.isIncome ? "green" : "red")};
}

`;
const OverviewComponent = (props) => {
    const [isAddTxnVisible, toggleAddTxn] = useState(false);
    return (
        <Container>
            <BalanceBox>
                Balance:${props.income - props.expense}
                <AddTransaction onClick={() => toggleAddTxn(!isAddTxnVisible)}>
                    {isAddTxnVisible ? "Cancel" : "ADD"}
                </AddTransaction>
            </BalanceBox>
            {isAddTxnVisible && <AddTransactionView toggleAddTxn={toggleAddTxn} addTransaction={props.addTransaction} />}

            <ExpenseContainer>
                <ExpenseBox isIncome={false}>
                    Expense<span>${props.expense}</span>
                </ExpenseBox>
                <ExpenseBox isIncome={true}>
                    Income<span>${props.income}</span>
                </ExpenseBox>
            </ExpenseContainer>
        </Container>

    )
}
export default OverviewComponent

/*
1)isAddTxnVisible is the state variable, and toggleAddTxn is the function to update isAddTxnVisible. The initial state is false.
2){isAddTxnVisible && <AddTransactionView />}->If the expression on the left side of the && operator is true, the entire expression evaluates to the value of the expression on the right.
3)During the re-render, the value attribute of the input element is set to the updated desc state.
4)The user types "Grocery Shopping" in the input field.
The onChange event is triggered multiple times, once for each character typed.
When the user types "G", e.target.value is "G".
setDesk("G") is called, updating desc to "G".
React re-renders the component, setting value to "G".
5)Props->->allow AddTransactionView to access the toggleAddTxn function from its parent (OverviewComponent), enabling it to update the parent's state (isAddTxnVisible).
 Props enable communication between components. In this case, the child component (AddTransactionView) can notify the parent component (OverviewComponent) to change its state.
 Props in React are used to pass data from one component to another, usually from a parent component to a child component.
 --The parent component holds the data (state) and passes it to the child component via props.
It can also pass functions that the child component can call to update the parent’s state.

*/