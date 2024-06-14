import { useEffect, useState } from "react";

import styles from './RequisicaoCep.module.css'

const RequisicaoCep = ({ cep }) => {
    const [carregando, setCarregando] = useState(false);
    const [cepUsuario, setCepUsuario] = useState([]);
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [erro, setErro] = useState(false);

    const resolucaoPainel = document.getElementById("resolutionPainel");

    useEffect(() => {
        if (cep == 0) {
            return;
        } else {
            setCarregando(false);
            setErro(false)

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => {
                setCarregando(true)
                if (!res.ok) {
                    throw Error("Algo de errado: " + res.status)
                }

                return res.json();
            })
            .then((resJson) => {
                setTimeout(() => {
                    ajustarResolucaoPainelMaior()
                    
                    setTimeout(() => {
                        setCarregando(false);
                        setMostrarTabela(true);
                        setCepUsuario([resJson])
                    }, 500)

                }, 1000)
            })
            .catch(err => {
                setCarregando(true)
                console.log("mostrarTabela:", mostrarTabela);

                setTimeout(() => {
                    setCarregando(false)
                    setMostrarTabela(false);
                    setErro(true);
    
                    console.log("[ERRO] " + err)

                    setTimeout(() => {
                        setErro(false)
                    }, 2000)
                }, 1500)
            })
        }
    }, [cep])

    const deletarTabela = () => {
        tabela.style.display = "none"
    }

    const ajustarResolucaoPainelMenor = () => {
        resolucaoPainel.style.height = "200px"
        resolucaoPainel.style.transition = "0.5s"
    }
    const ajustarResolucaoPainelMaior = () => {
        resolucaoPainel.style.height = "450px"
        resolucaoPainel.style.transition = "0.5s"
    }

    return (
        <div className={styles.plnRequisicao}>
            {carregando ? (
                <div className="mensagemStyles">
                    <span>Carregando...</span>
                </div>
            ) : (
                erro ? (
                    <div className="mensagemStyles">
                        <p>Cep não encontrado...</p>
                        {ajustarResolucaoPainelMenor()}
                    </div>
                ) : (
                    mostrarTabela && (
                        <div className="requisicaoTable" id="tableReq">
                            {cepUsuario.map((requisicao, index) => (
                                <table key={index} className={styles.painelTableStyles}>
                                    <thead>
                                        <tr>
                                            <th className={styles.painelResultadoText}>Resultado:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={styles.painelItemText}>Cep</td>
                                            <td className={styles.painelItem}>{requisicao.cep}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.painelItemText}>Logradouro</td>
                                            <td className={styles.painelItem}>{requisicao.logradouro}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.painelItemText}>Bairro</td>
                                            <td className={styles.painelItem}>{requisicao.bairro}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.painelItemText}>Localidade</td>
                                            <td className={styles.painelItem}>{requisicao.localidade}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.painelItemText}>UF</td>
                                            <td className={styles.painelItem}>{requisicao.uf}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.painelItemText}>DDD</td>
                                            <td className={styles.painelItem}>{requisicao.ddd}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}    
                        </div>
                    )
                )
            )}

        </div>
    )
}

export default RequisicaoCep;