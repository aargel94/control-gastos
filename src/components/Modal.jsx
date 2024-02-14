import { useEffect, useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal,setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [ datos, setDatos ] = useState({
        nombre:'',
        cantidad:'',
        categoria:'',
        id:'',
        fecha:''
    })
    const [mensaje, setMensaje]=useState('')
    const { nombre, cantidad, categoria, id, fecha } = datos

    useEffect(()=>{
        if(Object.keys(gastoEditar).length >0 ){
            setDatos({
                nombre:gastoEditar.nombre,
                cantidad:gastoEditar.cantidad,
                categoria:gastoEditar.categoria,
                id:gastoEditar.id,
                fecha:gastoEditar.fecha
            })
        }
    },[gastoEditar])

    const handleChange =(e)=>{
        e.preventDefault()
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const ocultarModal=()=>{
        setGastoEditar({})
        setAnimarModal(false)
        setTimeout(()=>{
            setModal(false)
        },500)
    }
    const handleSubmit = e =>{
        e.preventDefault()
        
        if([nombre, cantidad, categoria].includes('')){
            
            setMensaje('Todos los campos son obligatorios')
            setTimeout(()=>{
                setMensaje('')
            }, 3000)
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

    return (
        <div className="modal">
            <div className='cerrar-modal'>
                <img 
                    src={CerrarBtn}
                    alt='cerrar-modal'
                    onClick={ocultarModal}
                />
            </div>
            <form
                onSubmit={handleSubmit} 
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto': 'Nuevo gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre gasto</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type='text'
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        name="cantidad"
                        type='number'
                        placeholder="Añade la cantidad del gasto"
                        value={cantidad}
                        onChange={handleChange}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        name="categoria"
                        onChange={handleChange}
                        value={categoria}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                    type="submit"
                    value={gastoEditar.nombre ? 'Guardar cambios' :"Añadir gasto"}
                />


            </form>

        </div>
    )
}

export default Modal
