import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Guest({ children, globalVars }) {
    useEffect(() => {
        getImgLogo()
    }, [])

    function getImgLogo() {
        let img = globalVars.urlRoot + 'icon.png'
        document.getElementById('logo').src = img
    }

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <img id='logo' style={{ width: '10em', height: 'auto', marginTop: '1em' }} className="img-fluid rounded" alt="" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
