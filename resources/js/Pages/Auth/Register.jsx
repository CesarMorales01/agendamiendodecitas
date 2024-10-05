import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Register(params) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {

    }, []);

    function checkSamePass() {
        let validar = false
        if (password.value == password_confirmation.value) {
            validar = true
        }
        return validar
    }

    const submit = (e) => {
        e.preventDefault();
        if (checkSamePass()) {
            fetchValidarEmail()
        } else {
            sweetAlert('Las contraseñas no coinciden')
        }
    };

    function fetchValidarEmail() {
        loadingOn()
        const url = params.globalVars.myUrl + 'registro/' + data.email
        fetch(url)
            .then((response) => {
                return response.json()
            }).then((json) => {
                if (json.email=="") {
                    document.getElementById("formRegistro").submit()
                } else {
                    loadingOff()
                    sweetAlert("Ya existe una cuenta asociada al e-mail ingresado!")
                }

            })
    }

    function sweetAlert(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: 'warning',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        })
    }

    function loadingOn() {
        document.getElementById("btnIngresarUsuario").style.display = "none"
        document.getElementById("btnLoadingIngresarUsuario").style.display = ""
    }

    function loadingOff() {
        document.getElementById("btnIngresarUsuario").style.display = ""
        document.getElementById("btnLoadingIngresarUsuario").style.display = "none"
    }

    return (
        <>
            <Head title="Registro" />
            <GuestLayout globalVars={params.globalVars}>
                <form method="POST" id="formRegistro" onSubmit={submit} action={route('registro.store')}>
                    <input type="hidden" name='_token' value={params.token} />
                    <div>
                        <InputLabel htmlFor="name" value="Usuario" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Correo electrónico" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirma la contraseña" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                        <InputError message={params.resp} className="mt-2" />
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Ya tienes cuenta?
                        </Link>
                        <button style={{ marginLeft: '0.5em' }} id='btnIngresarUsuario' className="btn btn-success" type="submit" >
                            Registrarse
                        </button>
                        <button style={{ display: 'none', backgroundColor: 'gray', marginLeft: '0.5em' }} id='btnLoadingIngresarUsuario' className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                </form>
            </GuestLayout>
        </>
    );
}