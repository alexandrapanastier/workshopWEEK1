import Styles from "./Skill.module.css"

const Skill = ({ name, votes }) => {
    return (
      <li className={Styles.skill}>
        {name}
        <span className={Styles.votes}>{votes}</span>
      </li>
    );
  };
  
  export default Skill;