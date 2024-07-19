//home mudule
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OverviewComponent from "./OverviewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const calculateBalance = () => {
        let exp = 0;
        let inc = 0;
        transactions.map((payload) =>
            payload.type === "EXPENSE"
                ? (exp = exp + payload.amount)
                : (inc = inc + payload.amount),
        );
        updateExpense(exp);
        updateIncome(inc);
    };
    useEffect(() => calculateBalance(), [transactions]);

    const addTransaction = (payload) => {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);
    };
    return (
        <Container>
            <OverviewComponent
                expense={expense}
                income={income}
                addTransaction={addTransaction}
            />
            {transactions?.length ? (
                <TransactionsComponent transactions={transactions} />
            ) : (
                ""
            )}
        </Container>
    );
};
export default HomeComponent;




/*
1)<TransactionComponent transaction={transaction}/> == in this state is passed from parent component to child component i.e Home Component to Transaction Component
2)transactionArray.push(payload);-->The new transaction (payload) is added to the transactionArray.
The addTransaction function in HomeComponent receives the new transaction object as payload.
It creates a copy of the current transaction state, adds the new transaction to the copy, and updates the state with the new transaction list.
The new transaction (payload) is added to the transactionArray.transactionArray.push(payload);
*/
