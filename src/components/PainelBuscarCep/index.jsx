import { useState } from "react";

import RequisicaoCep from "../RequisicaoCep";
import styles from './PainelBuscarCep.module.css'

const PainelBuscarCep = () => {
    const [cepInput, setCepInput] = useState(0);
    const [cepUsuario, setCepUsuario] = useState(0);
    const [erroInput, setErroInput] = useState(false);
    const resolucaoPainel = document.getElementById("resolutionPainel");

    const pegarValorInput = (evento) => {
        setCepInput(evento.target.value);
    }

    const mostraValor = () => {
        if (cepInput == "") {
            setErroInput(true);
            setTimeout(() => {
                setErroInput(false)
            }, 2000)
        }
        setCepUsuario(cepInput);
    }

    const ajustarResolucaoPainel = () => {
        resolucaoPainel.style.height = "200px"
    }


    return (
        <div className={styles.painelCep} id="resolutionPainel">
            <div className={styles.tituloPainel}>
                <h1>Encontre endereços pela plataforma Busca CEP</h1>
            </div>
            <div className={styles.bscCepTitulo}>
                <input type="text" className={styles.inputStyles} placeholder="Informe o cep" onChange={pegarValorInput}/>
                <button onClick={mostraValor} className={styles.botaoStyles}>🔎</button>
            </div>
            {erroInput ?(
                <div className="mensagemStyles">
                    <span>Por favor digite seu cep ou endereço!</span>
                    {ajustarResolucaoPainel()}
                </div>
            ) : (
                <RequisicaoCep cep={cepUsuario}/>
            )}
        </div>
    )
}

export default PainelBuscarCep;