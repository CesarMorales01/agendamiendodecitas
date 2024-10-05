import React, { useState, useEffect } from 'react';
import '../../css/general.css'
import { Head } from '@inertiajs/react';
import GlobalFunctions from '../Pages/services/GlobalFunctions'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import Swal from 'sweetalert2'
import DialogoLoading from './UIGeneral/DialogoLoading';

const Miscitas = (params) => {
    const glob = new GlobalFunctions()

    useEffect(() => {
        if (params.mensaje != "") {
            Swal.fire({
                title: params.mensaje,
                icon: 'warning',
                timer: 1000,
            })
        }
    }, [])

    function abrirDialogoCancelar(item) {
        Swal.fire({
            title: "¿Cancelar cita del " + glob.getFormatoFechaCo(item.fecha) + " a las " + item.inicio + " ?",
            showCancelButton: true,
            confirmButtonText: "Cancelar cita",
            cancelButtonText: "Cerrar dialogo",
            confirmButtonColor: "red"
        }).then((result) => {
            if (result.isConfirmed) {
                loadingOn()
                window.location = params.globalVars.myUrl + "calendar/" + item.id + "/edit"
            }
        });
    }
   
    function loadingOn() {
        document.getElementById("btnModalLoading").click()
    }

    return (
        <Authenticated globalVars={params.globalVars} auth={params.auth} >
            <Head title="Mis citas" />
            <div className="py-2">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg py-3">
                    <div style={{ textAlign: 'center' }} className="container">
                        <h1 style={{ marginBottom: '0.5em', marginTop: '0.2em', fontSize: '1.5em' }} id="titulo" className="text-center">Mis citas</h1>
                        <div className="row justify-content-center" >
                            {params.miscitas.length == 0 ?
                                <div>No se encontraron citas programadas...</div>
                                :
                                params.miscitas.map((item, index) => {
                                    return (
                                        <div onClick={() => abrirDialogoCancelar(item)} key={index} style={{ marginBottom: '1em' }} className='col-12 card border border-primary card-little-flyer pointer'>
                                            <div className='col-12'>
                                                <div style={{ display: "flex", marginTop: '0.5em' }} className="card-title">
                                                    <svg style={{ marginTop: '0.2em', marginRight: '0.5em' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                    </svg>
                                                    <span>Dia: {glob.getFormatoFechaCo(item.fecha)}</span>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div style={{ display: "flex", marginTop: '0.5em' }} className="card-title">
                                                    <svg style={{ marginTop: '0.2em', marginRight: '0.5em' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                                                        <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                                                        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                                                    </svg>
                                                    <span>Hora: {item.inicio}</span>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div style={{ display: "flex", marginTop: '0.5em' }} className="card-title">
                                                    <svg style={{ marginTop: '0.2em', marginRight: '0.5em' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                    </svg>
                                                    <span>Profesional: {item.profesional.nombre}</span>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div style={{ display: "flex", marginTop: '0.5em' }} className="card-title">
                                                    <svg style={{ marginTop: '0.2em', marginRight: '0.5em' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                    </svg>
                                                    <span>Direccion: Calle 00 #00-00. Barrio Fulanito. (Dir de la empresa)</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <a onClick={loadingOn} href={route('home')} style={{ float: 'right', marginRight: '1.5em', marginTop: '1em' }} className="roundedButton card-little-flyer">
                        <svg style={{ margin: '-0.5em' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </a>
                </div>
            </div>
            <DialogoLoading url={params.globalVars.urlRoot}></DialogoLoading>
        </Authenticated>
    )
}

export default Miscitas