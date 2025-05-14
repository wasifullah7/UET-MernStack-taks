import React from 'react';
import './Footer.css'; // We'll style it separately

function Footer() {
    return (
        <footer className="footer">
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="icon" />
            </a>
            <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="icon" />
            </a>
            <a href="https://facebook.com/your-username" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="icon" />
            </a>
        </footer>
    );
}

export default Footer;
