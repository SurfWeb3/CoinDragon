import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Holdings = ({ tokens }) => {
  const defaultSymbols = ["---", "---", "---", "---", "---"]
  const defaultBalances = [15.5, 70.1, 35.89, 25, 100.9]

  const [symbols, setSymbols] = useState(null)
  const [balances, setBalances] = useState(null)

  const calculateValue = () => {
    let syms = []
    let bals = []

    /* "syms" : "symbols" (used for an additional variable name)
       "bals" : "balances" (used for an additional variable name) */

    for (var i = 0; i < tokens.length; i++) {
      syms.push(tokens[i].market.symbol.toUpperCase())
/* "bals.push(tokens[i].balance)" was changed to "bals.push(tokens[i].value), 
to show dollar-value in the chart, instead of token-units". 
If, for example a wallet has 1 USDC and 1 ETH, a chart showing token-units will display
50% of wallet as USDC and 50% as ETH, though ETH is worth thousands of times more than USDC*/
      bals.push(tokens[i].value)
    }

    setSymbols(syms)
    setBalances(bals)
  }

  useEffect(() => {
    if (tokens.length === 0) {
      setSymbols(null)
    } else {
      calculateValue()
    }
  }, [tokens])

  return (
    <div className="holdings">
      <h3 className="holdings__title">Asset Holdings</h3>
      <div className="holdings__chart">

        <Chart
          options={{
            labels: symbols ? symbols : defaultSymbols,
            legend: {
              position: 'left',
              horizontalAlign: 'center',
              labels: {
                fontSize: '48px',
                fontWeight: 'bold',
                colors: '#FFFFFF'
              }
            }
          }}
          series={balances ? balances : defaultBalances}
          type="pie"
          height={300}
          width="100%"
        />

      </div>
    </div>

  );
}

export default Holdings;
