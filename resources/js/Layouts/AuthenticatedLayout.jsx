import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ globalVars, auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    function goRegister() {
        document.getElementById("linkRegister").click()
    }

    function goLogin() {
        document.getElementById("linkLogin").click()
    }

    function goHome() {
        document.getElementById("linkHome").click()
    }

    function goMiscitas() {
        document.getElementById("linkMiscitas").click()
    }

    function validarMostrarIconSessionSmall() {
        let mostrar = ""
        if (window.screen.width > 600) {
            mostrar = "none"
        } else {
            if (auth) {
                mostrar = "none"
            }
        }
        return mostrar
    }

    function validarMostrarIconSessionBig() {
        let mostrar = ""
        if (window.screen.width < 600) {
            mostrar = "none"
        } else {
            if (auth) {
                mostrar = "none"
            }
        }
        return mostrar
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center h-16">
                        <div className="flex">
                            <div className="flex items-center">
                                {/*Menu con imagenes para pantallas pequeñas*/}
                                <div onClick={goRegister} style={{ display: validarMostrarIconSessionSmall(), width: '20%', height: 'auto' }} className="card border border-primary card-little-flyer pointer">
                                    <img style={{ width: '60%', height: 'auto', marginTop: '0.1em', marginBottom: '0.1em' }} src={globalVars.urlRoot + 'Images/Config/register_logo.png'} className="centerImg" alt="" />
                                    <a style={{ display: 'none' }} id='linkRegister' href={route('registro.create')}></a>
                                </div>
                                <div onClick={goLogin} style={{ display: validarMostrarIconSessionSmall(), width: '20%', height: 'auto', marginLeft: '0.5em' }} className="card border border-primary card-little-flyer pointer">
                                    <img style={{ width: '60%', height: 'auto', marginTop: '0.1em', marginBottom: '0.1em' }} src={globalVars.urlRoot + 'Images/Config/login_logo.png'} className="centerImg" alt="" />
                                    <a style={{ display: 'none' }} id='linkLogin' href={route('login')}></a>
                                </div>
                                <div onClick={goHome} style={{ display: validarMostrarIconSessionSmall() == "none" && window.screen.width < 600 ? "" : "none", width: '20%', height: 'auto', marginLeft: '-0.5em' }} className="card border border-primary card-little-flyer pointer">
                                    <img style={{ width: '60%', height: 'auto', marginTop: '0.5em', marginBottom: '0.5em' }} src={globalVars.urlRoot + 'Images/Config/house_logo.png'} className="centerImg" alt="" />
                                    <a style={{ display: 'none' }} id='linkHome' href={route('home')}></a>
                                </div>
                                <div onClick={goMiscitas} style={{ display: validarMostrarIconSessionSmall() == "none" && window.screen.width < 600 ? "" : "none", width: '20%', height: 'auto', marginLeft: '0.5em' }} className="card border border-primary card-little-flyer pointer">
                                    <img style={{ width: '60%', height: 'auto', marginTop: '0.5em', marginBottom: '0.5em' }} src={globalVars.urlRoot + 'Images/Config/miscitas_logo.png'} className="centerImg" alt="" />
                                    <a style={{ display: 'none' }} id='linkMiscitas' href={route('calendar.citasusuario')}></a>
                                </div>
                                {/*Fin menu con imagenes para pantallas pequeñas*/}
                            </div>
                            <div className="hidden md:flex md:ml-6 ">
                                {/*Menu con imagenes para pantallas grandes*/}
                                <a className='border border-primary rounded' style={{ width: '10%', margin: '0.2em', display: validarMostrarIconSessionBig() }} href={route('registro.create')} active={route().current('registro.create')}>
                                    <img style={{ width: '50%', height: 'auto', marginTop: '0.5em' }} src={globalVars.urlRoot + 'Images/Config/register_logo.png'} className="centerImg" alt="" />
                                </a>
                                <a className='border border-primary rounded' style={{ width: '10%', margin: '0.2em', display: validarMostrarIconSessionBig() }} href={route('login')} active={route().current('login')}>
                                    <img style={{ width: '50%', height: 'auto', marginTop: '0.5em' }} src={globalVars.urlRoot + 'Images/Config/login_logo.png'} className="centerImg" alt="" />
                                </a>
                                <a className='border border-primary rounded' style={{ width: '6%', marginTop: '0.5em', marginBottom: '0.5em', display: validarMostrarIconSessionBig() == "none" ? "" : "none" }} href={route('home')} active={route().current('home')}>
                                    <img style={{ width: '50%', height: 'auto', marginTop: '0.5em' }} src={globalVars.urlRoot + 'Images/Config/house_logo.png'} className="centerImg" alt="" />
                                </a>
                                <a className='border border-primary rounded' style={{ marginLeft: '0.2em', width: '6%', marginTop: '0.5em', marginBottom: '0.5em', display: validarMostrarIconSessionBig() == "none" ? "" : "none" }} href={route('calendar.citasusuario')} active={route().current('calendar.create')}>
                                    <img style={{ width: '50%', height: 'auto', marginTop: '0.5em' }} src={globalVars.urlRoot + 'Images/Config/miscitas_logo.png'} className="centerImg" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:flex ">
                            <div style={{ display: auth ? "" : "none" }} className="ms-3 relative">
                                {/*Menu perfil pantalla grande*/}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="rounded-md">
                                            <button
                                                style={{ marginTop: '1em' }}
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth ? auth.name : ''}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('calendar.citasusuario')}>Mis citas</Dropdown.Link>
                                        <Dropdown.Link href={route('profile.edit')}>Cuenta</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Salir
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                {/*Fin menu perfil pantalla grande*/}
                            </div>
                        </div>
                        {/*Icono hamburguesa*/}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/*Fin icono hamburguesa*/}
                    </div>
                </div>
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-0 space-y-1">
                        <ResponsiveNavLink style={{ display: auth ? '' : 'none' }} href={route('calendar.citasusuario')} active={route().current('calendar.citasusuario')}>
                            Mis citas
                        </ResponsiveNavLink>
                    </div>
                    <div style={{ marginLeft: '0.4em' }} className="pt-2 pb-1 border-t border-gray-200">
                        {auth ?
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150" >
                                            {auth.name}
                                            <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit', auth.email)}>Cuenta</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Salir
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                            :
                            ""
                        }
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
