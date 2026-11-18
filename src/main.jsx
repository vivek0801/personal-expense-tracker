import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const initial = [
  { id: 1, title: 'Monthly stipend', amount: 12000, type: 'Income', category: 'Salary', date: '2026-11-01' },
  { id: 2, title: 'Groceries', amount: 1850, type: 'Expense', category: 'Food', date: '2026-11-03' },
  { id: 3, title: 'Bus pass', amount: 650, type: 'Expense', category: 'Travel', date: '2026-11-05' }
];
function App() {
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('transactions') || 'null') || initial);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ title: '', amount: '', type: 'Expense', category: 'Food', date: new Date().toISOString().slice(0, 10) });
  useEffect(() => localStorage.setItem('transactions', JSON.stringify(transactions)), [transactions]);
  const totals = useMemo(() => ({
    income: transactions.filter(t => t.type === 'Income').reduce((s, t) => s + Number(t.amount), 0),
    expense: transactions.filter(t => t.type === 'Expense').reduce((s, t) => s + Number(t.amount), 0)
  }), [transactions]);
  const visible = transactions.filter(t => filter === 'All' || t.type === filter);
  function addTransaction(e) {
    e.preventDefault();
    if (!form.title.trim() || Number(form.amount) <= 0) return;
    setTransactions([{ ...form, id: Date.now(), amount: Number(form.amount) }, ...transactions]);
    setForm({ ...form, title: '', amount: '' });
  }
  function removeTransaction(id) { setTransactions(transactions.filter(t => t.id !== id)); }
  return <main className="app">
    <header><div><p className="eyebrow">PERSONAL FINANCE</p><h1>Expense Tracker</h1><p className="muted">A simple view of where your money goes.</p></div><span className="avatar">₹</span></header>
    <section className="summary">
      <article className="balance"><p>Current balance</p><h2>₹{(totals.income - totals.expense).toLocaleString('en-IN')}</h2><small>Income minus expenses</small></article>
      <article><p>Total income</p><h2 className="green">₹{totals.income.toLocaleString('en-IN')}</h2><small>Money received</small></article>
      <article><p>Total expenses</p><h2 className="red">₹{totals.expense.toLocaleString('en-IN')}</h2><small>Money spent</small></article>
    </section>
    <section className="columns">
      <section className="panel"><h3>Add a transaction</h3><form onSubmit={addTransaction}>
        <label>Description<input value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="e.g. Grocery shopping" required /></label>
        <div className="formrow"><label>Amount (₹)<input type="number" min="1" step="0.01" value={form.amount} onChange={e => setForm({...form,amount:e.target.value})} required /></label><label>Type<select value={form.type} onChange={e => setForm({...form,type:e.target.value})}><option>Expense</option><option>Income</option></select></label></div>
        <div className="formrow"><label>Category<select value={form.category} onChange={e => setForm({...form,category:e.target.value})}>{['Food','Travel','Shopping','Bills','Education','Salary','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label>Date<input type="date" value={form.date} onChange={e => setForm({...form,date:e.target.value})} required /></label></div>
        <button>Add transaction</button>
      </form></section>
      <section className="panel"><div className="listhead"><h3>Recent transactions</h3><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Income</option><option>Expense</option></select></div>
        {visible.length ? <div className="transactions">{visible.map(t=><div className="transaction" key={t.id}><div className="dot">{t.type==='Income'?'+':'−'}</div><div className="details"><b>{t.title}</b><small>{t.category} · {t.date}</small></div><strong className={t.type==='Income'?'green':'red'}>{t.type==='Income'?'+':'−'}₹{Number(t.amount).toLocaleString('en-IN')}</strong><button className="delete" onClick={()=>removeTransaction(t.id)} aria-label="Delete transaction">×</button></div>)}</div> : <p className="muted empty">No transactions in this filter.</p>}
      </section>
    </section>
    <footer>Built with React Hooks · Data is saved in this browser using Local Storage</footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />);
