import { useState } from 'react'
import './App.css'
import { sampleOrders } from './util'

function App() {
  const [companies, setCompanies] = useState(["daraz.ordermade.com", "foodpanda.ordermade.com"])
  const [data, setData] = useState(sampleOrders);
  const [page, setPage] = useState(1);

  const sorting = (sortBy, sortType) => {
    let finalData;
    if (sortBy === "amount") {
      finalData = data?.[window.location.pathname?.split(".")?.[0]].map((item) => ({ ...item, amount: +item.amount?.slice(1, item.amount.length) })).sort((a, b) => {
        if (sortType === "asc") {
          return a[sortBy] > b[sortBy];
        }
        return b[sortBy] > a[sortBy];

      });
    } else {

      finalData = data?.[window.location.pathname?.split(".")?.[0]].sort((a, b) => {
        if (sortType === "asc") {

          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);

      });
    }
    setData({ ...data, amazon: finalData.map((item) => ({ ...item, amount: !item.amount.includes("$") ? "$" + item.amount : item.amount })) })
  }
  return (
    <>
      <header>
        {window.location.pathname?.split(".").includes("amazon") ?

          <img alt='amazon' /> : window.location.pathname?.split(".").includes("foodpanda") ?
            <img alt='foodpanda' /> : window.location.pathname?.split(".").includes("daraz") &&
            <img alt='daraz' />
        }
        <input type='text' onBlur={(e) => setCompanies([...companies, e.target.value])} />
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th><span onClick={() => sorting("customerName", "asc")}>asc</span>-Name-<span onClick={() => sorting("customerName", "desc")}>desc</span></th>
              <th><span onClick={() => sorting("amount", "asc")}>asc</span>-Amount-<span onClick={() => sorting("amount", "desc")}>desc</span></th>
              <th><span onClick={() => sorting("status", "asc")}>asc</span>-Status-<span onClick={() => sorting("status", "desc")}>desc</span></th>
            </tr>
          </thead>
          <tbody>
            {data?.[window.location.pathname?.split(".")?.[0]] ?
              data?.[window.location.pathname?.split(".")?.[0]].slice(page * 10, page * 10 + 10).map((item) =>
                <tr key={item.orderId}>
                  <td>{item.customerName}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                </tr>
              ) :
              <tr>
                No Data found
              </tr>
            }

          </tbody>
        </table>
        <div><button disabled={page === 1} onClick={() => setPage((page) => page - 1)}>prev</button>{page}<button disabled={((page + 1) * 10) > data?.[window.location.pathname?.split(".")?.[0]]?.length} onClick={() => setPage((page) => page + 1)}>Next</button></div>
        <ul>
          {
            companies.map((company) =>
              <li key={company}>{company}</li>
            )
          }
        </ul>
      </main>

    </>
  )
}

export default App
