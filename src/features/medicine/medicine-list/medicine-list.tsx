import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { changeText, changeTotal, filterByMedicine, getMedicines, searchText, total } from "../medicine.sclice"
import { MedicineItem } from "../medicine-item/medicine-item"
import styles from "./style.module.css"
import { Modal } from "../../../components/modal"

export const MedicineList = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const remedies = useAppSelector(filterByMedicine)
    const text = useAppSelector(searchText)
    const totals = useAppSelector(total) 
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getMedicines())
    }, [])

    useEffect(() => {
        dispatch(changeTotal())
    }, [total])

    const handleClose = () => {
        setIsOpen(false)
    }

        return (
        <>
            <h3>MedicineList</h3>
            <h4>Total: {totals}</h4>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            <form>
                <input 
                    type="text"
                    value={text}
                    onChange={evt => dispatch(changeText(evt.target.value))}
                    />
            </form>

            <div className={styles.medicines}>
                {
                    remedies.map(med => <MedicineItem 
                                            key={med.id}
                                            remedy={med}
                                        />)
                }
            </div>
            
            {
                isOpen && <Modal onClose={handleClose} />
            }
        </>
    )
}