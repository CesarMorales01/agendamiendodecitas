import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            style={{ margin: '0.2em', width: '20%' }}
            className={
                'inline-flex items-center border border-primary card-little-flyer rounded text-sm font-medium   ' +
                (active
                    ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
