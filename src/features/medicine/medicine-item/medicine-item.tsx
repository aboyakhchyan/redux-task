import { IMedicine } from "../types"
import styles from "./style.module.css"

interface IProp {
    remedy: IMedicine 
}

export const MedicineItem: React.FC<IProp> = ({remedy}) => {
    return (
        <div className={styles.medicine}>
            <img src={remedy.imageUrl}/>
            <h3>{remedy.name}</h3>
            <p>{remedy.salary}</p>
        </div>
    )
}