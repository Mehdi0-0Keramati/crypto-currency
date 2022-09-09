import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import "./coins.css"

const Coins = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [Loading, setIsLoading] = useState(true)

    useEffect(() => {
        const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false"

        axios.get(url, setIsLoading(false)).then((res) => {
            setData(res.data)
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })

    }, []);

    return (
        <>
            <section className='container'>
                <form>
                    <h1>
                        Search a currency
                    </h1>
                    <input type='search' placeholder='search coins' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
                </form>
                <div className='header'>
                    <div className='left-header'>
                        <span>#</span>
                        <h4>coin</h4>
                    </div>
                    <div className='right-header'>
                        <h4>price</h4>
                        <h4>24h</h4>
                        <h4>24h volume</h4>
                        {
                            window.innerWidth > 800 ?
                                <h4>Mkt Cap</h4>
                                : ""
                        }
                    </div>
                </div>

                {
                    Loading ?
                        <div className='loading'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        :
                        data.filter((d) => {
                            return (
                                d.name.toLowerCase().includes(search.toLowerCase())
                            )
                        }).map((d) => {
                            return (
                                <div className='box_coins' key={d.market_cap_rank}>
                                    <div className='left-box-coins'>
                                        <span>{d.market_cap_rank}</span>
                                        <img src={d.image} />
                                        <h4 className='name'>{d.name}</h4>
                                        {
                                            window.innerWidth > 800 ?
                                                <span>{d.symbol}</span>
                                                : ""
                                        }
                                    </div>
                                    <div className='right-box-coins'>
                                        <h4>{d.current_price.toLocaleString()}</h4>
                                        <h4 style={{ color: d.market_cap_change_percentage_24h < 0 ? "red" : "green" }}>{d.market_cap_change_percentage_24h.toFixed(1)}%</h4>
                                        <h4>${d.total_volume.toLocaleString()}</h4>
                                        {
                                            window.innerWidth > 800 ?
                                                <h4 style={{ marginLeft: '.6rem' }}>${d.market_cap.toLocaleString()}</h4>
                                                : ""
                                        }
                                    </div>
                                </div>
                            )
                        })
                }
            </section>
        </>);
}

export default Coins;