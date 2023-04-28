import styles from './Wilder.module.css'
import avatar from '../../assets/profile.png';
import Skill from '../Skill/Skill';
import axios from 'axios';
import PropTypes from "prop-types";

const Wilder = ({ name, skills, id, city, setWildersData}) => {
  const handleDeleteWilder = (id) => {
    axios.delete(`http://localhost:5000/api/wilder/${id}`).then(() => {
      // Mettre à jour l'état pour exclure le wilder supprimé
      setWildersData((prevWilders) => prevWilders.filter((wilder) => wilder.id !== id));
    });
  };
    return (
      <article className={styles.card}>
        <img src={avatar} alt="Wilder Profile" className={styles.cardImg} />
        <h3>{name}</h3>
        {city ? <h4>{city}</h4> : null}
        <button className={styles.button} onClick={() => handleDeleteWilder(id)}>Delete</button>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <h4>Wild Skills</h4>
        <ul>
          {skills?.map((skill) => (
            <Skill name={skill.title} votes={skill.votes} key={skill.id} />
          ))}
        </ul>
      </article>
    );
  };

Wilder.propTypes = {
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
  id: PropTypes.number.isRequired,
  city: PropTypes.string,
  setWildersData: PropTypes.func.isRequired,
};

export default Wilder;