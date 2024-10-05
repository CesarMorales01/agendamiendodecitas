import React, { useState, useEffect } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import '../../css/general.css'
import { Head } from '@inertiajs/react';
import GlobalFunctions from '../Pages/services/GlobalFunctions'
import NewCitaModal from './NewCitaModal';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import DialogoLoading from './UIGeneral/DialogoLoading';

const Splash = (params) => {
    const glob = new GlobalFunctions()
    const [datosCita, setDatosCita] = useState({
        fecha: null,
        fechaFormatoCo: '',
        hora: '',
        profesionales_disponibles: [],
        token: params.token
    })
    const [horario, setHorario] = useState(params.horarios_disponibles)
    const [cargar, setCargar] = useState(false)

    useEffect(() => {
        const exp = 3600 * 60 * 24
        if (glob.getCookie("fechaHoy") == "") {
            glob.setCookie("fechaHoy", glob.getFecha(), exp)
            cargarHomeDelay()
        } else {
            if (glob.getCookie("fechaHoy") == glob.getFecha()) {
                cargarHome()
            } else {
                glob.setCookie("fechaHoy", glob.getFecha(), exp)
                cargarHomeDelay()
            }
        }
        setFecha()
    }, [])

    useEffect(() => {
        if (cargar) {
            fetchCambioFecha()
        }
    }, [datosCita.fecha])

    function fetchCambioFecha() {
        document.getElementById('btnModalLoading').click()
        const url = params.globalVars.myUrl + 'calendar/' + datosCita.fecha
        console.log(url)
        fetch(url).then((response) => {
            return response.json()
        }).then((json) => {
            setCargar(false)
            setHorario(json)
            document.getElementById('btnCloseModalLoading').click()
        })
    }

    function setFecha() {
        const fechaHoy = glob.getFecha()
        document.getElementById('inputDate').value = fechaHoy
        setTimeout(() => {
            if (datosCita.fecha === null) {
                setDatosCita((valores) => ({
                    ...valores,
                    fecha: fechaHoy,
                    fechaFormatoCo: glob.getFormatoFechaCo(fechaHoy)
                }))
            }
        }, 100);
    }

    function cambioHora(e) {
        setDatosCita((valores) => ({
            ...valores,
            hora: e.hora + ":00",
            profesionales_disponibles: e.profesionales
        }))
    }

    function cargarHomeDelay() {
        document.getElementById("divSplash").classList.add("slowChange");
        document.getElementById("divHome").classList.add("slowChange");
        setTimeout(() => {
            document.getElementById('divHome').style.opacity = "100%"
            document.getElementById('divSplash').style.opacity = "0%"
            setTimeout(() => {
                document.getElementById('divSplash').style.display = "none"
            }, 2000);
        }, 2000)
    }

    function cargarHome() {
        document.getElementById('divHome').style.opacity = "100%"
        document.getElementById('divSplash').style.opacity = "0%"
        document.getElementById('divSplash').style.display = "none"
    }

    function validarDisplayBotonAnterior() {
        let mostrar = ""
        if (glob.getFecha() > getFechaDiaAnterior()) {
            mostrar = "none"
        }
        return mostrar
    }

    function getFechaDiaAnterior() {
        const fecha = glob.formatFecha(operarDias(new Date(datosCita.fecha), -0, 5)).split("-")
        return fecha[0] + "-" + fecha[1] + "-" + fecha[2]
    }

    function diaAnterior() {
        setCargar(true)
        setDatosCita((valores) => ({
            ...valores,
            fecha: getFechaDiaAnterior(),
            fechaFormatoCo: glob.getFormatoFechaCo(getFechaDiaAnterior())
        }))
        document.getElementById('inputDate').value = getFechaDiaAnterior()
    }

    function operarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    function diaSiguiente() {
        setCargar(true)
        let fecha = glob.formatFecha(operarDias(new Date(datosCita.fecha), 2)).split("-")
        setDatosCita((valores) => ({
            ...valores,
            fecha: fecha[0] + "-" + fecha[1] + "-" + fecha[2],
            fechaFormatoCo: glob.getFormatoFechaCo(fecha[0] + "-" + fecha[1] + "-" + fecha[2])
        }))
        document.getElementById('inputDate').value = fecha[0] + "-" + fecha[1] + "-" + fecha[2]
    }

    function cambioFecha(e) {
        setDatosCita((valores) => ({
            ...valores,
            fecha: e.target.value,
            fechaFormatoCo: glob.getFormatoFechaCo(e.target.value)
        }))
        setCargar(true)
    }

    return (
        <div>
            <div id='divSplash' className='centerSpinner' style={{ backgroundColor: '#00bbe9', width: '100%', minHeight: '100vh' }} >
                <div style={{ marginTop: window.screen.width < 600 ? '-4em' : '' }}>
                    <PacmanLoader color={'#fff40a'} size={60} />
                    <br />
                    <h1 style={{ marginLeft: '1em' }} className="animate-charcter">Tu aplicación...</h1>
                </div>
            </div>
            <Authenticated globalVars={params.globalVars} auth={params.auth} >
                <Head title="Home" />
                <div id='divHome' style={{ opacity: '0%', marginTop: '0.5em' }} className="container">
                    <h1 className='titulo' style={{ textAlign: 'center', marginBottom: '0.2em' }}><strong>Agendamiento de citas</strong></h1>
                    <div style={{ justifyContent: 'center' }} className="row">
                        <div className='col-lg-4 col-md-12 col-12 col-sm-12'>
                            <label style={{ marginTop: '0.2em', marginLeft: '1.1em' }}>{datosCita.fechaFormatoCo}</label>
                            <br />
                            <div style={{ textAlign: 'center', marginTop: '0.2em' }} className='row'>
                                <div className="col-3">
                                    <button onClick={diaAnterior} className='border border-dark rounded pointer' style={{ display: validarDisplayBotonAnterior(), marginTop: '0.2em', marginLeft: '0.2em', padding: '0.5em', backgroundColor: '#00722e' }} id="btn_buscar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="col-6">
                                    <input type="date" className='rounded' onChange={cambioFecha} name="fecha" id="inputDate" />
                                </div>
                                <div className="col-3">
                                    <button onClick={diaSiguiente} className='border border-dark rounded pointer' style={{ marginTop: '0.2em', marginLeft: '0.2em', padding: '0.5em', backgroundColor: '#00722e' }} id="btn_buscar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '1em' }} className="row justify-content-center" >
                            {horario.length == 0 ?
                                <span style={{ textAlign: 'center' }}>Lo sentimos, aún no tenemos un horario disponible para este dia...</span>
                                :
                                horario.map((item, index) => {
                                    let validarDisplay = ""
                                    const d = new Date();
                                    if (item.profesionales.length == 0) {
                                        validarDisplay = "none"
                                    }
                                    if (datosCita.fecha == glob.formatFecha(d)) {
                                        if (item.hora <= d.getHours()) {
                                            validarDisplay = "none"
                                        }
                                    }
                                    return (
                                        <div style={{ marginBottom: '1em', display: validarDisplay }} onClick={() => cambioHora(item)} data-toggle="modal" data-target="#dialogoNuevaCita" key={index} className="col-12"  >
                                            <div className='row justify-content-between border border-primary card-little-flyer pointer'>
                                                <div style={{ alignContent: 'center' }} className='col-4 d-flex justify-content-center'>
                                                    <img style={{ width: '2em', height: 'auto', margin: '0.2em' }} src={params.globalVars.urlRoot + 'Images/Config/agenda.png'} className="card-img-left img-fluid" alt="" />
                                                </div>
                                                <div className='col-4 align-self-center d-flex justify-content-center'>
                                                    <div style={{ color: item.disponible ? 'green' : "black", display: "flex", marginTop: '0.5em' }} className="card-title">
                                                        <svg style={{ marginTop: '0.2em', marginRight: '0.5em' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                                                            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                                                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                                                        </svg>
                                                        <span>{item.hora}:00</span>
                                                    </div>
                                                </div>
                                                <div className='col-4 align-self-center d-flex justify-content-center'>
                                                    <button className='btn btn-success btn-sm'>Agendar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <NewCitaModal url={params.globalVars.myUrl} datosCita={datosCita} auth={params.auth}></NewCitaModal>
            </Authenticated>
            <DialogoLoading url={params.globalVars.urlRoot}></DialogoLoading>
        </div>
    )
}

export default Splash