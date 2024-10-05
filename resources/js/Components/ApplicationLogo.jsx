export default function ApplicationLogo(props) {
    return (
        <div>
            <svg style={{ color: '#191970' }} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-house-heart-fill" viewBox="0 0 16 16">
                <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z" />
                <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018" />
            </svg>
            <h1 style={{ marginTop: '0.6em', color: '#191970', fontWeight: 'bold', marginLeft: '-0.2em' }}>Tu logo</h1>
        </div>
    );
}
