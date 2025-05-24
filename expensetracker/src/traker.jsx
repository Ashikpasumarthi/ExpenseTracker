import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactModal from 'react-modal';
import Charts from "./charts.jsx";
// import { AiOutlineEdit } from "react-icons/ai";
// import { AiOutlineCloseCircle } from "react-icons/ai";
import BarChart from "./horizontalCharts.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Tracker() {

    const [amount, setAmount] = useState({ balance: localStorage.getItem('balance') ? Number(localStorage.getItem('balance')) : 0, expenses: localStorage.getItem('expenses') ? Number(localStorage.getItem('expenses')) : 0 });
    const [balanceModal, setBalanceModal] = useState(false);
    const [addBalance, setAddBalance] = useState('');
    const [expenseModal, setExpenseModal] = useState(false);
    const [expense, setExpense] = useState({ title: '', price: '', category: '', date: "" });
    const [expenseList, setExpenseList] = useState(() => {
        const storedList = localStorage.getItem('expenseList');
        return storedList ? JSON.parse(storedList) : [];
    });
    const [chartList, setChartList] = useState(() => {
        const storedChartList = localStorage.getItem('chartList');
        return storedChartList ? JSON.parse(storedChartList) : [];
    });

    const [editIndex, setEditIndex] = useState(null)
    console.log(setAmount)
    useEffect(() => {
        localStorage.setItem('balance', amount.balance);
        localStorage.setItem('expenses', amount.expenses);
    }, [amount]);
    // const [chartsData, setChartsData] = useState(()=>{
    //     const charts = localStorage.getItem('chartsData');
    //     return charts ? JSON.parse(charts) : [];
    // });


    function handleAddBalance() {
        setAmount({ ...amount, balance: amount.balance + Number(addBalance) });
        setBalanceModal(false);
    }

    function handleExpense() {
        const price = Number(expense.price);
        if (!price || price <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        if (!expense.title || !expense.category || !expense.date) {
            alert("Please fill in all fields.");
            return;
        }



        if (editIndex !== null) {
            const prevPrice = Number(expenseList[editIndex].price);
            const updatedList = [...expenseList];
            updatedList[editIndex] = expense;

            setExpenseList(updatedList);

            setAmount(prev => ({
                ...prev,
                balance: prev.balance + prevPrice - price,
                expenses: prev.expenses - prevPrice + price
            }));
        } else {
            setExpenseList(prev => [...prev, expense]);

            setAmount(prev => ({
                ...prev,
                balance: prev.balance - price,
                expenses: prev.expenses + price
            }));
        }

        setChartList(prev => {

            const index = prev.findIndex((item) => item.category === expense.category);
            if (index > -1) {
                let updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    price: Number(updated[index].price) + Number(expense.price),
                }
                return updated
            }
            else {
                return [...prev, { category: expense.category, price: expense.price }];
            }

        })
        // Clear form and close modal
        setExpense({ title: '', price: '', category: '', date: '' });
        setEditIndex(null);
        setExpenseModal(false);
    }


    function handleDelete(indexToRemove) {
        console.log("here it is", indexToRemove)
        const updatedList = expenseList.filter((_, index) => index !== indexToRemove);
        setExpenseList(updatedList);
        const removedExpense = expenseList[indexToRemove];
        const removedPrice = Number(removedExpense.price);
        setAmount(prev => ({
            ...prev,
            balance: prev.balance + removedPrice,
            expenses: prev.expenses - removedPrice
        }));

        setChartList(prev => {

            const index = prev.findIndex((item, index) => removedExpense.category === item.category);
            if (indexToRemove > -1) {
                let updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    price: Number(updated[index].price) - Number(removedExpense.price),
                }
                return updated
            }
            else {
                return [...prev, { category: expense.category, price: expense.price }];
            }

        })
    }

    function handleEdit(index) {
        let selectedExpense = expenseList[index];
        setExpense({
            title: selectedExpense.title,
            price: selectedExpense.price,
            category: selectedExpense.category,
            date: selectedExpense.date
        });
        setEditIndex(index);
        setExpenseModal(true);

    }

    useEffect(() => {
        localStorage.setItem('expenseList', JSON.stringify(expenseList));
    }, [expenseList]);

    useEffect(() => {
        localStorage.setItem('chartList', JSON.stringify(chartList));
    }, [chartList]);

    // useEffect(() => {
    //     const storedExpenses = localStorage.getItem('expenseList');
    //     if (storedExpenses) {
    //         setExpenseList(JSON.parse(storedExpenses));
    //     }
    // }, [expenseList]);
    console.log("Expenses :", expenseList)
    return (
        <>
            <div><h2 style={{
                color: "white", position: "relative",
                left: "2rem"
            }}>Expense Tracker</h2></div>
            <div className='expenseTracker'>
                <div className='tracker'>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: 'white' }}><h2>Wallet Balance :  <span style={{ color: "#89E148" }}>₹ {amount.balance}</span></h2></span>
                        <button style={{
                            backgroundColor: "rgb(137, 225, 72)",
                            width: "8rem",
                            height: "2rem",
                            position: "relative",
                            left: "4rem",
                            border: "none",
                            borderRadius: "1rem",
                            color: "white",
                            fontWeight: "700"
                        }} onClick={() => setBalanceModal(true)}>+ Add Income</button>
                    </div>
                    <ReactModal
                        isOpen={balanceModal} // This tells ReactModal whether it should be visible or not.So if balanceModal is true, the modal opens; if false, it stays hidden.
                        onRequestClose={() => setBalanceModal(false)} //This defines what happens when the user tries to close the modal.Here, it sets balanceModal to false, i.e., closes the modal.
                        shouldCloseOnOverlayClick={true}
                        style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                // backgroundImage: "linear-gradient(90deg, #FF9595 10%, #FF4747 35%, #FF3838 100%)",
                                backgroundColor: '#EFEFEFD9',
                                color: 'black',
                                padding: '30px',
                                borderRadius: '16px',
                                border: 'none',
                                width: '400px',
                                textAlign: 'center',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            },
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            }
                        }}
                    >
                        <h3 style={{ marginBottom: '20px' }}>Add Balance</h3>
                        {/* <p style={{ marginBottom: '20px' }}>Add Balance</p> */}
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                            <input className="balanceInput" type='text' value={addBalance} onChange={(e) => setAddBalance(e.target.value)} placeholder='Income Amount' />
                            <button
                                onClick={handleAddBalance}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    backgroundColor: '#F4BB4A',
                                    color: 'white',
                                    border: 'none',
                                }}
                            >
                                Add Balance
                            </button>
                            <button
                                onClick={() => setBalanceModal(false)}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    backgroundColor: '#E3E3E3',
                                    color: 'black',
                                    border: 'none',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </ReactModal>
                </div>
                <div className='tracker'>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: 'white' }}><h2>Expense :  <span style={{ color: "#F4BB4A" }}>₹ {amount.expenses}</span></h2></span>
                        <button style={{
                            // backgroundolor: #00DBDE;
                            backgroundImage: "linear-gradient(90deg, #FF9595 10%, #FF4747 35%, #FF3838 100%)",
                            width: "8rem",
                            height: "2rem",
                            position: "relative",
                            left: "0.7rem",
                            border: "none",
                            borderRadius: "1rem",
                            color: "white",
                            fontWeight: "700"
                        }} onClick={() => setExpenseModal(true)}>+ Add Expense</button>
                    </div>

                    <ReactModal
                        isOpen={expenseModal} // This tells ReactModal whether it should be visible or not.So if balanceModal is true, the modal opens; if false, it stays hidden.
                        onRequestClose={() => setExpenseModal(false)} //This defines what happens when the user tries to close the modal.Here, it sets balanceModal to false, i.e., closes the modal.
                        shouldCloseOnOverlayClick={true}
                        style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                // backgroundImage: "linear-gradient(90deg, #FF9595 10%, #FF4747 35%, #FF3838 100%)",
                                backgroundColor: '#EFEFEFD9',
                                color: 'black',
                                padding: '30px',
                                borderRadius: '16px',
                                border: 'none',
                                width: '400px',
                                textAlign: 'center',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            },
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            }
                        }}
                    >
                        <h3 style={{ marginBottom: '20px' }}>Add expenses</h3>
                        {/* <p style={{ marginBottom: '20px' }}>Add Balance</p> */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className='expenseInnerDiv'>
                                <input

                                    type='text'
                                    value={expense.title}
                                    onChange={(e) => setExpense({ ...expense, title: e.target.value })}
                                    placeholder='Expense Title'
                                />

                                <input
                                    type='number'
                                    value={expense.price}
                                    onChange={(e) => setExpense({ ...expense, price: e.target.value })}
                                    placeholder='Amount'
                                />

                                <select
                                    value={expense.category}
                                    onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                                    style={{ border: "none", borderRadius: '0.7rem' }}
                                    placeholder="Select an option from below"
                                >
                                    <option value="" disabled>Make a selection...</option>
                                    <option value="Food">Food</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Travel">Travel</option>

                                </select>

                                <input
                                    type="date"
                                    value={expense.date}
                                    onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                                />
                                <button
                                    onClick={handleExpense}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        backgroundColor: '#F4BB4A',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Add expenses
                                </button>
                                <button
                                    onClick={() => setExpenseModal(false)}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        backgroundColor: '#E3E3E3',
                                        color: 'black',
                                        border: 'none',
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </ReactModal>

                </div >
                <div className='charts'>
                    <Charts chartList={chartList} />
                </div>
            </div >
            <div className='headings'>


            </div>


            <div className='transactionsTab'>

                <div className='transactionTabDiv1'>
                    <h2 className='transactionHeader' style={{
                        width: 'fit-content',
                        position: 'relative',
                        left: '0rem', color: "white"
                    }}>Recent Transactions</h2>
                    <div className='transaction'>
                        {
                            expenseList.length === 0 ? (
                                <div style={{ backgroundColor: "white", padding: "1rem" }}>
                                    <div>No Transactions</div>
                                </div>
                            ) : (
                                expenseList.map((item, index) => (
                                    <>
                                        <div id={index} className='transactionHistory' >
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div>{item.title}</div>
                                                <div>{item.date}</div>

                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                                                <div style={{ fontWeight: "bold", color: '#F4BB4A', }}>₹ {item.price}</div>
                                                <div className='iconDelete' onClick={(e) => handleDelete(index)}><FontAwesomeIcon icon={faXmark} /></div>
                                                <div className='iconEdit'><FontAwesomeIcon icon={faPen} onClick={() => handleEdit(index)} style={{ cursor: "pointer" }} /></div>
                                            </div>
                                        </div>
                                        <div className="borderMap" ></div>
                                    </>
                                ))
                            )
                        }
                    </div>
                </div>



                <div className='topExpenses' >
                    <div className='topExpenseHeader'>Top Expenses</div>

                    <div style={{ width: '100%', height: '300px', background: 'white', borderRadius: '1rem' }} className='chartWrapper'>
                        {chartList.length > 0 && <BarChart chartList={chartList} />}
                    </div>
                </div>




            </div >

        </>
    )
}
