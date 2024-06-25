import { useState, useEffect } from 'react'
import axios from 'axios'
import MaatLista from './components/MaatLista';
import HaeMaat from './components/HaeMaat';

const App = () => {
  const [haku, setHaku] = useState('')
  const [maat, setMaat] = useState({})
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
          setMaat(response.data)
        })
    }
  , [])

  const handleChange = (event) => {
    setHaku(event.target.value)
    if (haku) {
      const regex = new RegExp( haku, 'i' );
      const suodMaat = () => maat.filter(maa => maa.name.common.match(regex))
      setMaat(suodMaat)
    }
  }

  return (
    <div>
      <HaeMaat value={haku} handleChange={handleChange}/>
      <MaatLista maat={maat}/>
    </div>
  )
}

export default App