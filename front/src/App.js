import styles from './App.module.css'
import Wilder from './components/Wilder/Wilder';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddWilder from './components/AddWilder';
import PropTypes from 'prop-types';


const App = () => {
  const [wildersData, setWildersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/wilder');
      console.log(result);
      setWildersData(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className={styles.container}>
        <div className={styles.addNew}>
          <AddWilder setWildersData={setWildersData} />
        </div>
        <h2>Wilders</h2>
        <section className={styles['card-row']}>
          {wildersData.map((wilder) => {
            return (
              <Wilder
                key={wilder.id}
                name={wilder.name}
                skills={wilder.skills}
                id={wilder.id}
                city={wilder.city}
                setWildersData={setWildersData}
              />
            );
          })}
        </section>
      </main>
      <footer>
        <div className="container">
          <p></p>
        </div>
      </footer>
    </div>
  );
}

App.propTypes = {
  wildersData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string,
      skills: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          votes: PropTypes.number.isRequired,
        })
      ),
    })
  ),
  setWildersData: PropTypes.func.isRequired,
};

export default App;
